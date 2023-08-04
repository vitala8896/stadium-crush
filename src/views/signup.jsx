import React from 'react';
import { Box, Button, Container, Divider, Grid, TextField, Typography } from '@mui/material';
import Amplify, { Auth } from 'aws-amplify';
import awsmobile from '../aws-exports';
import { queryAPI } from '../actions/axios_instance';
import { useLocation } from 'react-router-dom';

export const AWS = require('aws-sdk'); // Load the AWS SDK for Node.js

const getCompleteUrl = ({ username, name, email, customerIdentifier }) =>
  `https://2iyljeg486.execute-api.us-east-1.amazonaws.com/public/create?username=${username}&name=${name}&email=${email}&customerIdentifier=${customerIdentifier}`;

const resolveCustomerEndpoint = 'https://2iyljeg486.execute-api.us-east-1.amazonaws.com/public/resolve';

// Initialize the Amazon Cognito credentials provider
AWS.config.region = awsmobile.aws_project_region;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: awsmobile.aws_cognito_identity_pool_id
});

Amplify.configure({
  ...awsmobile,
  Auth: {
    region: awsmobile.aws_project_region,
    userPoolId: awsmobile.aws_user_pools_id,
    userPoolWebClientId: awsmobile.aws_user_pools_web_client_id
  }
});

export function isEmpty(str) {
  return !str || 0 === str.length;
}
export const isError = (value) =>
  value === undefined || value === null || value === '' ? false : true;

export const useUrlParameter = (paramName) => {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === paramName) {
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
    }
  }
  return undefined;
};

const validate = (values) => {
  var errors = {};
  [
    'name',
    'email',
    //'ProductCode',
    'CustomerIdentifier',
    'CustomerAWSAccountId',
    'password',
    'confirmPassword'
  ].forEach((k) => {
    if (isEmpty(values[k])) {
      errors[k] = 'Required';
    }
  });

  /*if (values['ProductCode'] !== process.env.REACT_APP_PRODUCT_CODE) {
    errors['ProductCode'] =
      'Invlaid Product Code.  Must match environment variable REACT_APP_PRODUCT_CODE';
  }*/

  if (values['password'] !== values['confirmPassword']) {
    errors['password'] = 'Password does not match!';
    errors['confirmPassword'] = 'Password does not match!';
  }
  
  return errors;
};

const defaultValues = {
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  errors: {}
};

const SignUp = () => {
  const [state, setState] = React.useState({
    ...defaultValues,
    ProductCode: '',
    CustomerIdentifier: '',
    CustomerAWSAccountId: '',
    loading: false,
    submitting: false
  });

  const {
    name,
    email,
    phone,
    password,
    confirmPassword,
    ProductCode,
    CustomerIdentifier,
    CustomerAWSAccountId,
    loading,
    submitting,
    errors
  } = state;

  const RegistrationToken = useUrlParameter('x-amzn-marketplace-token');  
  const queryParamCustomerId = useUrlParameter('CustomerIdentifier');
  const queryParamCustomerAWS = useUrlParameter('CustomerAWSAccountId');
  const queryParamProductCode = useUrlParameter('ProductCode');

  const location = useLocation();

  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const params = {};

    for (const [key, value] of searchParams) {
      params[key] = value;
    }

    if (isEmpty(RegistrationToken) && params.has('x-amzn-marketplace-token')) RegistrationToken=params['x-amzn-marketplace-token'];
    if (isEmpty(RegistrationToken) && params.has('registrationToken')) RegistrationToken=params['registrationToken'];
    if (isEmpty(queryParamCustomerId) && params.has('CustomerIdentifier')) queryParamCustomerId=params['CustomerIdentifier'];
    if (isEmpty(queryParamCustomerAWS) && params.has('CustomerAWSAccountId')) queryParamCustomerAWS=params['CustomerAWSAccountId'];
    if (isEmpty(queryParamProductCode) && params.has('ProductCode')) queryParamProductCode=params['ProductCode'];

    // declare the data fetching function
    if (isEmpty(RegistrationToken)) {
      console.log('No token; getting already resolved customer data from query params: customerId=',{queryParamCustomerId});
      setState((p) => ({
          ...p,
          CustomerIdentifier: queryParamCustomerId,
          CustomerAWSAccountId: queryParamCustomerAWS,
          ProductCode: queryParamProductCode,
          loading: false,
          error: undefined
      }));
    } else {
      console.log('Token detected, resolving customer information...', { RegistrationToken });
      setState((p) => ({ ...p, loading: true }));
      try {
        // Load customer info from lambda
        queryAPI
          .get(`${resolveCustomerEndpoint}?token=${encodeURIComponent(RegistrationToken)}`)
          .then((response) => {
            if (response.status === 200) {
              console.log('Successfully resolved customer', { response });
              setState((p) => ({
                ...p,
                CustomerIdentifier: response?.data?.customerIdentifier,
                CustomerAWSAccountId: response?.data?.customerAWSAccountId,
                ProductCode: response?.data?.productCode,
                loading: false,
                error: undefined
              }));
            } else {
              console.error('Error resolving customer', { response });
              alert('Error resolving customer.');
              setState((p) => ({ ...p, queries: [], loading: false, error: response }));
            }
          })
          .catch((error) => {
            console.error('Error resolving customer', { error });
            alert('Error resolving customer.');
            setState((p) => ({ ...p, queries: [], loading: false, error }));
          });
      } catch (error) {
        console.error('Error resolving customer', { error });
        alert('Error resolving customer.');
        setState((p) => ({ ...p, errors: {}, submitting: false, error }));
      }
    }
  }, [RegistrationToken,queryParamCustomerId,queryParamCustomerAWS,queryParamProductCode]);

  const handleSubmit = async () => {
    const errors = validate(state);
    if (Object.keys(errors).length > 0) {
      setState((p) => ({ ...p, errors }));
    } else {
      setState((p) => ({ ...p, errors: {}, submitting: true }));

      try {
        //var response = await Auth.signUp({ username: email, password: getRandomString(30) });
        var response = await Auth.signUp({
          username: email,
          password,
          attributes: {
            'custom:name': name,
            'custom:phone': phone,
            'custom:email': email,
            'custom:ProductCode': ProductCode,
            'custom:CustomerIdentifier': CustomerIdentifier,
            'custom:CustomerAWSAccountId': CustomerAWSAccountId
          }
        });
        console.log({ response });

        if (!isEmpty(response.user)) {
          // Complete customer signup
          console.log('Completing customer signup...', {
            user: response.user,
            email,
            name,
            CustomerIdentifier
          });

          queryAPI
            .post(
              getCompleteUrl({
                username: email,
                name,
                email,
                customerIdentifier: CustomerIdentifier
              })
            )
            .then((response) => {
              if (response.statusCode === 200 || response.status === 200) {
                console.log('Successfully completed customer signup', { response });
              } else {
                console.error('Error completing customer signup', { response });
              }
            })
            .catch((error) => {
              console.error('Exception completing customer signup', { error });
            });

          alert(
            'Successfully created user.  Please expect an email with further instructions and a link to your dashboard.'
          );
          setState((p) => ({ ...p, errors: {}, submitting: false, ...defaultValues }));
          handleReset();
        }
      } catch (err) {
        console.error(err);
        alert('Error creating user.  Please ensure your password meets the minimum requirements.');
        setState((p) => ({ ...p, errors: {}, submitting: false, error: 'Error creating user!' }));
      }
    }
  };

  const handleReset = () => {
    setState((p) => ({ ...p, ...defaultValues }));
  };

  const handleChange = (id) => (e) => {
    const value = e?.target?.value;
    setState((p) => ({ ...p, [id]: value, errors: {} }));
  };

  const disabled = loading || submitting;

  return (
    <Container item maxWidth="md">
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h5">Sign Up</Typography>
        <Divider />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="caption">Registration Info</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            error={isError(errors['RegistrationToken'])}
            helperText={errors['RegistrationToken']}
            sx={{ width: '100%' }}
            fullwidth
            value={RegistrationToken}
            InputLabelProps={{ shrink: true }}
            label="Registration Token"
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            error={isError(errors['ProductCode'])}
            helperText={errors['ProductCode']}
            sx={{ width: '100%' }}
            value={ProductCode}
            label="Product Code"
            InputLabelProps={{ shrink: true }}
            fullwidth
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            error={isError(errors['CustomerIdentifier'])}
            helperText={errors['CustomerIdentifier']}
            sx={{ width: '100%' }}
            value={CustomerIdentifier}
            label="Customer Identifier"
            fullwidth
            InputLabelProps={{ shrink: true }}
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            error={isError(errors['CustomerAWSAccountId'])}
            helperText={errors['CustomerAWSAccountId']}
            sx={{ width: '100%' }}
            value={CustomerAWSAccountId}
            label="Customer AWS AccountId"
            fullwidth
            InputLabelProps={{ shrink: true }}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="caption">
            Please complete the following information and click the sign up button.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={isError(errors['email'])}
            helperText={errors['email']}
            onChange={handleChange('email')}
            sx={{ width: '100%' }}
            value={email}
            label="Email"
            fullwidth
            InputLabelProps={{ shrink: true }}
            required
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={isError(errors['name'])}
            helperText={errors['name']}
            onChange={handleChange('name')}
            sx={{ width: '100%' }}
            value={name}
            label="Name"
            fullwidth
            InputLabelProps={{ shrink: true }}
            required
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={isError(errors['phone'])}
            helperText={errors['phone']}
            onChange={handleChange('phone')}
            sx={{ width: '100%' }}
            value={phone}
            label="Phone (Optional)"
            fullwidth
            InputLabelProps={{ shrink: true }}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={isError(errors['password'])}
            helperText={errors['password']}
            onChange={handleChange('password')}
            sx={{ width: '100%' }}
            value={password}
            label="Password"
            fullwidth
            InputLabelProps={{ shrink: true }}
            InputProps={{ type: 'password' }}
            disabled={disabled}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={isError(errors['confirmPassword'])}
            helperText={errors['confirmPassword']}
            onChange={handleChange('confirmPassword')}
            sx={{ width: '100%' }}
            value={confirmPassword}
            label="Confirm Password"
            fullwidth
            InputLabelProps={{ shrink: true }}
            InputProps={{ type: 'password' }}
            disabled={disabled}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ textAlign: 'right' }}>
            <Button
              disabled={disabled}
              onClick={handleReset}
              variant="contained"
              size="large"
              color="warning">
              Reset
            </Button>
            <Button
              sx={{ ml: 2 }}
              disabled={disabled}
              onClick={handleSubmit}
              variant="contained"
              size="large">
              Sign Up
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignUp;
