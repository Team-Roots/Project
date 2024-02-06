import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const BarChart = () => {
  const options = {
    title: {
      text: 'Community Service Hours',
    },
    width: 250,
    height: 250,
    data: [
      {
        // Change type to "doughnut", "line", "splineArea", etc.
        type: 'column',
        dataPoints: [
          { label: 'Jan', y: 10 },
          { label: 'Feb', y: 15 },
          { label: 'Mar', y: 25 },
          { label: 'Apr', y: 30 },
          { label: 'May', y: 28 },
          { label: 'Jun', y: 10 },
          { label: 'Jul', y: 15 },
          { label: 'Aug', y: 25 },
          { label: 'Sep', y: 30 },
          { label: 'Oct', y: 28 },
          { label: 'Nov', y: 10 },
          { label: 'Dec', y: 15 },
        ],
      },
    ],
  };
  return (
    <div>
      <CanvasJSChart options={options} />
      {/* You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods */}
    </div>
  );
};

export default BarChart;
