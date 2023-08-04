import React from 'react';
import {Box, Container, Typography, styled, useTheme} from '@mui/material';

const Data = [
  {city: 'Chicago', active: '2235'},
  {city: 'Chicago', active: '2235'},
  {city: 'Chicago', active: '2235'},
  {city: 'Chicago', active: '2235'},
  {city: 'Chicago', active: '2235'},
  {city: 'Chicago', active: '2235'},
  {city: 'Chicago', active: '2235'},
]
const Location = () => {
  const theme = useTheme();
  const renderItems = () => {
    return (
      Data.map((item, ind)=>{
        return (
          <Box mb={4} key={ind} sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Box sx={{display: 'flex'}}>
              <Info sx={{width: '30px', color: 'rgba(67, 100, 132, 1)'}}>{ind+1}</Info>
              <Info>{item.city}</Info>
            </Box>            
            <Info>{item.active}</Info>             
          </Box>
      )})
    )
  }
  return (
    <Box sx={[theme.position.centerCol, {p:3, width: '100%'}]}>
      <Container sx={{width: '85%'}}>
        <Typography sx={[theme.typography.title, {mb: 3, textAlign: 'center'}]}>Player Location</Typography>
        <ListStyled>
            {renderItems()}
        </ListStyled>
      </Container>       
    </Box>
  );
};

export default Location;

const ListStyled = styled('div')(({ theme, scw }) => ({
  height: '210px',
  paddingRight: '15px',
  overflowY: 'scroll',
  scrollbarWidth: 'thin',
  '&::-webkit-scrollbar': {
    width: `${scw ? scw : 6}px`,
    height: `0px`
  },
  '&::-webkit-scrollbar-track': {
    background: "none"
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.scroll.thumb,
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: 'darkgray'
  }
}))

const Info = styled(Typography)(({ theme, scw }) => (
  theme.typography.regular2
))