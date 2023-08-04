import { Box, Grid, Typography, useTheme } from '@mui/material';
// import LoginForm from '../components/LoginForm';
import LoginForm from '../components/LoginForm'; //Old
import LogoImg from './../assets/img/LogoFull.png'


const Login = () => {
  const theme = useTheme();
  return (
    <Box sx={[theme.position.center,
      {width: '100%', height: '100vh', background: theme.palette.dark.backgroundGradient}] } 
    >
      <Grid container sx={[theme.position.center, 
                { flexDirection: 'column', width: '360px', height: '566px'}]}>
        <img src={LogoImg} alt="" style={{marginBottom: '32px'}}/>
        <Box sx={[ theme.position.center, {flexDirection: 'column'}]}>
          <Typography sx={[theme.typography.bold, {mb: 1}]}>Welcome back!</Typography>
          <Typography sx={[theme.typography.light, {mb: 3}]}>Log in to your account</Typography>
        </Box>
        <LoginForm/>
      </Grid>
    </Box>
  );
};

export default Login;
