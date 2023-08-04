import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  // Popover, Button,  
  Grid, Box, useTheme 
} from '@mui/material';
// import { KeyboardArrowDown } from '@mui/icons-material';
// components
// import FilterTags from './SearchFilterTags';
// import SearchFilterList from './SearchFilterList';
import Calendar from './Calendar';
// import SearchBar from './SearchBar';
import TimeChart from './../components/chart/advanceFilterGraph';
// redux
import { timeSeriesGraph } from '../redux/facet';

const AdvanceSearch = ({upload}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState('year');
  const theme = useTheme();
  const dispatch = useDispatch();
  let facet = useSelector((state) => state.facet);
  const { clickedItems, dateQuery } = facet;

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
    setTimeout(() => {
      if (clickedItems.length > 0 && value !== '') {
        dispatch(
          timeSeriesGraph({
            body: {
              queryItems: [...clickedItems, Object.keys(dateQuery).length > 0 && dateQuery]
            },
            urlParam: {
              interval: value
            }
          })
        );
      } else if (clickedItems.length === 0 && value === '') {
        dispatch(
          timeSeriesGraph({
            body: {
              queryItems: Object.keys(dateQuery).length > 0 ? [...clickedItems, dateQuery] : []
            }
          })
        );
      } else if (clickedItems.length === 0 && value !== '') {
        dispatch(
          timeSeriesGraph({
            body: {
              queryItems: Object.keys(dateQuery).length > 0 ? [...clickedItems, dateQuery] : []
            },
            urlParam: {
              interval: value
            }
          })
        );
      } else if (clickedItems.length > 0 && value === '') {
        dispatch(
          timeSeriesGraph({
            body: {
              queryItems:
                Object.keys(dateQuery).length > 0 ? [...clickedItems, dateQuery] : [...clickedItems]
            }
          })
        );
      }
    }, 1000);
  }, [value, clickedItems, dateQuery, dispatch]);

  return (
    <Box sx={{ maxHeight: '394px', marginBottom: '18px', padding: '25px',
          background: theme.palette.dark.blockBackground, borderRadius: '16px', overflow: 'hidden'}}>
      {/* <Button
        aria-describedby={id}
        variant="contained" 
        onClick={handleClick}
        // color={theme.palette.blue.main}
        className={upload ? "advance" : ""}
        sx={{ backgroundColor: theme.palette.white.main, color: theme.palette.blue.main,
        border: `1px solid ${theme.palette.blue.main}`, boxShadow: 'none',
          '&:hover': {
            backgroundColor: theme.palette.blue.hover,
            boxShadow: 'none'
          }
      }}
        endIcon={<KeyboardArrowDown />}
        >
        Advance Search
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{
          marginTop: '20px',
          zIndex: 10,
          scrollbarWidth: 'thin',
          scrollbarColor: 'gray lightgray'
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}> */}
        <Box>
          <Grid container spacing={2}>
            <Grid item sm={12} md={6}>
              {/* <Calendar heading /> */}
            </Grid>
            {/* <Grid item md={6}>
              <Box
                sx={{
                  display: 'flex',
                  height: '100%',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end'
                }}>
                <SearchBar />
              </Box>
            </Grid>
           
              Filter Tags
            <Grid item sm={12}>
              <Box sx={{ overflowX: 'hidden' }}>
                <FilterTags />
              </Box>
            </Grid>
            
            Filter chart */}
            <TimeChart
              volume={false}
              height={80}
              heading="Players Activity"
              value={value}
              setValue={setValue}
              sx={theme.typography.title}
            />
            {/* 
              Filter List
            <Grid item sx={{ maxWidth: '100%', overflowX: 'hidden' }}>
              <SearchFilterList />
            </Grid> */}
          </Grid>

          {/* <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: '20px' }}
            onClick={handleClose}>
            Search
          </Button> */}
        </Box>
      {/* </Popover> */}
    </Box>
  );
};

export default AdvanceSearch;
