import React from 'react';
import { Box, AppBar, Container, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';



const Header = ({ children, drawerOpen, title, column }) => {
  const theme = useTheme();
  return (
    <AppBar
      position="fixed"
      open={drawerOpen}
      color="transparent"
      sx={{ minHeight: '82px', width: `calc(100% - 290px)`, backdropFilter: 'saturate(180%) blur(10px)' }}
    >
      <Container maxWidth="false" sx={{ height: '100%', width: '100%', display: 'flex', 
                        flexDirection: column ? 'column': 'row',
                        justifyContent: 'space-between', alignItems: 'start', 
                        gap: '8px', padding: '20px 0'}}>
        <Typography sx={ theme.typography.shentoxMD }>{title}</Typography>
        <Box>{children}</Box>
      </Container>
    </AppBar>
  );
};

export default Header;

Header.defaultProps = {
  open: true,
  handleDrawerOpen: () => {}
};

Header.propTypes = {
  open: PropTypes.bool,
  handleDrawerOpen: PropTypes.func
};
