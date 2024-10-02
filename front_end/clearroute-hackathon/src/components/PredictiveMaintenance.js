import React, { useState } from 'react';
import { Typography, Card, CardContent, Button, TextField } from '@material-ui/core';
import api from '../api';

function PredictiveMaintenance() {
  const [data, setData] = useState({});
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post('/predictive-maintenance', data);
      setResult(response.data.prediction);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Predictive Maintenance</Typography>
        <TextField name="speed" label="Speed" onChange={handleChange} />
        <TextField name="rpm" label="RPM" onChange={handleChange} />
        <TextField name="fuel_level" label="Fuel Level" onChange={handleChange} />
        <TextField name="tire_pressure" label="Tire Pressure" onChange={handleChange} />
        <TextField name="engine_temp" label="Engine Temperature" onChange={handleChange} />
        <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
        {result && <Typography variant="h6">Prediction: {result}</Typography>}
      </CardContent>
    </Card>
  );
}

export default PredictiveMaintenance;
