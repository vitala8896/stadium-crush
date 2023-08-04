import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Box, Typography, useTheme } from "@mui/material"
import { DrawerHeader, Drawer } from '../components/Drawer';
import MenuList from '../components/MenuList';
import Logo from '../assets/img/LogoFull.png';
import Account from './../assets/img/Account.png'
import Scroll from '../components/scroll/Scroll';


const Navbar = ({ open, handleDrawer, handleToggle }) => {
  const theme = useTheme();
  return (
    <Drawer variant="permanent" open={open}>
      <Scroll>
        <Box sx={{height: '100vh', display: 'flex', flexDirection: 'column', 
                  justifyContent: 'space-between', alignItems: 'space-between'}}>
                <Box>
                  <DrawerHeader>
                    <Link to="/" style={{padding: '0 0 0 10px'}}>
                      <img src={Logo} alt="Logo"/>
                    </Link>
                  </DrawerHeader>
                  <MenuList drawerOpen={open} handleDrawerOpen={handleDrawer} handleToggle={handleToggle}/>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'start', height: '104px'}}>
                  <hr style={{margin: '0 auto', width: '80%', border: '1px solid rgba(38, 75, 113, 1)'}} />
                  <Box sx={[theme.position.center, {marginTop: '32px'}]}>
                    <img src={Account} alt="" />
                    <Typography sx={[theme.typography.title2, 
                    {marginLeft: '16px', textTransform: 'none'}]}>McDonalds</Typography>
                  </Box>
                </Box>
              </Box>  
      </Scroll>
          
    </Drawer>
  );
};

export default Navbar;

Navbar.defaultProps = {
  open: true
};

Navbar.propTypes = {
  open: PropTypes.bool
};