import React from 'react';
import './secretaryCard.css';

const SecretaryCard = ({ secretary }) => {
  const { secretary_id, last_name, first_name, middle_name, secretary_faculty, telegram_username, image } = secretary;
  const imageUrl = `data:image/jpeg;base64,${image}`;

  return (
    <div className="secretary-card">
      <img src={imageUrl} alt={`${first_name} ${last_name}`} className="secretary-image" />
      <div className="secretary-info">
        <div className="secretary-name">{`${last_name} ${first_name} ${middle_name}`}</div>
        <div className="secretary-title">
          {secretary_id === 1
            ? 'Секретарь ПО ОО «БРСМ» с правами РК УО «БГУИР»'
            : `Секретарь ПО ОО «БРСМ» факультета ${secretary_faculty}`}
        </div>
        <div>{`${telegram_username}`}</div>
      </div>
    </div>
  );
};

export default SecretaryCard;