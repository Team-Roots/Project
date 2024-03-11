import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const BarChart = () => {
  const options = {
    title: {
      text: 'Community Service Hours',
    },
    width: 450,
    height: 350,
    data: [
      {
        // Change type to "doughnut", "line", "splineArea", etc.
        type: 'column',
        dataPoints: [
          { label: 'Jan', y: 2 },
          { label: 'Feb', y: 7 },
          { label: 'Mar', y: 0 },
          { label: 'Apr', y: 0 },
          { label: 'May', y: 0 },
          { label: 'Jun', y: 0 },
          { label: 'Jul', y: 0 },
          { label: 'Aug', y: 0 },
          { label: 'Sep', y: 0 },
          { label: 'Oct', y: 0 },
          { label: 'Nov', y: 0 },
          { label: 'Dec', y: 0 },
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
