import React from 'react';
import {Box, Container, Typography, styled, useTheme} from '@mui/material';
import EllipseBlue from './../assets/img/Icons/EllipseBlue.svg'
import EllipseRed from './../assets/img/Icons/EllipseRed.svg'
import EllipseYellow from './../assets/img/Icons/EllipseYellow.svg'


const TypesOfAwards = ({Reviewed, Choose, Won}) => {
  const theme = useTheme();
  return (
    <Box sx={[theme.position.centerCol, { width: '100%', height: '300px', position: 'relative' }]}>
      <Container sx={[theme.position.centerCol, {width: '90%', height: '300px'}]}>
        <Typography sx={[theme.typography.title, {mb: 3, textAlign: 'center'}]}
        >Types of awards</Typography>
        <Box sx={{width: '55%', position: 'relative', height: '180px'}}>
          <Circle w={Reviewed} h={Reviewed} bg='rgba(101, 41, 231, 1)' sx={{bottom: 0}}>
            6823</Circle>
          <Circle w={Choose} h={Choose} bg='rgba(229, 88, 88, 1)' sx={{right: 0}}>
            1921</Circle>
          <Circle w={Won} h={Won} bg='rgba(211, 236, 109, 1)' 
            sx={{right: '10px', bottom: '20px'}}>
            1452</Circle>
        </Box>         
        <Box sx={theme.position.center} mt={2}>
          <Dot src={EllipseBlue} alt="Elipse" />
          <Box sx={{padding: '5px 10px'}}>
            <Title>6723</Title>
            <SubTitle>Reviewed</SubTitle>
          </Box>   
          <Hr/>       
          <Dot src={EllipseRed} alt="Elipse" />
          <Box sx={{padding: '5px 10px'}}>
            <Title>1921</Title>
            <SubTitle>Reviewed</SubTitle>
          </Box>  
          <Hr/>   
          <Dot src={EllipseYellow} alt="Elipse" />
          <Box sx={{padding: '5px 10px'}}>
            <Title>1452</Title>
            <SubTitle>Reviewed</SubTitle>
          </Box>  
        </Box>
      </Container>          
    </Box>
  );
};

export default TypesOfAwards;

const Dot = styled('img')(() => ({
  marginRight: '8px',
  width: '8px',
  height: '8px'
}));
const Circle = styled('div')(({w, h, bg}) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',  
  borderRadius: '50%',
  width: `${w}px`,
  height: `${h}px`,
  color: 'white',
  background: bg
}));
const Title = styled(Typography)(({theme}) => (
  theme.typography.title2
));
const SubTitle = styled(Typography)(({theme}) => (
  theme.typography.regular
));
const Hr = styled('hr')(() => ({
  height: '80%',
  margin: '0 10px',
  border: '1px solid rgba(34, 48, 62, 1)'
}));