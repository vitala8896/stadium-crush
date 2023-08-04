import { useEffect, useState } from 'react';
import { Grid, Box, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import SearchFilterTag from '../components/SearchFilterTags';
import PieChart from '../components/chart/PieChart';
import TimeSeriesChart from '../components/chart/TimeSeriesGraph';
import { slugs } from '../navigation';
import { getFacetsByQuery, filterItem, timeSeriesGraph } from '../redux/facet';
// import SearchFilterTags from '../components/SearchFilterTags';

const Analytic = () => {
  const [value, setValue] = useState('year');

  const dispatch = useDispatch();
  let facet = useSelector((state) => state.facet);
  const {
    clickedItems,
    graphData,
    filterGraphData,
    documentStatus,
    navigationStatus,
    facetStatus,
    facetSummeryStatus,
    timeGraphStatus
  } = facet;

  useEffect(() => {
    return async () => {
      await slugs.map((slug) => dispatch(getFacetsByQuery({ urlParam: slug, data: clickedItems })));
    };
  }, [clickedItems, dispatch]);

  useEffect(() => {
    if (clickedItems.length > 0 && value !== '') {
      dispatch(
        timeSeriesGraph({
          body: {
            queryItems: [...clickedItems]
          },
          urlParam: {
            sum: 'size',
            interval: value
          }
        })
      );
    } else if (clickedItems.length === 0 && value === '') {
      dispatch(
        timeSeriesGraph({
          body: {
            queryItems: []
          },
          urlParam: {
            sum: 'size'
          }
        })
      );
    } else if (clickedItems.length === 0 && value !== '') {
      dispatch(
        timeSeriesGraph({
          body: {
            queryItems: []
          },
          urlParam: {
            sum: 'size',
            interval: value
          }
        })
      );
    } else if (clickedItems.length > 0 && value === '') {
      dispatch(
        timeSeriesGraph({
          body: {
            queryItems: [...clickedItems]
          },
          urlParam: {
            sum: 'size'
          }
        })
      );
    }
  }, [value, clickedItems, dispatch]);

  useEffect(() => {
    Object.keys(graphData).length > 0 &&
      Object.keys(graphData).map((item) => {
        if (graphData[item].counts.length > 0) {
          dispatch(
            filterItem({
              [item]: {
                value: graphData[item].counts.map((value) => value.value.slice(0, 15)),
                count: graphData[item].counts.map((value) => value.count)
              }
            })
          );
        }
      });
  }, [graphData, dispatch]);

  return (
    <>
      {facetSummeryStatus === 'loading' ||
      documentStatus === 'loading' ||
      navigationStatus === 'loading' ||
      facetStatus === 'loading' ||
      timeGraphStatus === 'loading' ? (
        <Box
          sx={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2} alignItems="end">
          <Grid item sm={12} md={12}>
            <SearchFilterTag />
          </Grid>

          <Grid item sm={12}>
            <TimeSeriesChart heading="Time Series Graph" value={value} setValue={setValue} />
          </Grid>

          {filterGraphData &&
            Object.keys(filterGraphData).map((item, ind) => {
              const data = filterGraphData[item].count;
              const label = filterGraphData[item].value;

              return (
                <Grid key={ind} item sm={12} md={6} sx={{ height: '500px' }}>
                  <PieChart heading={item} data={data} labels={label} />
                </Grid>
              );
            })}
        </Grid>
      )}
    </>
  );
};

export default Analytic;
