import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExemptionCard from './ExemptionCard';
import './exemptionsPage.css';
import CreateExemptionModal from './CreateExemptionModal';

const faculties = ['ФКП', 'ФИТУ', 'ФРЭ', 'ФКСИС', 'ИЭФ', 'ФИБ', 'ВФ'];

const ExemptionsPage = () => {
  const [exemptions, setExemptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchExemptions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/exemptions');
      setExemptions(response.data);
    } catch (error) {
      console.error('Ошибка при получении данных освобождений:', error);
    }
  };

  useEffect(() => {
    fetchExemptions();
  }, []);

  const handleCreateExemption = async (data) => {
    try {
      const response = await axios.post(`http://localhost:8080/exemptions/post/${data.eventId}`, { studentIds: data.studentIds }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        alert('Освобождение успешно создано');
        fetchExemptions();
      } else {
        alert('Ошибка при создании освобождения');
      }
      
    } catch (error) {
      console.error('Ошибка при создании освобождения:', error);
    }
  };

  const deleteExemption = async (exemptionId) => {
    try {
      await axios.delete(`http://localhost:8080/exemptions/delete/${exemptionId}`);
      setExemptions(exemptions.filter(exemption => exemption.exemptionId !== exemptionId));
    } catch (error) {
      console.error("Ошибка при удалении освобождения", error);
    }
  };

  const downloadExemption = async (exemptionId) => {
    try {
      await axios.post(`http://localhost:8080/exemptions/download/${exemptionId}`);
      alert('Скачивание началось в папку освобождения\nПуть: D:/универ/2курс/4семестр/Курсач/документация/освобождения');
    } catch (error) {
      console.error("Ошибка при скачивании освобождения", error);
    }
  };

  const filteredExemptions = exemptions.filter(exemption => {
    return (
      (selectedFaculty === '' || exemption.studentsFacultyExemption === selectedFaculty) &&
      (searchTerm === '' || exemption.eventName.toLowerCase().startsWith(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="page">
      <div className="title">Освобождения</div>
      <div className="exemptions-page">
        <div className="controls-exemption">
          <div className="search-exemption">
            <input
              id="search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Введите название мероприятия"
            />
          </div>
          <div className="filter-exemption">
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
        <section className="exemption-grid">
          {filteredExemptions.length === 0 ? (
            <div>Нет освобождений для отображения</div>
          ) : (
            filteredExemptions.map((exemption) => (
              <ExemptionCard
                key={exemption.exemptionId}
                exemption={exemption}
                onDelete={deleteExemption}
                onDownload={downloadExemption}
              />
            ))
          )}
        </section>
        <CreateExemptionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateExemption}
        />
      </div>
    </div>
  );
};

export default ExemptionsPage;