import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Grid, Box, LinearProgress } from '@mui/material';
import TireRepairIcon from '@mui/icons-material/TireRepair';
import io from 'socket.io-client';
import '../App.css';  // Import the CSS file

const socket = io('http://localhost:5000');  // Your Flask-SocketIO server URL

function TireWearPrediction() {
  const [data, setData] = useState({});

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    socket.on('tire_sensor_data', (sensorData) => {
      console.log('Received tire data:', sensorData);  // Log the received data
      setData(sensorData);
    });

    return () => {
      socket.off('tire_sensor_data');
    };
  }, []);

  const startSendingData = () => {
    socket.emit('start_sending_data');
  };

  const stopSendingData = () => {
    socket.emit('stop_sending_data');
  };

  const renderTireData = (tire, attributes) => (
    attributes ? (
      <Box key={tire} className="card-box">
        <Typography variant="h6" className="tire-header">
          <TireRepairIcon />
          {tire.replace('_', ' ')}
        </Typography>
        <Typography variant="body2" className="tire-attribute">Pressure: {attributes.pressure?.toFixed(2) || 'N/A'} psi</Typography>
        <Typography variant="body2" className="tire-attribute">Temperature: {attributes.temperature?.toFixed(2) || 'N/A'} °C</Typography>
        <Typography variant="body2" className="tire-attribute">Wear Level:</Typography>
        <LinearProgress variant="determinate" value={attributes.wear_level || 0} sx={{ mb: 1 }} />
        <Typography variant="body2" className="tire-attribute">Tread Depth: {attributes.tread_depth?.toFixed(2) || 'N/A'} mm</Typography>
        <Typography variant="body2" className="tire-attribute">Sidewall Integrity: {attributes.sidewall_integrity || 'N/A'}</Typography>
        <Typography variant="body2" className="tire-attribute">Overall Condition: {attributes.overall_condition || 'N/A'}</Typography>
      </Box>
    ) : (
      <Typography variant="body2">No data available for {tire.replace('_', ' ')}</Typography>
    )
  );

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 3 }}>Tire Wear Prediction</Typography>
        <button onClick={startSendingData}>Start Sending Data</button>
        <button onClick={stopSendingData}>Stop Sending Data</button>
        <Grid container spacing={3}>
          {Object.keys(data).length > 0 ? (
            Object.entries(data.sensor_data).map(([tire, attributes]) => (
              <Grid item xs={12} md={6} key={tire}>
                {renderTireData(tire, attributes)}
              </Grid>
            ))
          ) : (
            <Typography variant="body1">No data available</Typography>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default TireWearPrediction;
