import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';
import api from '../api';

function WorkloadOptimizer() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/workload-optimizer');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
        setData([]); // Ensure data is an array even if there's an error
      }
    };

    fetchData();
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Workload Optimizer</Typography>
        <List>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item.description} secondary={item.timestamp} />
              </ListItem>
            ))
          ) : (
            <Typography variant="body1">No data available</Typography>
          )}
        </List>
      </CardContent>
    </Card>
  );
}

export default WorkloadOptimizer;
