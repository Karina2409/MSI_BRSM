import React from 'react';
import "./styles/header.css";
import "./styles/menu.css";
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const SidebarStudent = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();


  const handleNavigate = (path) => () => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
  };
  
  return (
    <>
      <header className="header">
        <img className="brsm-icon" src="/brsm-icon.png" alt="BRSM Icon" />        
        <div>Белорусский Республиканский Союз Молодежи</div>
      </header>
      <nav className="sidebar">
      
      <div className="sidebar-link" onClick={handleNavigate('/student/main')}>
        <div>Главная</div>
      </div>

      <div className="sidebar-link" onClick={handleNavigate('/student/profile')}>
        <div>Профиль</div>
      </div>

      <div className="sidebar-link" onClick={handleNavigate('/student/my-events')}>
        <div>Мои мероприятия</div>
      </div>

      <div className="sidebar-link" onClick={handleNavigate('/student/events')}>
        <div>Мероприятия</div>
      </div>

      <div className="sidebar-link" onClick={handleNavigate('/student/secretaries')}>
        <div>Секретари</div>
      </div>
      
      <div className="sidebar-link" onClick={handleLogout}>
        <div>Выйти</div>
      </div>
    </nav>

    </>
  );
};

export default SidebarStudent;