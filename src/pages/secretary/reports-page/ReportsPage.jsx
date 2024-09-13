import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReportCard from './ReportCard';
import './reports-page.css';

const dormitories = ['1', '2', '3', '4', '5'];

const ReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [selectedDormitory, setSelectedDormitory] = useState('');

  const fetchReports = async () => {
    try {
      const response = await axios.get('http://localhost:8080/reports');
      setReports(response.data);
    } catch (error) {
      console.error('Ошибка при получении данных докладных:', error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleCreateReport = async () => {
    try {
      const response = await axios.get('http://localhost:8080/reports');
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

      const recentReports = response.data.filter(report => new Date(report.report_date) > oneMonthAgo);

      if (recentReports.length > 0) {
        alert('Докладные были созданы менее месяца назад.\nДокладная создается только раз в месяц.');
        return;
      }

      const createResponse  = await axios.post(`http://localhost:8080/reports/post/month`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (createResponse.status === 200) {
        alert('Докладная успешно создана');
        fetchReports();
      } else {
        alert('Ошибка при создании докладной');
      }
      
    } catch (error) {
      console.error('Ошибка при создании докладной:', error);
    }
  };

  const deleteReport = async (reportId) => {
    try {
      await axios.delete(`http://localhost:8080/reports/delete/${reportId}`);
      setReports(reports.filter(report => report.reportId !== reportId));
    } catch (error) {
      console.error("Ошибка при удалении докладной", error);
    }
  };

  const downloadReport = async (reportId) => {
    try {
      await axios.post(`http://localhost:8080/reports/download/${reportId}`);
      alert('Скачивание началось в папку докладных\nПуть: D:/универ/2курс/4семестр/Курсач/документация/докладные');
    } catch (error) {
      console.error("Ошибка при скачивании докладной", error);
    }
  };

  const filteredReports = reports.filter(report => {
    return (
      (selectedDormitory === '' || report.dormNumber.toString() === selectedDormitory)
    );
  });

  return (
    <div className="page">
      <div className="title">Докладные</div>
      <div className="reports-page">
        <div className="controls-report">
          <div className="filter">
            <label htmlFor="dormitory-select">
              Фильтровать по номеру общежития:
            </label>
            <select
              id="dormitory-select"
              value={selectedDormitory}
              onChange={(e) => setSelectedDormitory(e.target.value)}
            >
              <option value="">Все</option>
              {dormitories.map((dormitory) => (
                <option key={dormitory} value={dormitory}>
                  {dormitory}
                </option>
              ))}
            </select>
          </div>
          <button className="export-button" onClick={handleCreateReport}>Сформировать</button>
        </div>
        <section className="report-grid">
          {filteredReports.length === 0 ? (
            <div>Нет докладных для отображения</div>
          ) : (
            filteredReports.map((report) => (
              <ReportCard
                key={report.reportId}
                report={report}
                onDelete={deleteReport}
                onDownload={downloadReport}
              />
            ))
          )}
        </section>
      </div>
    </div>
  );
};

export default ReportsPage;