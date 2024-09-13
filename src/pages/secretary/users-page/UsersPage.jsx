import React, { useEffect, useState } from 'react';
import CustomizedTables from './Table';
import { MenuItem, Select, CircularProgress, Typography } from '@mui/material';
import './user-page.css';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [roles] = useState(['student', 'secretary', 'chief_secretary']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/users')
      .then(response => response.json())
      .then(data => {
        const userRequests = data.map(user => {
          if (!user.user_id) {
            return Promise.resolve({ ...user, fullName: 'N/A' });
          }

          if (user.role === 'student') {
            return fetch(`http://localhost:8080/users/student/${user.user_id}`)
              .then(response => response.json())
              .then(studentData => ({
                ...user,
                fullName: `${studentData.lastName} ${studentData.firstName} ${studentData.middle_name || ''}`,
              }))
              .catch(() => ({ ...user, fullName: 'N/A' }));
          } else if (user.role === 'secretary' || user.role === 'chief_secretary') {
            return fetch(`http://localhost:8080/users/secretary/${user.user_id}`)
              .then(response => response.json())
              .then(secretaryData => ({
                ...user,
                fullName: `${secretaryData.last_name} ${secretaryData.first_name} ${secretaryData.middle_name || ''}`,
              }))
              .catch(() => ({ ...user, fullName: 'N/A' }));
          } else {
            return Promise.resolve({ ...user, fullName: 'N/A' });
          }
        });

        Promise.all(userRequests)
          .then(usersWithFullNames => {
            const formattedData = usersWithFullNames.map(user => ({
              login: user.login,
              fullName: user.fullName,
              role: user.role,
              user_id: user.user_id,
            }));
            setUsers(formattedData);
            setLoading(false);
          });
      })
      .catch(error => {
        console.error('Ошибка при получении данных пользователей:', error);
        setError('Ошибка при получении данных пользователей');
        setLoading(false);
      });
  }, []);

  const handleRoleChange = (user_id, newRole) => {
    if (!user_id) {
      console.error('Неверный идентификатор пользователя');
      return;
    }
  
    fetch(`http://localhost:8080/users/${user_id}/role`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role: newRole }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Ошибка при обновлении роли пользователя');
      }
      console.log('Роль пользователя успешно обновлена');

      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.user_id === user_id ? { ...user, role: newRole } : user
        )
      );
    })
    .catch(error => {
      console.error('Ошибка при обновлении роли пользователя:', error);
    });
  };

  const headLine = ['Логин', 'ФИО', 'Роль'];

  const formattedData = users.map(user => ({
    ...user,
    role: (
      <Select
        value={user.role}
        onChange={e => handleRoleChange(user.user_id, e.target.value)}
      >
        {roles.map(role => (
          <MenuItem key={role} value={role}>
            {role}
          </MenuItem>
        ))}
      </Select>
    ),
  }));

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div className='page'>
      <h1 className='title'>Пользователи</h1>
      <div className='custom-table-users'>
        <CustomizedTables data={formattedData} headLine={headLine} />
      </div>
    </div>
  );
};

export default UsersPage;