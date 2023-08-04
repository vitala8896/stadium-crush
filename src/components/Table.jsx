import React, {useState} from 'react';
import {
  Table, TableContainer, TableHead, TableRow, TableBody, TableCell, Paper, Box, 
  Typography, Button, useTheme, styled
} from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import DateTimeConverter from './DateTimeConverter'
import Image10 from '../assets/img/image10.png';
import Image7 from '../assets/img/image7.png';
import data from './data'



const columns = [
  { id: 'date', label: 'date', minWidth: '190px', maxWidth: '200px' },
  { id: 'teamName1', label: 'Team Name1', minWidth: '200px', maxWidth: '200px', align: 'right' },  
  { id: 'Icon1', label: 'Icon1', minWidth: '20px', maxWidth: '20px', align: 'right' },  
  { id: 'vs', label: 'vs', minWidth: '20px', maxWidth: '20px', align: 'center' },
  { id: 'Icon2', label: 'Icon2', minWidth: '20px', maxWidth: '20px', align: 'left' },    
  { id: 'teamName2', label: 'Team Name2', minWidth: '200px', maxWidth: '200px'},
  { id: 'sponsored', label: 'sponsored', minWidth: '70px', maxWidth: '80px' },  
  { id: 'View statistics', label: 'View statistics', minWidth: '100px', maxWidth: '120px' },
  // {
  //   id: 'details',
  //   label: 'Details',
  //   maxWidth: '10px',
  //   align: 'right',
  //   format: (value) => value.toLocaleString('en-US')
  // }
];

function createData(date, teamName1, Icon1, Icon2, teamName2) {
  return { date, teamName1, Icon1, Icon2, teamName2 };
}

const CustomTable = ({ handleDrawerOpen, nameTable }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  // const { documents, summery } = useSelector((state) => state.facet);
  const theme = useTheme();
  const navigate = useNavigate();
  
  const rows =
    (data &&
      data?.events?.map((item) => {
        return createData([item.start_time, item.venue_city, item.venue_name],   
                          data.teams[item.home_team_id].short_name, 
                          Image10,
                          Image7,
                          data.teams[item.away_team_id].short_name,
                         );
      })) ||
    [];

  const tableDataSelectHandler = (row) => {
    navigate('file', { state: row });
  };
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', background: 'none', marginBottom: '50px', zIndex: 1 }}>          
      <TableStyled sx={{ maxHeight: 432, border: 'none', zIndex: 1 }}>
        <Table stickyHeader aria-label="sticky table" sx={{zIndex: 1}}>           
          <TableHead sx={{display: nameTable==='Archived Matches' ? 'none':'table-header-group', height: '72px', 
                          marginBottom: '16px', zIndex: 1}}>
            <TableRow sx={{zIndex: 1}}>
              <TableCell colSpan={2} sx={{ justifyContent: 'start',  
                    background: 'transparent', paddingLeft: 0, border: 'none', zIndex: 1}}>
              <TableTitleWrapper>
                <hr style={{ width: '90%', marginLeft: 0, 
                        borderTop: `1px solid ${theme.palette.blue.border}`, 
                        borderBottom: 'none', borderRight: 'none', borderLeft: 'none' }}/>
              </TableTitleWrapper>              
              </TableCell>
              <TableCell colSpan={3} sx={{padding: 0, background: 'transparent', border: 'none'}}>
                <TableTitleWrapper sx={{padding: 0, justifyContent: 'center', zIndex: 1}}>
                  <TableTitle sx={{padding: 0, textAlign: 'center', zIndex: 1}}>
                    {nameTable}
                  </TableTitle>
                </TableTitleWrapper>              
              </TableCell>
              <TableCell colSpan={3} sx={{paddingRight: 0, background: 'transparent', border: 'none', zIndex: 1}}>
                <TableTitleWrapper>
                  <hr style={{width: '90%', marginRight: 0, borderTop: `1px solid ${theme.palette.blue.border}`, 
                        borderBottom: 'none', borderRight: 'none', borderLeft: 'none' }}/>
                </TableTitleWrapper>              
              </TableCell>
            </TableRow>
            
            <TableRow>
              {rows.length === 0 ? (
                <Typography
                  sx={{ margin: '50px 0 0', textAlign: 'center', width: '100%', cursor: 'pointer' }}
                  variant="h6">
                  Find 0 Record Against This Query
                </Typography>
              ) : (
                columns.map((column) => (
                  <TableCell
                    key={nanoid()}
                    align={column.align}
                    style={{
                      display: 'none',
                      minWidth: column.minWidth,
                      background: "transparent",
                      color: "white",
                      zIndex: 1
                    }}>
                    {column.label}
                  </TableCell>
                ))
              )}
            </TableRow>
          </TableHead>
          <TableBody>
              {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={nanoid()} 
                    sx={{alignItems: 'center', border: '1px solid green', zIndex: 1}}>
                    {columns.map((column, ind) => {               
                      return (
                        <TableCell
                          sx={{ 
                            minWidth: column.minWidth,
                            maxWidth: column.maxWidth,
                            height: '72px', border: 'none', zIndex: 1,
                            justifyContent: column.label === 'File Name' ? 'end':
                                            column.label === 'Icon' ? 'center':
                                            column.label === 'Icon2' ? 'center':
                                                             'start',
                            cursor: 'pointer', 
                            padding: column.label === 'vs' ? '10px 8px' : 
                                     column.label === 'date' ? '0 0 0 25px' :
                                     column.label === 'Icon1' ? '5px' :
                                     column.label === 'Icon2' ? '5px' :
                                     '10px 10px',                                                     
                            background: 'none', color: theme.palette.white,
                          }}
                          key={ind}
                          align={column.align}
                          onClick={() => column.label !== 'sponsored' && tableDataSelectHandler(row)}>
                            {column.label === 'sponsored' && (
                              <Button sx={theme.button.sponsored}>sponsored</Button>
                            )}  
                            {column.label === 'View statistics' && 
                              <Typography sx={{whiteSpace: "nowrap"}}>View statistics</Typography>
                            }
                            {column.label === 'vs' && "vs"}   
                            {column.label === 'date' && 
                              <DateTimeConverter dateString={row[column.id][0]} 
                                venue={row[column.id][1]} venueName={row[column.id][2]} />
                            }
                            {(column.label === 'Icon1' || column.label === 'Icon2') 
                              && <img src={row[column.id]} alt=""/>}
                            {(column.label === 'Team Name1' || column.label === 'Team Name2'
                             ) && row[column.id]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody> 
        </Table>          
      </TableStyled>
    </Paper>
  );
};

export default CustomTable;

CustomTable.defaultProps = {
  handleDrawerOpen: () => {}
};

CustomTable.propTypes = {
  handleDrawerOpen: PropTypes.func
};

const TableStyled = styled(TableContainer)(({theme})=>({ 
  overflowY: 'hidden',
  overflowX: 'scroll',
  width: '100%',
  scrollbarWidth: 'thin',
  scrollbarColor: 'gray lightgray',  
  '&::-webkit-scrollbar': {
    width: `0px`,
    height: `6px`
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
const TableTitleWrapper = styled(Box)(()=>({
  width: '100%',
  display: 'flex',
  alignItems: 'center',  
}))
const TableTitle = styled(Typography)(({theme})=>({
  textAlign: 'center',
  fontSize: '20px',
  fontWeight: 700,  
  color: theme.palette.white.color
}))
// const FileIconImg = styled('img')({
//   width: "35px",
//   height: "35px"
// });