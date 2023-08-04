import { useState  } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, Box, styled, useTheme } from '@mui/material';
import Header from '../layout/header';
import ArrowLeft from './../assets/img/Icons/arrowLeft.svg'
import Awards from './../components/Awards'
import Card from '../components/Card'
import AvailableAwards from './../components/AvailableAwards'

const data = [
  {icon: '', title: 'McDonalds'}, 
  {icon: '', title: 'McDonalds'}, 
  {icon: '', title: 'McDonalds'}, 
  {icon: '', title: 'McDonalds'}, 
  {icon: '', title: 'McDonalds'}, 

  {icon: '', title: 'Starbucks'},
  {icon: '', title: 'Starbucks'},
  {icon: '', title: 'Starbucks'},
  {icon: '', title: 'Starbucks'},
  {icon: '', title: 'Starbucks'},  
]

const Sponsor = () => {
  const theme = useTheme();  
  const [isAdmin, setBlockVisible] = useState(true); 
  const toggleBlock = (res) => {
    setBlockVisible(res);
  };
    
  return (
      <Grid container spacing={2} sx={{ minHeight: '100vh', marginTop: '120px', gap: '16px' }}>  
        <Header title='Sponsor’s Awards'>
            <Box sx={{display: 'flex'}}>
              <Button onClick={()=>toggleBlock(false)}>admin</Button>
              <Button onClick={()=>toggleBlock(true)}>sponsor</Button>
              <Link to="/" style={{textDecoration: 'none'}}>
                <Button sx={theme.button.back}>
                  <img src={ArrowLeft} alt="" style={{textTransform: 'none'}}/>
                  Back to matches
                </Button>
              </Link> 
            </Box>
        </Header>        
        <Box md={12} sx={{width: '100%', height: 'auto', display: 'flex',
          justifyContent: 'space-between', alignContent: 'start',
          flexWrap: 'wrap',
          gap: '20px',
        }}> 
          {isAdmin ?           
            <GridStyle item sm={4} md={7.5} sx={{minWidth: '550px'}}>
              <Awards/>
            </GridStyle> :
            data.map((item, ind) => {              
              return (
                <Card key={ind} title={item.title}/>
            )})                        
          }
          {isAdmin ? 
            <Grid item sm={4} md={4} sx={{minWidth: '450px'}}>
              <GridStyle mb={2}>
                <AvailableAwards/>
              </GridStyle>
            </Grid> : null           
          }          
        </Box>
      </Grid>
  );
};

export default Sponsor

const GridStyle = styled(Grid)(({theme})=>([
  theme.position.center,
  { background: theme.palette.dark.blockBackground, 
    borderRadius: '16px', 
    height: '394px',
    gridAutoFlow: 'column'
}]))