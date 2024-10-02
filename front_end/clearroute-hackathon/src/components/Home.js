import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, Grid, Box } from '@mui/material';
import '../App.css';  // Import the CSS file

function Home() {
  return (
    <div className="home">
      <Typography variant="h4" sx={{ mb: 3 }}>Welcome to the United Autosports Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5">Cognitive Endurance Tracker</Typography>
              <Link to="/cognitive-endurance">Go to Cognitive Endurance Tracker</Link>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5">Sleep Optimization for Teams</Typography>
              <Link to="/sleep-optimization">Go to Sleep Optimization</Link>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5">Predictive Maintenance</Typography>
              <Link to="/predictive-maintenance">Go to Predictive Maintenance</Link>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5">Tire Wear Prediction</Typography>
              <Link to="/tire-wear-prediction">Go to Tire Wear Prediction</Link>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5">Workload Optimizer</Typography>
              <Link to="/workload-optimizer">Go to Workload Optimizer</Link>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5">Augmented Reality Pit Crew Assistance</Typography>
              <Link to="/augmented-reality">Go to Augmented Reality</Link>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5">Blockchain-Based Supply Chain Tracking</Typography>
              <Link to="/blockchain-supply-chain">Go to Blockchain Supply Chain</Link>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5">Real-Time Data</Typography>
              <Link to="/real-time-data">Go to Real-Time Data</Link>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
