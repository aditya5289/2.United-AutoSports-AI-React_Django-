import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Grid, Box, LinearProgress } from '@mui/material';
import io from 'socket.io-client';
import '../App.css';

const socket = io('http://localhost:5000');  // Your Flask-SocketIO server URL

function CognitiveEndurance() {
  const [data, setData] = useState({});

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to WebSocket');
      socket.emit('start_sending_data');  // Request server to start sending sensor data
    });

    socket.on('driver_sensor_data', (sensorData) => {
      console.log('Received data:', sensorData);  // Log received data to console
      setData(sensorData);
    });

    return () => {
      socket.off('driver_sensor_data');
    };
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 3 }}>Cognitive Endurance Tracker</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="body2">Heart Rate: {data.heart_rate ? data.heart_rate.toFixed(2) : 'N/A'} bpm</Typography>
            </Box>
            <Box>
              <Typography variant="body2">Blood Pressure: {data.blood_pressure ? `${data.blood_pressure.systolic.toFixed(2)}/${data.blood_pressure.diastolic.toFixed(2)}` : 'N/A'} mmHg</Typography>
            </Box>
            <Box>
              <Typography variant="body2">Oxygen Saturation: {data.oxygen_saturation ? data.oxygen_saturation.toFixed(2) : 'N/A'}%</Typography>
            </Box>
            <Box>
              <Typography variant="body2">Reaction Time: {data.reaction_time ? data.reaction_time.toFixed(2) : 'N/A'} s</Typography>
            </Box>
            <Box>
              <Typography variant="body2">Cognitive Load:</Typography>
              <LinearProgress variant="determinate" value={data.cognitive_load ? data.cognitive_load * 100 : 0} sx={{ mb: 1 }} />
            </Box>
            <Box>
              <Typography variant="body2">Body Temperature: {data.body_temperature ? data.body_temperature.toFixed(2) : 'N/A'} °C</Typography>
            </Box>
            <Box>
              <Typography variant="body2">Respiration Rate: {data.respiration_rate ? data.respiration_rate.toFixed(2) : 'N/A'} breaths/min</Typography>
            </Box>
            <Box>
              <Typography variant="body2">Electrodermal Activity: {data.electrodermal_activity ? data.electrodermal_activity.toFixed(2) : 'N/A'} µS</Typography>
            </Box>
            <Box>
              <Typography variant="body2">Pupil Dilation: {data.pupil_dilation ? data.pupil_dilation.toFixed(2) : 'N/A'} mm</Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default CognitiveEndurance;
