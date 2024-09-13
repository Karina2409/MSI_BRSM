import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SecretaryCard from './SecretaryCard';

const SecretariesPage = () => {
  const [secretaries, setSecretaries] = useState([]);

  useEffect(() => {
    const fetchSecretaries = async () => {
      try {
        const response = await axios.get('http://localhost:8080/secretaries'); 
        setSecretaries(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных секретарей:', error);
      }
    };

    fetchSecretaries();
  }, []);

  if (secretaries.length === 0) {
    return <div>Нет секретарей для отображения</div>;
  }

  return (
    <div className="page">
      <div className="title">Секретари</div>
      {secretaries.map((secretary) => (
        <SecretaryCard key={secretary.secretary_id} secretary={secretary} />
      ))}
    </div>
  );
};

export default SecretariesPage;