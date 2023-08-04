import React, {useState} from 'react';
import { Box, useTheme, styled } from '@mui/material';
import PropTypes from 'prop-types';
import Navbar from './navbar';

const Layout = ({children, layout, setLayout}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
 
 
  const handleDrawer = () => {
    setOpen(!open);
  };
 const handleToggle = () =>{
  setOpen(open)
 }
  return (   
      <Box sx={{ display: 'flex', justifyContent: 'space-between',
        background: theme.palette.dark.background, margin: 0, padding: 0, 
        overflow: 'hidden'}}>
        <Navbar 
          open={open} handleDrawerOpen={handleDrawer} handleToggle={handleToggle}
        />
        <ListStyled component="main" sx={{ flexGrow: 0, padding: '50px 50px 100px', width: "100%", 
        height: '84vh', background: theme.palette.dark.backgroundGradientMain}}>
          {children}
        </ListStyled>
    </Box>        
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.node
};

Layout.defaultProps = {
  children: null
};
const ListStyled = styled(Box)(({ theme }) => ({
  overflowY: 'scroll',
  scrollbarWidth: 'thin',
  scrollbarColor: 'gray lightgray',  
  '&::-webkit-scrollbar': {
    width: `8px`,
    height: `0px`
  },
  '&::-webkit-scrollbar-track': {
    background: "transparent"
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.scroll.thumb,
    borderRadius: '15px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: 'darkgray'
  }
}))