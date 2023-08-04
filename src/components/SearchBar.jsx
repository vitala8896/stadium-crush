import { useState } from 'react';
import { InputBase, styled } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';

// redux
import { getDocuments, getFacetSummary, clickedItem,doExportQuery } from '../redux/facet';

// utils
import useUpdateEffect from '../utils/useUpdateEffect';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',  
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "gray",
  marginRight: theme.spacing(0),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto'
  }
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  borderBottom: `2px solid transparent`,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 2),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  },
  '&:hover': {
    borderBottom: `2px solid ${theme.palette.gray.border}`,
    borderRadius: '4px',
  }
}));

const SearchBar = ({upload}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const { clickedItems, dateQuery } = useSelector((state) => state.facet);

  useUpdateEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let query = {};

      if (searchTerm !== '' && Object.keys(dateQuery).length > 0) {
        query = {
          queryItems: [...clickedItems, dateQuery, { prefix: 'must', filter: searchTerm }]
        };
      } else if (searchTerm === '' && Object.keys(dateQuery).length > 0) {
        query = {
          queryItems: [...clickedItems, dateQuery]
        };
      } else if (searchTerm !== '' && Object.keys(dateQuery).length === 0) {
        query = {
          queryItems: [...clickedItems, { prefix: 'may', filter: searchTerm }]
        };
      } else if (searchTerm === '' && Object.keys(dateQuery).length === 0) {
        query = {
          queryItems: [...clickedItems]
        };
      }

      dispatch(getDocuments(query));
      dispatch(getFacetSummary(query));
      dispatch(doExportQuery(query));
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <>
      <Search>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          className={upload ? "search" : null}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          onBlur={() => {
            searchTerm !== '' &&
              dispatch(
                clickedItem({
                  prefix: 'must',
                  filter: searchTerm
                })
              );
          }}
        />
      </Search>

      <div
        style={{
          padding: '6px 10px',
          background: "gray",
          borderRadius: '5px',
          color: 'white',
          marginRight: '15px',
          cursor: 'pointer',          
        }}>
        <SearchIcon />
      </div>
    </>
  );
};

export default SearchBar;
