import React from 'react'
import BlogCard from '../components/BlogCard'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useFetch } from '../helpers/firebase';

const Dashboard = () => {

  const {tagList}=useFetch();
  
  return (
    <Container maxWidth="lg">
      <Grid
      sx={{ my: 3, px:"auto"}}
      rowSpacing={3}
      container spacing={6} columns={12}
    >
      {tagList?.map((tag) => (<BlogCard tag={tag} key={tag.id}/>))}

    </Grid>
    </Container>
    

  )
}

export default Dashboard