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
import Button from '@mui/material/Button';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import NoImage from "../assets/placeholder.png"
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { UserDelete } from '../helpers/firebase';
import { setTag } from '../redux/actions/tagAction';

const Details = () => {

  const { currentUser } = useSelector(state => (state.auth))
  const location = useLocation()
  const tagDetail = location.state.tag
  const dispatch = useDispatch()


  const navigate = useNavigate()

  const deleteTag = () => {

    UserDelete(tagDetail.id)
    navigate("/")
  }
  const updateTag = () => {
    dispatch(setTag(tagDetail))
    navigate("/update-blog")

  }
  const addDefaultSrc = (e) => {
    e.target.src = NoImage
  }
  return (
    <div>
      <div className='header-container'>
        <h1 className='header-details'><span>──────</span> DETAILS <span>──────</span></h1>
      </div>
      <Grid item sx={{ m: 2 }} >
        <Card sx={{ width: "70vw", mx: "auto", mt: 2 }}>
          <CardMedia
            onError={addDefaultSrc}
            component="img"
            height="600px"
            image={tagDetail.imageUrl}
            alt={tagDetail.title}
          />
          <CardContent>
            <Typography variant="body2" className='content-text-container' sx={{ backgroundColor: "#dce9eb", p: 4, m: -2, textAlign: "center" }}>
              <h2 className='tag-title'>{tagDetail.title.toUpperCase()}</h2>
              <p className='tag-date'>{tagDetail.date}</p>
              <p className='tag-content-detail'>{tagDetail.contentText}</p>

            </Typography>
          </CardContent>
          <div className='tag-contact-email'>
            <ContactPageIcon />
            <a href="https://mail.google.com/mail/u/0/#inbox?compose=new" rel="noreferrer" target="_blank"><p>{tagDetail.userEmail}</p></a>  
          </div>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
          {(currentUser?.email === tagDetail?.userEmail)
            ?
            (
              <div className='button-container'>
                <Button variant="contained" color='success' onClick={updateTag}>Update</Button>
                <Button variant="contained" color='error' onClick={deleteTag}>Delete</Button>
              </div>
            )
            :
            (null)}

        </Card>
      </Grid>
    </div>
  )
}

export default Details