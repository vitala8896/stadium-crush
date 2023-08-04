import React , {useState} from 'react';
import { Box, Button,  // FormControl, Alert,
  Input , Typography, useTheme, styled
} from '@mui/material';
import { Checkbox } from "@nextui-org/react";
// import data from './data'

const LoginForm = () => {
  const theme = useTheme();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState('');

  // const config = {
  //   headers: {
  //     'Access-Control-Allow-Origin': '*',
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json'
  //   }
  // };

  // const handleChange = (event) => {
  //   setError(null);
  //   setValues({ ...values, [event.target.name]: event.target.value });
  // };

  // const loginHandler = async () => {
  //   try{
  //     var response = await Auth.signIn(values.username, values.password);
  //     console.log("Used Auth. Should return user.");
  //     console.log({ response });
  //   } catch(error) {
  //     console.log("Error using Auth.", error);
  //   }

  //   const user = new CognitoUser({
  //     Username: values.username,
  //     Pool: userPool
  //   });

  //   const authDetail = new AuthenticationDetails({
  //     Username: values.username,
  //     Password: values.password
  //   });

  //   user.authenticateUser(authDetail, {
  //     onSuccess: (data) => {
  //       console.log('data ', data)
  //       localStorage.setItem('token', data.getAccessToken().getJwtToken());
  //       localStorage.setItem('userMail', values.username);
  //       console.log("RECEIVED FROM THE COG: "+data)
  //       window.location.reload();
  //     },
  //     onFailure: (error) => {
  //       console.log("error", error)
  //       setError(error.message);
  //       localStorage.clear();
  //     }
  //   });
  // };

  const submit = (e) => {
    e.preventDefault();

    // axios.post('http://dev.stadiumcrush.com/api/v1/playerLogin', {name, password})
    // .then(function (response) {
    //   console.log(response.data);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
    
    fetch('http://dev.stadiumcrush.com/api/v1/playerLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({phone_number:phone, password})
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Помилка', error);
    });       
  }

  const handlePhone = (e) => {
    setPhone(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  return (
    <Box sx={[theme.position.center, {width: '100%', flexDirection: 'column'}]}>
      {/* {error && (
        <Alert sx={{ marginBottom: '15px' }} severity="error">
          {error}
        </Alert>
      )} */}

    <form onSubmit={submit}>
        <InputStyle
          name='name'
          id="outlined-basic"
          placeholder="Phone Number" 
          onChange={handlePhone}
        />
        <InputStyle
        name="password"
          id="outlined-basic"
          placeholder="Password"
            onChange={handlePassword}
        />
   
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', 
              alignItems: 'center', marginBottom: '15px' }}>
        <Checkbox size="sm" color="primary" labelColor="primary" defaultSelected>
          Remember Me
        </Checkbox> 
        <Typography sx={{color: theme.typography.bold.color, fontSize: '13px'}} >
          Forgot password?
        </Typography>
      </Box>
      
      <Button type='submit' variant="outlined" sx={ theme.button }>Log in</Button> 
      </form>
      <Box sx={[theme.typography.light, theme.position.center, {flexDirection: 'column', mt: 2 }]}>
        <Typography sx={theme.typography.light}>
          By logging in you agree with the
        </Typography>
        <Typography sx={[theme.typography.light, {mt: .5}]}>
          Subscription&nbsp;Agreement&nbsp;and&nbsp;Privacy&nbsp;Statement
        </Typography>
      </Box>      
    </Box>
  );
};

export default LoginForm;

const InputStyle = styled(Input)(({theme})=>({
  background: 'transparent', 
  width: '359px',
  height: '56px', padding: '0 15px', 
  border: `1px solid ${theme.palette.blue.background}`, 
  borderRadius: '8px', 
  color: theme.palette.blue.background,
  marginBottom: '28px',
}))