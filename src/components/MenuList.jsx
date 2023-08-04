import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  List, ListItemButton, ListItemIcon, ListItemText, Collapse, Popover,
  Box, Button, Typography, FormLabel, FormControlLabel,
  RadioGroup, Radio, useTheme, styled
} from '@mui/material';
import { nanoid } from 'nanoid';
import ListWithScroll from './scroll/Scroll';
import { clickedItem, getDocuments, getFacetSummary } from '../redux/facet';
// import { ReactComponent as ArrowUp } from '../assets/img/Icons/arrowUpIcon.svg';
// import { ReactComponent as ArrowDown } from '../assets/img/Icons/arrowDownicon.svg';

import { appNavigation } from '../navigation';


const NestedList = ({drawerOpen, handleDrawerOpen, handleToggle}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [clickItem, setClickItem] = useState(null);

  const FacetList = useSelector((state) => state.facet);

  const dispatch = useDispatch();

  const openPop = Boolean(anchorEl);
  const id = openPop ? 'simple-popover' : undefined;

  useEffect(() => {
    dispatch(getDocuments({ queryItems: [] }));
    dispatch(getFacetSummary({ queryItems: [] }));
  }, [dispatch]);

  const handleClickPop = (event) => {
    setAnchorEl(event.currentTarget);
    console.log('event.currentTarget',event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (value) => {
    if (open === value) {
      setOpen(false);
    } else {
      setOpen(value);
    }
  };

  const onChangeHandler = (e) => {
    const data = { ...clickItem };
    delete data.count;

    const obj = {
      prefix: e.target.value,
      filter: data
    };

    dispatch(clickedItem(obj));

    if (Object.keys[FacetList.dateQuery] > 0) {
      dispatch(getDocuments({ queryItems: [...FacetList.clickedItems, FacetList.dateQuery] }));
      dispatch(getFacetSummary({ queryItems: [...FacetList.clickedItems, FacetList.dateQuery] }));
    } else {
      dispatch(getDocuments({ queryItems: [...FacetList.clickedItems] }));
      dispatch(getFacetSummary({ queryItems: [...FacetList.clickedItems] }));
    }

    handleClose();
  };
  const renderChild = (item) => {  
    let child = null;
    const childArray = FacetList.navigationChild[item.slug]?.counts;

    child =
      childArray &&
      childArray.map(
        (childItem, ind) =>
          childItem.value !== '' && (            
            <ListItemButton
              key={ind}
              sx={{ pl: 4 }}
              onClick={(e) => {
                handleClickPop(e);
                setClickItem(childItem);
              }}>
              <ListItemText primary={childItem.value} />
            </ListItemButton>
          )
      );
    return child;
  };
  return (
     <ListMiStyled
      component="nav"
      sx={[theme.position.centerCol, { maxHeight: 'calc(100vh - 57px)', 
        paddingBottom: '20px', margin: drawerOpen ? '0' : '20px 0 0 10px'
      }]}>
      <Link to="/">
        <Button sx={{     
          display: drawerOpen? 'none':'flex',
          justifyContent: 'center',
          textAlign: 'center',
          '&:hover': {
              background: theme.palette.blue.active
          }
        }}>
          {/* <img src={arrowRight} alt=""
            onClick={handleToggle} style={{ cursor: 'pointer',
          }}/> */}
        </Button>
      </Link>        
      {FacetList &&
        appNavigation.map((item, ind) => {          
          return Object.keys(FacetList.navigationChild).length === 0 ? (
            <Link key={ind} to={item.path} style={{textDecoration: 'none'}}>
                <ListItemButtonStyle key={nanoid()}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButtonStyle>
            </Link>            
          ) : (
            <>
              {!(item.slug in FacetList.navigationChild) && (
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              )}
              {item.slug in FacetList.navigationChild && (
                <>
                <Link to={item.path} style={{textDecoration: 'none'}}>
                  <ListItemButtonStyle
                    key={nanoid()}
                    onClick={
                      drawerOpen ?  
                      () => {handleClick(item.id)} : handleToggle                     
                    }
                    aria-describedby={id}
                    sx={{ 
                      background: item.id === open ? theme.palette.blue.active : "transparent",             
                    }}>
                    {item.id === open ?  
                      <ListItemIcon>{item.iconActive}</ListItemIcon>:
                      <ListItemIcon>{item.icon}</ListItemIcon>                     
                     }
                    <Typography sx={{
                      fontWeight: 500,
                      width: '100%',
                      color: item.id === open ? "white": "gray" 
                      }}>
                        {item.title}
                    </Typography>
                    {/* {item.id === open ? <ArrowUp /> : <ArrowDown />} */}
                  </ListItemButtonStyle>
                </Link>

                  <Collapse in={drawerOpen === false? false : item.id === open} timeout="auto" unmountOnExit>                 
                      <ListWithScroll scw={6} style={{ maxHeight: '250px', background: "gray" }}>  
                        <List disablePadding>{renderChild(item)}</List>
                      </ListWithScroll>
                  </Collapse>

                  <Popover
                    id={id}
                    open={openPop}
                    anchorEl={anchorEl}
                    onClose={() => handleClose()}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}>
                    <Box sx={{ padding: '20px', position: 'relative'}}>
                      <FormLabel component="legend">Priority</FormLabel>
                      <RadioGroup
                        onChange={(e) => onChangeHandler(e)}
                        aria-label="priority"
                        name="radio-buttons-group">
                        <FormControlLabel value="must" control={<Radio />} label="Must" />
                        <FormControlLabel value="may" control={<Radio />} label="May" />
                        <FormControlLabel value="not" control={<Radio />} label="Not" />
                      </RadioGroup>
                    </Box>
                  </Popover>
                </>
              )}
            </>
          );
        })}
    </ListMiStyled> 
    
  );
};

export default NestedList;

const ListMiStyled = styled(List)(({theme}) => ({
  overflowY: 'scroll',
  overflowX: 'hidden',
  scrollbarWidth: 'thin',
  scrollbarColor: 'gray lightgray',  
  '&::-webkit-scrollbar': {
    width: '0px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'lightgray',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'gray',
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: 'darkgray'
  }
}))

const ListItemButtonStyle = styled(ListItemButton)(({theme}) => ({
  width: '216px', 
  marginBottom: '16px',
  height: '56px',
  borderRadius: '8px',
  '&:hover': {
    background: theme.palette.blue.active,
    '& p': {
      color: "white"
    }                        
  }
}))