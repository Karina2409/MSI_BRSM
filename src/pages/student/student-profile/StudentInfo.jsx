import React from 'react';
import './studentInfo.css';

const StudentInfo = ({ student }) => {

  const dateParts = student.date_of_birth ? student.date_of_birth.split('-') : ["", "", ""];
  const utcDate = dateParts[0] && dateParts[1] && dateParts[2] ? new Date(Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2])) : null;
  
  if (utcDate) {
    utcDate.setUTCDate(utcDate.getUTCDate() + 1);
  }

  const formattedDate = utcDate ? utcDate.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }) : "";


  return (
      <table className='table-data'>
        <tbody>
          <tr>
            <th scope='row' className='th-t'>Фамилия</th>
            <td>{student.lastName}</td>
          </tr>
          <tr>
            <th scope='row' className='th-t'>Имя</th>
            <td>{student.firstName}</td>
          </tr>
          <tr>
            <th scope='row' className='th-t'>Отчество</th>
            <td>{student.middle_name}</td>
          </tr>
          <tr>
            <th scope='row' className='th-t'>Эл. почта</th>
            <td>{student.email_adress}</td>
          </tr>
          <tr>
            <th scope='row' className='th-t'>Дата рождения</th>
            <td>{formattedDate}</td>
          </tr>
          <tr>
            <th scope='row' className='th-t'>Факультет</th>
            <td>{student.student_faculty}</td>
          </tr>
          <tr>
            <th scope='row' className='th-t'>№ группы</th>
            <td>{student.group_number}</td>
          </tr>
        </tbody>
      </table>
  );
};

export default StudentInfo;