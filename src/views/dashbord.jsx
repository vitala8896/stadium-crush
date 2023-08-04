import React, { useEffect , useState } from 'react';
import { Grid,
  //  Typography, 
   Box, Button,
  //  Modal
   CircularProgress, styled,
  // useTheme
 } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// components
// import { BasicCard } from '../components/Cards';
import Table from '../components/Table';
import Calender from '../components/Calendar';
// import FilterTags from '../components/SearchFilterTags';
import FileDetail from '../components/FileDetail';
import Vector from './../assets/img/Icons/Vector.svg';
import VectorWhite from './../assets/img/Icons/VectorWhite.svg';
import CalendarImg from './../assets/img/Icons/calendar.svg';
import CalendarImgWhite from './../assets/img/Icons/calendarWhite.svg';

// import TextCloud from '../components/TextCloud';
import Header from '../layout/header';
import { getFacets
  // , getFacetsForCloud
  , getDocuments, getFacetSummary } from '../redux/facet';
import { appNavigation } from '../navigation';
import useUpdateEffect from '../utils/useUpdateEffect';
// import { pickGreatest } from '../utils/findMaxValue';


const Dashbord = () => {
  const [open, setOpen] = useState(false);
  const [fileDetail, setFileDetail] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const dispatch = useDispatch();
  const { clickedItems, dateQuery, documentStatus,
    navigationStatus, facetStatus, facetSummeryStatus, // tagCloud, navigationChild,
  } = useSelector((state) => state.facet);
  
    useEffect(() => {
   
    if (appNavigation) {
      appNavigation.map(
        (item) =>
          item.slug &&
          item.slug !== '' &&
          dispatch(getFacets({ urlParam: item.slug, queryParam: clickedItems }))
          
      );
    }
  }, [clickedItems, dispatch]);

  useUpdateEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let query = {};
      if (Object.keys(dateQuery).length > 0) {
        query = {
          queryItems: [...clickedItems, dateQuery]
        };
      } else {
        query = {
          queryItems: [...clickedItems]
        };
      }
      dispatch(getDocuments(query));
      dispatch(getFacetSummary(query));
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [dateQuery, clickedItems]);

  const handleDrawerOpen = (data) => {
    setFileDetail(data);
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleMouseEnter = (buttonNumber) => {
    setHoveredButton(buttonNumber);
  };
  const handleMouseLeave = () => {
    setHoveredButton(null);
  };
  const handleButtonClick = () => {
    setShowCalendar(!showCalendar);
  };
  const progressLoading = facetSummeryStatus === 'loading' || 
        documentStatus === 'loading' || navigationStatus === 'loading' || 
        facetStatus === 'loading'
  return (
    <div style={{ background: 'transparent',
      marginTop: '70px', width: '100%'}}>        
      {progressLoading ? (
        <Box
          sx={{
            height: '80vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CircularProgress />
        </Box>
      ) : (
        <FileDetail handleDrawerClose={handleDrawerClose} open={open} fileDetail={fileDetail}>
          <Header title='Current Matches'>
            <Box sx={{display: 'flex'}}>
              <ButtonStyle sx={{width: '48px'}}>All</ButtonStyle>
              <ButtonStyle sx={{width: '99px', margin: '0 8px'}} 
                  onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={handleMouseLeave}>
                  <img src={hoveredButton === 2 ? VectorWhite : Vector} alt="Vector" 
                    style={{paddingRight: '8px'}} />ALWS
              </ButtonStyle>  
              <ButtonCalendar show={{showCalendar}} handlebuttonclick={handleButtonClick}
                  onClick={handleButtonClick}  onMouseEnter={() => handleMouseEnter(3)} 
                  onMouseLeave={handleMouseLeave}>
                <img src={(hoveredButton === 3 || showCalendar) ? CalendarImgWhite : CalendarImg} alt="CalendarImg" />
              </ButtonCalendar>            
            </Box>            
          </Header>
          {/* <FilterTags /> */}
          <Grid container spacing={2}>
            {/* Heading Component */}
            {/* <Grid item sm={12} md={6} sx={{ display: 'flex', alignItems: 'center'}}>
                <img src={DocumentIcon} style={{display: "inline", marginRight: '10px'}} alt="Document Icon" />{' '}
                <span>
                  {' '}
                  Indexed Count:{' '}
                  {(summery && summery.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')) || ''} (
                  {(summery && summery.unique.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')) || ''}{' '}
                  distinct)
                </span>
            </Grid> */}
            <Grid item sm={12} md={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                <Calender show={showCalendar}  handlebuttonclick={handleButtonClick}/>
              </Box>
            </Grid>

            {/* Data Table */}
            <Grid item xs={12} 
            // sx={{ height: '300px' }}
            >              
              <Table handleDrawerOpen={handleDrawerOpen} nameTable="Live Games"/>
              <Table handleDrawerOpen={handleDrawerOpen} nameTable="Upcoming Games"/>
            </Grid>
          </Grid>

          {/* Modal Body */}
          {/* <Modal
            open={modalOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
          </Modal> */}          
        </FileDetail>
      )}
    </div>
  );
};

export default Dashbord;

const ButtonStyle = styled(Button)(({ theme }) => (
  theme.button.header
));
const ButtonCalendar = styled(Button)(({ showCalendar, theme }) => ({
  width: '56px',
  background: showCalendar? theme.palette.blue.active : theme.button.header.background,
  '&:hover': {
    background: theme.palette.blue.active
  }
}));