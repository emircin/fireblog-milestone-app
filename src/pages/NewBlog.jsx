import React, { useState } from 'react'
import Blog from "../assets/blok.png";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SendInfo } from '../helpers/firebase';


const NewBlog = () => {

  const [title, setTitle] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [content, setContent] = useState("")
  const navigate = useNavigate()
  const {currentUser} = useSelector(state=>(state.auth))

  
  const onSubmit = (e) => {

    e.preventDefault()

    const initialTag = {

      title: title,
      userEmail: currentUser.email,
      imageUrl: imageUrl,
      contentText: content,
      date: new Intl.DateTimeFormat("en" , {dateStyle: "medium"}).format(Date.now()),
      
    }
    SendInfo(initialTag)
    navigate("/")
  }

  return (
    <div className='new-tag-container' >
      <div className='blog-img-container'>
        <img src={Blog} alt="" />
      </div>
      <div><p>---- New Blog ----</p></div>
      <form action="" className='new-tag-form' onSubmit={onSubmit}>
        <div>
          <TextField
            id="title"
            label="Title"
            type="text"
            autoComplete="current-password"
            fullWidth
            required
            onChange={e => setTitle((e.target.value))}
          />
        </div>
        <div>
          <TextField
            id="image-url"
            label="Image URL"
            type="text"
            autoComplete="current-password"
            fullWidth
            required
            onChange={e => setImageUrl((e.target.value))}
          />
        </div>
        <div>
          <TextField
            id="content-text"
            label="Content"
            multiline
            rows={10}
            fullWidth
            required
            onChange={e => setContent((e.target.value))}
          />
        </div>
        <div>
          <Button variant="contained" type='submit' fullWidth>Submit</Button>
        </div>
      </form>
    </div>
  );
}

export default NewBlog