import { CognitoUserPool } from 'amazon-cognito-identity-js';
import {Amplify}
// , { Auth } 
from 'aws-amplify';
import awsmobile from '../aws-exports';
export const AWS = require('aws-sdk'); // Load the AWS SDK for Node.js

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

const poolData = {
  UserPoolId: awsmobile.aws_user_pools_id,
  ClientId: awsmobile.aws_user_pools_web_client_id
};

if (poolData.UserPoolId===undefined) {
   console.log("Getting pool ID from env vars.");
   poolData.UserPoolId=process.env.REACT_APP_USER_POOL_ID;
}
if (poolData.ClientId===undefined) {
   console.log("Getting client ID from env vars.");
   poolData.UserPoolId=process.env.REACT_APP_CLIENT_ID;
}

if (poolData.UserPoolId===undefined) {
   console.log("Cannot get pool ID from awsmobile and env vars.");
   poolData.UserPoolId="us-east-1_omc9XYOuS";
}
if (poolData.ClientId===undefined) {
   console.log("Cannot get client ID from awsmobile and env vars.");
   poolData.ClientId="7ue56miqnai0t6lkvvr4hp1nsr";
}
export default new CognitoUserPool(poolData);