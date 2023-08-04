import { IconButton, Button, Box, useTheme } from '@mui/material';
import { ArrowBack, ArrowForward
  // , KeyboardDoubleArrowLeft 
} from '@mui/icons-material';

import { useSelector, useDispatch } from 'react-redux';


// actions
import { getDocuments } from '../redux/facet';

let pageNum=1;
let pageSearchPoints={};

const Pagination = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { documents, clickedItems, dateQuery } = useSelector((state) => state.facet);

  // const beginning = () => {
  //   let query = {};
  //   pageNum=1;
  //   console.log("pg="+pageNum);
  //   if (Object.keys(dateQuery).length > 0) {
  //     query = {
  //       queryItems: [...clickedItems, dateQuery]
  //     };
  //   } else {
  //     query = {
  //       queryItems: [...clickedItems]
  //     };
  //   }

  //   dispatch(getDocuments(query));
  // };

  const prevData = () => {
    let query = {};
    pageNum = pageNum-1;
    if (pageNum===0) pageNum=1;
    let prevSearchPoint;
    if (pageSearchPoints.hasOwnProperty(pageNum)) {
       prevSearchPoint=pageSearchPoints[pageNum];
    } else {
       prevSearchPoint=documents.searchPoint;
    }

    console.log("pg="+pageNum+": "+prevSearchPoint);
    if (Object.keys(dateQuery).length > 0) {
      query = {
        queryItems: [...clickedItems, dateQuery],
        searchPoint: [...prevSearchPoint]
      };
    } else {
      query = {
        queryItems: [...clickedItems],
        searchPoint: [...prevSearchPoint]
      };
    }

    dispatch(getDocuments(query));
  };

  const nextData = () => {
    let query = {};
    pageSearchPoints[pageNum]=documents.searchPoint;
    pageNum = pageNum+1;
    console.log("pg="+pageNum+": "+pageSearchPoints[pageNum]);
    if (Object.keys(dateQuery).length > 0) {
      query = {
        queryItems: [...clickedItems, dateQuery],
        searchPoint: [...documents.searchPoint]
      };
    } else {
      query = {
        queryItems: [...clickedItems],
        searchPoint: [...documents.searchPoint]
      };
    }

    dispatch(getDocuments(query));
  };

  return (
    <Box sx={{ padding: '0 15px 20px ', textAlign: 'right', marginTop: '15px' }}>
      {/* <Button size="small" variant="contained" sx={{ 
        marginRight: '15px', 
        background: "gray", 
        border: `1px solid gray`, boxShadow: 'none',
          '&:hover': {
            backgroundColor: theme.palette.blue.hover,
            boxShadow: 'none'
        }}} onClick={() => beginning()}>
        <IconButton color="white" size="small">
          <KeyboardDoubleArrowLeft/>
        </IconButton>
      </Button> */}

      <Button size="small" variant="contained" style={{ 
        background: "gray", width: '112px', height: '38px', marginRight: '12px',
        padding: 0, boxShadow: 'none', cursor: 'pointer', color: "gray",
        border: `1px solid "gray"`,
          '&:hover': {
            backgroundColor: theme.palette.blue.hover,
            boxShadow: 'none'
          }
        }} onClick={() => prevData()}>
        <IconButton color="inherit" size="small" sx={{width: '100%', height: '100%',
          borderRadius: 0, padding: 0
        }}>
          <ArrowBack />
          Prev
        </IconButton>
      </Button>

      <Button size="small" variant="contained" style={{ 
        background: "gray", width: '112px', height: '38px',
        padding: 0, boxShadow: 'none', cursor: 'pointer', color: "gray",
        border: `1px solid "gray"` }} onClick={() => nextData()}>
        <IconButton color="inherit" size="small" sx={{width: '100%', height: '100%',
          borderRadius: 0, padding: 0
        }}>
          Next
          <ArrowForward/>
        </IconButton>
      </Button>
    </Box>
  );
};

export default Pagination;
