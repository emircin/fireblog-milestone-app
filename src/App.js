import React from "react";
import "./App.css";
import AppRouter from "./app-router/AppRouter";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import blue from '@mui/material/colors/blue';
import { useDispatch} from "react-redux";
import { useEffect } from "react";
import { setCurrentUser, clearCurrentUser } from "./redux/actions/authAction";
import { auth } from "./helpers/firebase";
import { ToastContainer } from "react-toastify";



const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
   
    const userInfo = auth.onAuthStateChanged((currentUser) => {
      
      if (currentUser) {
       
        dispatch(setCurrentUser(currentUser))
        console.log("burada user var");
      } else {
       
        dispatch(clearCurrentUser())
        console.log("burada user yok");
      }
      return (userInfo)
    })

  }, [dispatch])
  

  const theme = createTheme({
    palette: {
      primary: {
          main:blue[200],
      },
      secondary: {
        main: blue[50],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter>
      </AppRouter>
      <ToastContainer/>
    </ThemeProvider>
  );
};

export default App;
