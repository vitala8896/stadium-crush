import {Grid, Typography, Box, useTheme} from '@mui/material';
import Users from './../assets/img/Icons/Users.svg'
import Cup from './../assets/img/Icons/Cup.svg'

const QuickFacts = () => {
  const theme = useTheme();
  return (
    <Box item md={8} sx={{ display: 'flex', alignItems: 'center', height: '189px', 
                background: theme.palette.dark.blockBackground, 
                borderRadius: '16px', marginBottom: '16px' }}>
      <Grid item md={5.5} sx={theme.position.centerCol}>
        <img src={Users} alt="Users"/>
        <Typography mt={2} sx={theme.typography.title}>22 456</Typography>
        <Typography sx={theme.typography.regular}>Live players</Typography>
      </Grid>
      <hr style={{height: '129px', borderColor: 'rgba(34, 48, 62, 1)'}} />
      <Grid md={5.5} sx={theme.position.centerCol}>
        <img src={Cup} alt="Cup"/>
        <Typography mt={2} sx={theme.typography.title}>1452</Typography>
        <Typography sx={theme.typography.regular}>Wins</Typography>
      </Grid>
    </Box>
  )
}
export default QuickFacts;