import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, styled, useTheme } from "@mui/material"
import SponsorsTable from './../components/SponsorsTable'
import Avatar from './../assets/img/Avatar.png'

const Card = ({ title }) => {
  const theme = useTheme();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [rightAbsolute, setRightAbsolute] = useState(150);
  const cardRef = useRef(null);

  const handleMouseEnter = () => {
    handleResize()
    setIsPopupOpen(true);
  };
  const handleMouseLeave = () => {
    setIsPopupOpen(false);
  };
  const handleResize = () => {
    if(window.innerWidth - cardRef.current?.offsetLeft > 500){
      setRightAbsolute(-350)
    }else{
      setRightAbsolute(180)
    }
  }; 
 useEffect(()=> {
      window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
 }, [])
  return (
    <CardWrapper ref={cardRef} theme={theme} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <img src={Avatar} alt='' />
      <Typography mt={4} sx={theme.typography.title}>{title}</Typography>
      <Typography mt={2} sx={theme.typography.lightBlue}>View sponsor’s matches</Typography>
      {isPopupOpen && <SponsorsTable rightAbsolute={rightAbsolute}/>}
    </CardWrapper>
  )
};

const CardWrapper = styled(Box)(({ theme }) => ([
  theme.position.centerCol, {  
  position: 'relative',
  background: theme.palette.dark.blockBackground,
  height: '271px',
  width: '250px',
  borderRadius: '16px',
  cursor: 'pointer',
}]));

export default Card;
