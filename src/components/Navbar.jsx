import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import cw from "../assets/cw.jpeg"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOutUser } from '../helpers/firebase';
import { clearCurrentUser } from '../redux/actions/authAction';


export default function Navbar() {
  const navigate = useNavigate()
  const { currentUser } = useSelector(state => state.auth)

  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    
    signOutUser(navigate)
    dispatch(clearCurrentUser())

  }

  return (
    <div className='navbar-container'>
      <img src={cw} className="header-img" alt="" onClick={() => (navigate("/"))} />
      <h1 className='head-text' onClick={() => (navigate("/"))}> <span>────</span> {"<EmirCin/>"} <span>Blog ────</span></h1>
      <IconButton
        aria-label="more"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      {currentUser ?
        (
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose} onMouseDown={() => (navigate("/profile"))}>Profile</MenuItem>
            <MenuItem onClick={handleClose} onMouseDown={() => (navigate("/new-blog"))}>New</MenuItem>
            <MenuItem onClick={handleClose} onMouseDown={logOut}>Logout</MenuItem>
          </Menu>
        )
        :
        (
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose} onMouseDown={() => (navigate("/register"))}>Register</MenuItem>
            <MenuItem onClick={handleClose} onMouseDown={() => (navigate("/login"))}>Login</MenuItem>
          </Menu>
        )
      }


    </div>
  );
}