import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux'
import { EditUser } from '../helpers/firebase'
import { useNavigate } from 'react-router-dom';

const UpdateBlog = () => {
  const { initialTag } = useSelector(state=>(state.tag))
  const [title, setTitle] = useState(initialTag.title)
  const [imageUrl, setImageUrl] = useState(initialTag.imageUrl)
  const [content, setContent] = useState(initialTag.contentText)
  const navigate = useNavigate()
  const { currentUser } = useSelector(state=>(state.auth))

  const handleSubmit = (e) => {
    
    e.preventDefault()

    const initialTags = {

      title: title,
      userEmail: currentUser.email,
      imageUrl: imageUrl,
      contentText: content,
      date: new Intl.DateTimeFormat("en" , {dateStyle: "medium"}).format(Date.now()),
      id:initialTag.id
      
    }
    EditUser(initialTags)
    navigate("/")
  }
  return (
    <div>
      <div className='new-tag-container' >
      <div className='update-tag-img-container'>
        <img src={initialTag.imageUrl} alt="" style={{width:"200px"}} />
      </div>
      <div><p>---- New Blog ----</p></div>
      <form action="" className='new-tag-form' onSubmit={handleSubmit}>
        <div>
          <TextField
            id="title"
            label="Title"
            type="text"
            value={title}
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
            value={imageUrl}
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
            value={content}
            required
            onChange={e => setContent((e.target.value))}
          />
        </div>
        <div>
          <Button variant="contained" type='submit' fullWidth>Update</Button>
        </div>
      </form>
    </div>
    </div>
  
  )
}

export default UpdateBlog