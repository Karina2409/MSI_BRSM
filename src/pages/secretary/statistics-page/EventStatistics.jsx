import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title
} from 'chart.js';

ChartJS.register(
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title
);

const EventStatistics = () => {
    const [period, setPeriod] = useState('month');
    const [chartData, setChartData] = useState({});
    const [chartType, setChartType] = useState('pie');

    useEffect(() => {
        if (period) {
            axios.get('http://localhost:8080/events/eventStatistics', { params: { period } })
                .then(response => {
                    const data = response.data;
                    const labels = Object.keys(data);
                    const values = Object.values(data);

                    setChartData({
                      labels: labels,
                      datasets: [
                        {
                          data: values,
                          backgroundColor: [
                            "#EE4E4E",//ФИБ
                            "#C4E4FF",//ФКСИС
                            "#FFD95A",//ФКП
                            "#B0EBB4",//ИЭФ
                            "#BE9FE1",//ФИТУ
                            "#FFA27F",//ФРЭ
                            "#6F4E37",//ВФ
                          ],
                          hoverBackgroundColor: [
                            "#EE4E4E",
                            "#C4E4FF",
                            "#FFD95A",
                            "#B0EBB4",
                            "#BE9FE1",
                            "#FFA27F",
                            "#6F4E37",
                          ],
                        },
                      ],
                    });
                });
        }
    }, [period]);

    return (
        <div>
            <div>
                <label className='label-event-statistic'>Выбранный период:</label>
                <select value={period} onChange={e => setPeriod(e.target.value)} className='select-event-statistic'>
                    <option value="month">Последний месяц</option>
                    <option value="semester">Текущий семестр</option>
                    <option value="year">Предыдущий год</option>
                </select>
            </div>
            <div>
                <label className='label-event-statistic'>Выбранный тип диаграммы:</label>
                <select value={chartType} onChange={e => setChartType(e.target.value)} className='select-event-statistic'>
                    <option value="pie">Круговая диаграмма</option>
                    <option value="bar">Столбчатая диаграмма</option>
                </select>
            </div>
            {chartData.labels && (
                chartType === 'pie' ? <Pie data={chartData} /> : <Bar data={chartData} />
            )}
        </div>
    );
};

export default EventStatistics;