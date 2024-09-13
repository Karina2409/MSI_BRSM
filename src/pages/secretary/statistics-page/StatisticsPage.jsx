import React from 'react';
import EventStatistics from './EventStatistics';
import './events-statistic.css';

const StatisticsPage = () => {
    return (
      <div className="page">
        <h1 className="title">Статистика</h1>

        <div className="statistics-section-event-statistic">
          <h2 className="h2-event-statistic">
            Статистика посещаемости мероприятий по факультетам
          </h2>
          <EventStatistics />
        </div>
      </div>
    );
};

export default StatisticsPage;