import { useEffect } from 'react';
import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, CircularProgress, Box, Typography, IconButton, Button, Breadcrumbs
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import DirCard from '../components/DirectoryCard';
import SearchTag from '../components/SearchFilterTags';
import { getNavigateData, deleteQueryPath } from '../redux/facet';

export default function NestedList() {
  const dispatch = useDispatch();
  const { navigateRecord, clickedItems, queryPath, documentStatus, 
    navigationStatus, facetStatus, facetSummeryStatus
  } = useSelector((state) => state.facet);

  useEffect(() => {
    dispatch(
      getNavigateData({
        body: {
          queryItems: clickedItems.length > 0 ? [...clickedItems] : []
        }
      })
    );
  }, [clickedItems, dispatch]);

  const backHandler = async (ind) => {
    await dispatch(deleteQueryPath(ind));

    dispatch(
      getNavigateData({
        body: {
          queryItems: clickedItems.length > 0 ? [...clickedItems] : []
        },
        urlParam: {
          path: JSON.stringify(ind) ? queryPath[ind] : queryPath[queryPath.length - 1]
        }
      })
    );
  };

  return (
    <>
      {facetSummeryStatus === 'loading' ||
      documentStatus === 'loading' ||
      navigationStatus === 'loading' ||
      facetStatus === 'loading' ? (
        <Box
          sx={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {queryPath.length > 1 && (
            <Button
              size="small"
              variant="contained"
              onClick={() => backHandler(queryPath.length - 2)}>
              <IconButton color="white" size="small">
                <ArrowBack />
              </IconButton>
            </Button>
          )}
          <SearchTag />

          <Box sx={{ padding: '0 0 20px' }}>
            <Breadcrumbs aria-label="breadcrumb">
              {queryPath.map((item, ind) => {
                const string = item.split('/')[item.split('/').length - 1];

                return (
                  <Typography key={nanoid()} onClick={() => backHandler(ind)}>
                    {string}
                  </Typography>
                );
              })}
            </Breadcrumbs>
          </Box>

          {Object.keys(navigateRecord).length > 0 && (
            <Grid container spacing={1}>
              {navigateRecord.records.length > 0 ? (
                navigateRecord.records.map((item) => (
                  <Grid item xs={3} key={nanoid()}>
                    <DirCard item={item} />
                  </Grid>
                ))
              ) : (
                <Typography sx={{ margin: '50px auto 0' }} variant="h6">
                  Find 0 Record Against This Query
                </Typography>
              )}
            </Grid>
          )}
        </>
      )}
    </>
  );
}
