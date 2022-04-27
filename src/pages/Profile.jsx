import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';

const Profile = () => {

  const { currentUser } = useSelector(state=>(state.auth))
  

  return (
    <div className='profile-container'>
    <Card sx={{ minWidth: 500, maxWidth:750, height:300 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          UserName:
        </Typography>
        <Typography variant="h5" component="div">
          {currentUser.email.slice(0, currentUser.email.indexOf("@")).toUpperCase()}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Email:
        </Typography>
        <Typography variant="body2">
        {currentUser.email}
        </Typography>
      </CardContent>
    </Card>
    </div>
  );
}

export default Profile