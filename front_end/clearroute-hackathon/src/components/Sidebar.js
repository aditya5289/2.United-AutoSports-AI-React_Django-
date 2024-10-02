import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import '../Sidebar.css'; // Optional if you want to separate sidebar CSS

function Sidebar() {
  return (
    <div className="sidebar">
      <List>
       
        <ListItem button component={Link} to="/tire-wear-prediction">
          <ListItemText primary="Tire Wear Prediction" />
        </ListItem>
      
      </List>
    </div>
  );
}

export default Sidebar;
