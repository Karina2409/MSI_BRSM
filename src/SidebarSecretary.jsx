import React from 'react';
import "./styles/header.css";
import "./styles/menu.css";
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const SidebarSecretary = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleNavigate = (path) => () => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return <Navigate to="/" replace />;
  }

  
  return (
    <>
      <header className="header">
        <img className="brsm-icon" src="/brsm-icon.png" alt="BRSM Icon" />
        <div>Белорусский Республиканский Союз Молодежи</div>
      </header>
      <nav className="sidebar">
        <div
          className="sidebar-link"
          onClick={handleNavigate("/secretary/students")}
        >
          <div>Студенты</div>
        </div>

        {user.role === 'chief_secretary' && (
          <div
            className="sidebar-link"
            onClick={handleNavigate("/secretary/users")}
          >
            <div>Пользователи</div>
          </div>
        )}

        <div
          className="sidebar-link"
          onClick={handleNavigate("/secretary/events")}
        >
          <div>Мероприятия</div>
        </div>

        <div
          className="sidebar-link"
          onClick={handleNavigate("/secretary/exemptions")}
        >
          <div>Освобождения</div>
        </div>

        <div
          className="sidebar-link"
          onClick={handleNavigate("/secretary/reports")}
        >
          <div>Докладные</div>
        </div>

        <div
          className="sidebar-link"
          onClick={handleNavigate("/secretary/petitions")}
        >
          <div>Ходатайства</div>
        </div>

        <div
          className="sidebar-link"
          onClick={handleNavigate("/secretary/statistics")}
        >
          <div>Статистика</div>
        </div>

        <div className="sidebar-link" onClick={handleLogout}>
          <div>Выйти</div>
        </div>
      </nav>
    </>
  );
};

export default SidebarSecretary;