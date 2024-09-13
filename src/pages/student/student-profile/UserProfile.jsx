import React, {useEffect, useState} from 'react';
import "./profile-page.css";
import PetitionSuns from './PetitionSuns';
import StudentInfo from './StudentInfo';
import EditStudentForm from './EditStudentForm';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [studentId, setStudentId] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user?.userId;
      const token = user?.token;

      if (!userId || !token) {
        console.error('User not authenticated');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/users/student/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          setStudentId(data.studentId);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseEditForm = () => {
    setIsEditing(false);
  };

  const handleSave = (updatedData) => {
    setUserData(updatedData);
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page user-page">
      <h1 className='title'>Личный кабинет</h1>
      <div className='cont'>
        <StudentInfo student={userData} />
        <div className='sun-count'>
          <PetitionSuns studentId={studentId} />
        </div>
      </div>
      <button onClick={handleEditClick} className='edit-button-student'>Изменить данные</button>
      {isEditing && (
        <EditStudentForm 
          student={userData} 
          onClose={handleCloseEditForm} 
          onSave={handleSave} 
        />
      )}
    </div>
  );
};

export default UserProfile;