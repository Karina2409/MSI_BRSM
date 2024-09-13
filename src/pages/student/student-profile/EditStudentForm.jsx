import React, { useState } from 'react';
import axios from 'axios';

const EditStudentForm = ({ student, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...student });
  

  const faculties = [
    'ФКП',
    'ФИТУ',
    'ФРЭ',
    'ФКСИС',
    'ИЭФ',
    'ФИБ',
    'ВФ'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/students/student/${student.studentId}`, formData);
      if (response.status === 200) {
        onSave(response.data);
        onClose();
      } else {
        console.error('Failed to update student data');
      }
    } catch (error) {
      console.error('Error updating student data:', error);
    }
  };

  return (
    <div className="edit-form-overlay-student">
      <div className="edit-form-student">
        <h2>Редактировать данные</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Фамилия:
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
          </label>
          <label>
            Имя:
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
          </label>
          <label>
            Отчество:
            <input type="text" name="middle_name" value={formData.middle_name} onChange={handleChange} />
          </label>
          <label>
            Номер группы:
            <input type="text" 
              name="group_number" 
              value={formData.group_number} 
              onChange={handleChange} 
              pattern="\d{1,6}" 
              title="Номер группы должен быть не более 6 цифр"/>
          </label>
          <label>
            Факультет:
            <select name="student_faculty" value={formData.student_faculty} onChange={handleChange}>
              {faculties.map((faculty, index) => (
                <option key={index} value={faculty}>
                  {faculty}
                </option>
              ))}
            </select>
          </label>
          <label>
            Дата рождения:
            <input type="date" 
              name="date_of_birth" 
              value={formData.date_of_birth} 
              onChange={handleChange} 
              max={new Date().toISOString().split('T')[0]} />
          </label>
          <label>
            Email:
            <input type="email" name="email_adress" value={formData.email_adress} onChange={handleChange} />
          </label>
          <label>
            Проживание в общежитии:
            <input type="checkbox" name="dormitory_residence" checked={formData.dormitory_residence} onChange={(e) => setFormData({ ...formData, dormitory_residence: e.target.checked })} />
          </label>
          <label>
            Номер блока общежития:
            <input type="text" name="dorm_block_number" value={formData.dorm_block_number} onChange={handleChange} />
          </label>
          <label>
            Номер общежития:
            <input type="text" name="dorm_number" value={formData.dorm_number} onChange={handleChange} />
          </label>
          <label>
            Полное имя студента:
            <input type="text" name="student_full_name_d" value={formData.student_full_name_d} onChange={handleChange} />
          </label>
          <button type="submit">Сохранить</button>
          <button type="button" onClick={onClose}>Отмена</button>
        </form>
      </div>
    </div>
  );
};

export default EditStudentForm;