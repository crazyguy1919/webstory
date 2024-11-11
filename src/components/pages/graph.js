import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MonthlyPublishedStories = () => {
  const [storyData, setStoryData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i); 

  useEffect(() => {
    const fetchedData = [20, 40, 30, 50, 60, 70, 55, 80, 90, 60, 75, 100]; 
    setStoryData(fetchedData);
  }, [selectedMonth, selectedYear]);

  const chartData = {
    labels: months,
    datasets: [
      {
        label: `Published Stories in ${selectedYear} (%)`,
        data: storyData,
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        tension: 0.15, 
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointRadius: 4,
        pointHoverRadius: 6,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: `Monthly Published Stories for ${selectedYear} (as % of target)`,
        font: { size: 18 },
      }
    },
    scales: {
      x: {
        grid: { display: false },
        // title: { display: true, text: 'Month' }
      },
      y: {
        beginAtZero: true,
        max: 100, 
        ticks: {
          stepSize: 20, 
          callback: (value) => `${value}%` 
        },
        title: { display: true, text: 'Percentage (%)' },
        grid: { color: 'rgba(200, 200, 200, 0.2)' }
      }
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div className="container mt-5 p-4 bg-light rounded shadow-sm">
      <h3 className="mb-4">Monthly Published Stories</h3>
      <div className="d-flex justify-content-end gap-3 mb-4">
        <div className="form-group">
          <select
            id="month"
            value={selectedMonth}
            onChange={handleMonthChange}
            className="form-select"
          >
            {months.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <select
            id="year"
            value={selectedYear}
            onChange={handleYearChange}
            className="form-select"
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default MonthlyPublishedStories;
