import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Grid from '@mui/material/Grid';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import NoImage from "../assets/placeholder.png"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setTag } from '../redux/actions/tagAction';
import { noatifyDelete } from '../helpers/toastNotify';

export default function BlogCard({ tag }) {


  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => (state.auth))

  const addDefaultSrc = (e) =>{
    e.target.src = NoImage
  }

  const onClick = () => {
    if (currentUser) {

      navigate(`/details`, { state: { tag } })
      dispatch(setTag(tag))
    } else {
      navigate("/login")
      noatifyDelete("Login for Details")
    }
  }


  return (

    <Grid item>
      <Card sx={{ width: 345 }}>
        <div onClick={onClick} style={{ cursor: "pointer" }}>
          <CardMedia
            onError={addDefaultSrc}
            component="img"
            height="194"
            image={tag.imageUrl}
            alt={tag.title}
          />
          <CardContent>
            <Typography variant="body2" className='content-text-container' sx={{ backgroundColor: "#F7ECDC", p: 2, m: -2 }}>
              <h2 className='tag-title'>{tag.title.toUpperCase()}</h2>
              <p className='tag-date'><small>{tag.date}</small></p>
              <p className='tag-content-text'>{tag.contentText}</p>
            </Typography>
          </CardContent>
        </div>
        <div className='tag-contact-email'>
          <ContactPageIcon />
          <a href="https://mail.google.com/mail/u/0/#inbox?compose=new" rel="noreferrer" target="_blank"><p>{tag.userEmail}</p></a>
        </div>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}