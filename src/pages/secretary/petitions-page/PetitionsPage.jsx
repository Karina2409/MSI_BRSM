import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PetitionCard from './PetitionCard';
import './petitions-page.css';
import CreatePetitionModal from './CreatePetitionModal';

const faculties = ['ФКП', 'ФИТУ', 'ФРЭ', 'ФКСИС', 'ИЭФ', 'ФИБ', 'ВФ'];

const PetitionsPage = () => {
  const [petitions, setPetitions] = useState([]);
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPetitions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/petitions');
      setPetitions(response.data);
    } catch (error) {
      console.error('Ошибка при получении данных освобождений:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/students/eligible');
      setStudents(response.data);
    } catch (error) {
      console.error('Ошибка при получении данных студентов:', error);
    }
  };

  useEffect(() => {
    fetchPetitions();
    fetchStudents();
  }, []);

  const handleCreatePetition = async (student) => {
    try {
      const response = await axios.post(`http://localhost:8080/petitions/post/${student.studentId}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        alert('Ходатайство успешно создано');
        fetchPetitions();
      } else {
        alert('Ошибка при создании ходатайства');
      }
      
    } catch (error) {
      console.error('Ошибка при создании ходатайства:', error);
    }
  };

  const deletePetition = async (petitionId) => {
    try {
      await axios.delete(`http://localhost:8080/petitions/delete/${petitionId}`);
      setPetitions(petitions.filter(petition => petition.petitionId !== petitionId));
    } catch (error) {
      console.error("Ошибка при удалении ходатайства", error);
    }
  };

  const downloadPetition = async (petitionId) => {
    try {
      await axios.post(`http://localhost:8080/petitions/download/${petitionId}`);
      alert('Скачивание началось в папку ходатайства\nПуть: D:/универ/2курс/4семестр/Курсач/документация/ходатайства');
    } catch (error) {
      console.error("Ошибка при скачивании ходатайства", error);
    }
  };

  const filteredPetitions = petitions.filter(petition => {
    return (
      (selectedFaculty === '' || petition.studentFacultyPetition === selectedFaculty) &&
      (searchTerm === '' || petition.studentLastName.toLowerCase().startsWith(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="page">
      <div className="title">Ходатайства</div>
      <div className="petitions-page">
        <div className="controls-petition">
          <div className="search-petition">
            <input
              id="search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Введите фамилию студента"
            />
          </div>
          <div className="filter-petition">
            <label htmlFor="faculty-select">Фильтровать по факультету:</label>
            <select
              id="faculty-select"
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
            >
              <option value="">Все</option>
              {faculties.map((faculty) => (
                <option key={faculty} value={faculty}>
                  {faculty}
                </option>
              ))}
            </select>
          </div>
          <button
            className="export-button"
            onClick={() => setIsModalOpen(true)}
          >
            Сформировать
          </button>
        </div>
        <section className="petition-grid">
          {filteredPetitions.length === 0 ? (
            <div>Нет ходатайств для отображения</div>
          ) : (
            filteredPetitions.map((petition) => (
              <PetitionCard
                key={petition.petitionId}
                petition={petition}
                onDelete={deletePetition}
                onDownload={downloadPetition}
              />
            ))
          )}
        </section>
        <CreatePetitionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          students={students}
          onSubmit={handleCreatePetition}
        />
      </div>
    </div>
  );
};

export default PetitionsPage;