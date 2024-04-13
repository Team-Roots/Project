import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import PropTypes from 'prop-types';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const BarChart = ({ userStats }) => {
  console.log(userStats);
  const currentYear = new Date().getFullYear();
  // Check if userStats.completedHours is defined before accessing it
  const currentYearData = userStats.completedHours ? userStats.completedHours.find(
    (entry) => entry.year === currentYear,
  ) : {};

  const options = {
    title: {
      text: `Community Service Hours ${currentYear}`,
    },
    width: 450,
    height: 350,
    data: [
      {
        // Change type to "doughnut", "line", "splineArea", etc.
        type: 'column',
        dataPoints: [
          { label: 'Jan', y: currentYearData.Jan || 0 }, // Use 0 as default value if Jan is undefined
          { label: 'Feb', y: currentYearData.Feb || 0 },
          { label: 'Mar', y: currentYearData.Mar || 0 },
          { label: 'Apr', y: currentYearData.Apr || 0 },
          { label: 'May', y: currentYearData.May || 0 },
          { label: 'Jun', y: currentYearData.Jun || 0 },
          { label: 'Jul', y: currentYearData.Jul || 0 },
          { label: 'Aug', y: currentYearData.Aug || 0 },
          { label: 'Sep', y: currentYearData.Sep || 0 },
          { label: 'Oct', y: currentYearData.Oct || 0 },
          { label: 'Nov', y: currentYearData.Nov || 0 },
          { label: 'Dec', y: currentYearData.Dec || 0 },
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
