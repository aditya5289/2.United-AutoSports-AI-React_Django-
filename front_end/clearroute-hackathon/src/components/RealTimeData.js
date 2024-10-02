import React, { useEffect, useState } from 'react';
import { Typography, Grid, Card, CardContent } from '@material-ui/core';
import io from 'socket.io-client';
import { Line } from 'react-chartjs-2';
import api from '../api';

const socket = io.connect('http://localhost:5000');

function RealTimeData() {
  const [data, setData] = useState({});
  const [prediction, setPrediction] = useState(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Speed',
        data: [],
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
      {
        label: 'RPM',
        data: [],
        borderColor: 'rgba(153,102,255,1)',
        fill: false,
      },
      {
        label: 'Fuel Level',
        data: [],
        borderColor: 'rgba(255,159,64,1)',
        fill: false,
      },
      {
        label: 'Tire Pressure',
        data: [],
        borderColor: 'rgba(255,99,132,1)',
        fill: false,
      },
      {
        label: 'Engine Temperature',
        data: [],
        borderColor: 'rgba(54,162,235,1)',
        fill: false,
      },
    ],
  });

  useEffect(() => {
    socket.on('message', (message) => {
      const parsedMessage = JSON.parse(message);
      setData(parsedMessage.sensor_data);
      setPrediction(parsedMessage.prediction);
      updateChart(parsedMessage.sensor_data);
    });
  }, []);

  const updateChart = (sensorData) => {
    setChartData((prevChartData) => {
      const newLabels = [...prevChartData.labels, new Date().toLocaleTimeString()];
      const newDatasets = prevChartData.datasets.map((dataset) => {
        if (dataset.label === 'Speed') {
          return { ...dataset, data: [...dataset.data, sensorData.speed] };
        }
        if (dataset.label === 'RPM') {
          return { ...dataset, data: [...dataset.data, sensorData.rpm] };
        }
        if (dataset.label === 'Fuel Level') {
          return { ...dataset, data: [...dataset.data, sensorData.fuel_level] };
        }
        if (dataset.label === 'Tire Pressure') {
          return { ...dataset, data: [...dataset.data, sensorData.tire_pressure.reduce((a, b) => a + b) / 4] };
        }
        if (dataset.label === 'Engine Temperature') {
          return { ...dataset, data: [...dataset.data, sensorData.engine_temp] };
        }
        return dataset;
      });

      return { labels: newLabels, datasets: newDatasets };
    });
  };

  return (
    <div>
      <Typography variant="h4">Real-Time Data from Car Sensors</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Line data={chartData} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Sensor Data</Typography>
              <Typography variant="body1">Speed: {data.speed}</Typography>
              <Typography variant="body1">RPM: {data.rpm}</Typography>
              <Typography variant="body1">Fuel Level: {data.fuel_level}</Typography>
              <Typography variant="body1">
                Tire Pressure: {data.tire_pressure && data.tire_pressure.join(', ')}
              </Typography>
              <Typography variant="body1">Engine Temperature: {data.engine_temp}</Typography>
              {prediction && <Typography variant="h6">Predicted Maintenance: {prediction}</Typography>}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default RealTimeData;
