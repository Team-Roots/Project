// TimingAndCoordinator.jsx
import React from 'react';
import { TextField } from 'uniforms-bootstrap5';

const TimingAndCoordinator = () => {
  return (
    <>
      <TextField name="startTime" placeholder="Start Time" />
      <TextField name="endTime" placeholder="End Time" />
      <TextField name="coordinator" placeholder="Event Coordinator" />
    </>
  );
};

export default TimingAndCoordinator;
