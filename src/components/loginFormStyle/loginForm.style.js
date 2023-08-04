import { makeStyles } from '@mui/styles';

export const loginFormStyle = makeStyles({
  heading: {
    fontStyle: 'normal !important',
    fontWeight: '500 !important',
    fontSize: '48px !important',
    lineHeight: '56px !important',
    /* or 117% */

    letterSpacing: '-0.02em !important',

    /* Neutral / Gray 50 */
    paddingTop: '15px',

    color: '#F8FAFC !important',
    marginBottom: '2rem !important'
  },
  textfield: {
    '& > *': {
      color: 'white !important',

      border: '1px solid #F1F5F9 !important',
      boxSizing: 'border-box',
      borderRadius: '5px !important',
      outline: '0px !important'
    },
    '& > *::before': {
      border: 'none !important'
    },
    '& > *::after': {
      border: 'none !important'
    }
  },
  icon: {
    fill: '#F1F5F9 !important'
  },
  loginBtn: {
    padding: '1rem !important',
    textTransform: 'none !important',
    fontWeight: '600 !important',
    fontSize: '16px !important',
    lineHeight: '20px !important',
    textAlign: 'center !important',
    letterSpacing: '-0.02em !important',
    color: 'white !important',
    backgroundColor: ' #0075AE !important',
    border: '1px solid #0075AE !important',
    borderRadius: '5px !important'
  },
  btn1: {
    padding: '1rem !important',
    textTransform: 'none !important',
    fontWeight: '600 !important',
    fontSize: '16px !important',
    lineHeight: '20px !important',
    /* identical to box height, or 125% */

    textAlign: 'center !important',
    letterSpacing: '-0.02em !important',

    /* Neutral / Gray 400 */

    color: ' #F1F5F9 !important',
    border: '1px solid #F1F5F9 !important',
    borderRadius: '5px !important'
  },
  btn2: {
    padding: '1rem !important',
    textTransform: 'none !important',
    fontWeight: '600 !important',
    fontSize: '16px !important',
    lineHeight: '20px !important',
    /* identical to box height, or 125% */

    textAlign: 'center !important',
    letterSpacing: '-0.02em !important',

    /* Neutral / Gray 500 */

    color: '#0075AE !important',
    background: '#F1F5F9 !important',
    borderRadius: '5px !important'
  },
  subtitle: {
    color: '#F1F5F9 !important',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '18px',
    lineHeight: '26px',
    /* identical to box height, or 144% */
    marginTop: '1.5rem !important',
    textAlign: 'center',
    marginBottom: '1rem !important'
  },
  aws: {
    backgroundColor: 'transparent'
  }
});
