import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/styles';
import Blog from "../assets/blok.png";
import Google from "../assets/google.png"
import {useState} from "react";
import { login, loginWithGoogle } from '../helpers/firebase';
import { useNavigate } from 'react-router-dom';


const MyButton = styled(Button)({

  boxShadow: '0 3px 5px 2px #b9b7b74c',
  
});



const Login = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate()

  const onClick = () =>{
    login(email, password, navigate)
  }

  const onClickGoogle = () =>{
    loginWithGoogle( navigate)
  }
  return (
    <div className='login-wrapper'>
      <div className='login-container'>
        <div className='blog-img-container'>
          <img src={Blog} alt="" />
        </div>
        <p>──── LOGIN ────</p>
        <div>

          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '50ch' },
            }}
            noValidate
            autoComplete="off"
          >

            <TextField
              id="filled-search"
              label="Email"
              type="email"
              name="email"
              value={email ?? ""}
              variant="filled"
              required
              onChange={(e)=>(setEmail(e.target.value))}
            />

            <TextField
              id="filled-password-input"
              label="Password"
              name='password'
              value={password ?? ""}
              type="password"
              autoComplete="current-password"
              variant="filled"
              required
              onChange={e=>(setPassword(e.target.value))}
            />
            <div style={{padding:"6px"}}>
            <MyButton variant="contained" fullWidth sx={{ my: 2, p: 1.5, color: "white"}} onClick={onClick}>LOGIN</MyButton>
            </div>
            </Box>
        </div>
        <MyButton onClick={onClickGoogle} variant="contained" color='secondary' fullWidth sx={{ p: 1.5, color: "#9ED1D9" }}>With {<img src={Google} alt="" style={{width:"20%", marginLeft:"5px"}} />}</MyButton>
      </div>

    </div>

  )

}

export default Login