import React, { useState } from 'react';
import Modal from 'react-modal';

const CreatePetitionModal = ({ isOpen, onClose, students, onSubmit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredStudents = students.filter(student => 
    student.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
  };

  const handleSubmit = () => {
    onSubmit(selectedStudent);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Выбор студента"
      className="modal-content-petition"
      overlayClassName="modal-petition"
    >
      <button className="close" onClick={onClose}>&times;</button>
      <h2>Выберите студента</h2>
      <div className="search-petition">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Введите фамилию студента"
        />
      </div>
      <ul className="students-list-petition">
        {filteredStudents.map((student) => (
          <li
            key={student.id}
            onClick={() => handleSelectStudent(student)}
            className={selectedStudent?.id === student.id ? 'selected' : ''}
          >
            {student.lastName} {student.firstName}
          </li>
        ))}
      </ul>
      {selectedStudent && (
        <div className="selected-student">
          {selectedStudent.lastName} {selectedStudent.firstName}
        </div>
      )}
      <div className="controls-petition">
        <button onClick={handleSubmit} disabled={!selectedStudent}>Сформировать</button>
        <button onClick={onClose}>Отмена</button>
      </div>
    </Modal>
  );
};

export default CreatePetitionModal;