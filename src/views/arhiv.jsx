import React, { useEffect
  // , useState
 } from 'react';
import { Grid,
  //  Typography, 
   Box
  // , Modal
  , CircularProgress, 
  // useTheme, styled
 } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// components
// import { BasicCard } from '../components/Cards';
import Table from '../components/Table';
// import Calender from '../components/Calendar';
// import FilterTags from '../components/SearchFilterTags';
import FileDetail from '../components/FileDetail';
// import TextCloud from '../components/TextCloud';

// ReduX Actions
import { getFacets
  // , getFacetsForCloud
  , getDocuments, getFacetSummary } from '../redux/facet';
  import Header from '../layout/header';
// Icons
// import { ReactComponent as CloudIcon } from '../assets/img/Icons/cloudIcon.svg';
// import { ReactComponent as PeopleIcon } from '../assets/img/Icons/peopleIcon.svg';
// import DocumentIcon from '../assets/img/Icons/document.svg';

// app navigation
import { appNavigation } from '../navigation';

// utils
import useUpdateEffect from '../utils/useUpdateEffect';

const Arhive = () => {
  const [open, setOpen] = React.useState(false);
  const [fileDetail, setFileDetail] = React.useState(null);
  const dispatch = useDispatch();
  // const theme = useTheme();
  const { clickedItems, dateQuery, documentStatus, navigationStatus, facetStatus,
    facetSummeryStatus,
    // tagCloud, navigationChild, summery
  } = useSelector((state) => state.facet);
  // const [modalOpen, setModalOpen] = React.useState(false);
  // const handleOpen = (slug) => {
  //   dispatch(getFacetsForCloud({ urlParam: slug, data: clickedItems }));
  //   setModalOpen(true);
  // };
  // const handleClose = () => setModalOpen(false);

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
  const progressLoading = facetSummeryStatus === 'loading' || documentStatus === 'loading' ||
                          navigationStatus === 'loading' || facetStatus === 'loading'
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
          <Header title='Archived Matches'/>
          {/* <FilterTags /> */}
          <Grid container sm={12} spacing={2} sx={{ height: 'auto' }}>
            <Grid item sm={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                {/* <Calender /> */}
              </Box>
            </Grid>

            {/* Data Table */}
            <Grid item xs={12} sx={{ height: '300px' }}>              
              <Table handleDrawerOpen={handleDrawerOpen} nameTable="Archived Matches"/>
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

export default Arhive;
