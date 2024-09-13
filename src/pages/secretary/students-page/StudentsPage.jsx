import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StudentCard from './StudentCard';
import './students-page.css';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [faculty, setFaculty] = useState('Все факультеты');
  const [searchLastName, setSearchLastName] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/students');
        setStudents(response.data);
        setFilteredStudents(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных студентов:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleFacultyChange = (e) => {
    const selectedFaculty = e.target.value;
    setFaculty(selectedFaculty);
    if (selectedFaculty === 'Все факультеты') {
      setFilteredStudents(students);
    } else {
      setFilteredStudents(students.filter(student => student.student_faculty === selectedFaculty));
    }
  };

  const handleSearchChange = (e) => {
    const lastName = e.target.value;
    setSearchLastName(lastName);
    filterStudents(faculty, lastName);
  };

  const filterStudents = (selectedFaculty, lastName) => {
    let filtered = students;
    
    if (selectedFaculty !== 'Все факультеты') {
      filtered = filtered.filter(student => student.student_faculty === selectedFaculty);
    }
    
    if (lastName) {
      filtered = filtered.filter(student => student.lastName.toLowerCase().startsWith(lastName.toLowerCase()));
    }

    setFilteredStudents(filtered);
  };

  return (
    <div className="page">
      <div className="title">Студенты</div>
      <div className="filter-container">
        <div className="filter">
          <label htmlFor="faculty-filter">Факультет:</label>
          <select id="faculty-filter" value={faculty} onChange={handleFacultyChange}>
            <option value="Все факультеты">Все факультеты</option>
            <option value="ФКП">ФКП</option>
            <option value="ФИТУ">ФИТУ</option>
            <option value="ФРЭ">ФРЭ</option>
            <option value="ФКСИС">ФКСИС</option>
            <option value="ИЭФ">ИЭФ</option>
            <option value="ФИБ">ФИБ</option>
            <option value="ВФ">ВФ</option>
          </select>
        </div>
        <div className="search-box">
          <label htmlFor="search-last-name">Поиск по фамилии:</label>
          <input
            id="search-last-name"
            type="text"
            value={searchLastName}
            onChange={handleSearchChange}
            placeholder="Введите фамилию"
          />
        </div>
      </div>
      {filteredStudents.length === 0 ? (
        <div>Нет студентов для отображения</div>
      ) : (
        filteredStudents.map(student => (
          <StudentCard key={student.studentId} student={student} />
        ))
      )}
    </div>
  );
};

export default StudentsPage;