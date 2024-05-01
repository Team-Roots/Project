import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import PropTypes from 'prop-types';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const BarChart = ({ userStats }) => {
  console.log(userStats);
  const [chartWidth, setChartWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Function to update chart width when window is resized
    const handleResize = () => {
      setChartWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const currentYear = new Date().getFullYear();
  // Check if userStats.completedHours is defined before accessing it
  const currentYearData = userStats.completedHours ? userStats.completedHours.find(
    (entry) => entry.year === currentYear,
  ) : {};
  console.log(currentYearData.Apr.toFixed(1));
  // const screenWidth = window.innerWidth;
  const options = {
    title: {
      text: `Community Service Hours ${currentYear}`,
    },
    width: 1300 + (chartWidth / 1300),
    height: 350,
    data: [
      {
        // Change type to "doughnut", "line", "splineArea", etc.
        type: 'column',
        dataPoints: [
          { label: 'Jan', y: Number(currentYearData.Jan.toFixed(1)) || 0.0 }, // Use 0 as default value if Jan is undefined
          { label: 'Feb', y: Number(currentYearData.Feb.toFixed(1)) || 0.0 },
          { label: 'Mar', y: Number(currentYearData.Mar.toFixed(1)) || 0.0 },
          { label: 'Apr', y: Number(currentYearData.Apr.toFixed(1)) || 0.0 },
          { label: 'May', y: Number(currentYearData.May.toFixed(1)) || 0.0 },
          { label: 'Jun', y: Number(currentYearData.Jun.toFixed(1)) || 0.0 },
          { label: 'Jul', y: Number(currentYearData.Jul.toFixed(1)) || 0.0 },
          { label: 'Aug', y: Number(currentYearData.Aug.toFixed(1)) || 0.0 },
          { label: 'Sep', y: Number(currentYearData.Sep.toFixed(1)) || 0.0 },
          { label: 'Oct', y: Number(currentYearData.Oct.toFixed(1)) || 0.0 },
          { label: 'Nov', y: Number(currentYearData.Nov.toFixed(1)) || 0.0 },
          { label: 'Dec', y: Number(currentYearData.Dec.toFixed(1)) || 0.0 },
        ],
      },
    ],
  };
  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

BarChart.propTypes = {
  userStats: PropTypes.shape({
    completedHours: PropTypes.arrayOf(
      PropTypes.shape({
        year: PropTypes.number.isRequired,
        Jan: PropTypes.number.isRequired,
        Feb: PropTypes.number.isRequired,
        Mar: PropTypes.number.isRequired,
        Apr: PropTypes.number.isRequired,
        May: PropTypes.number.isRequired,
        Jun: PropTypes.number.isRequired,
        Jul: PropTypes.number.isRequired,
        Aug: PropTypes.number.isRequired,
        Sep: PropTypes.number.isRequired,
        Oct: PropTypes.number.isRequired,
        Nov: PropTypes.number.isRequired,
        Dec: PropTypes.number.isRequired,
      }).isRequired,
    ).isRequired,
  }).isRequired,
};

export default BarChart;
