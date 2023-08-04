import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { InputBase, styled } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';


// Actions
import { setAdvanceSearchValues, setNavigationChild } from '../redux/facet';

const Search = styled('div')(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.white.dark,
  display: 'flex',
  alignItems: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1),
    transition: theme.transitions.create('width')
  }
}));

const SearchBar = ({ data }) => {
  const [inputValue, setInputValue] = useState({});
  const { navigationChild, advanceSearchValues, advanceSearch } = useSelector(
    (state) => state.facet
  );
  const dispatch = useDispatch();

  const searchHandler = async (e) => {
    dispatch(
      setAdvanceSearchValues({
        ...inputValue
      })
    );

    debugger;

    const childArray = navigationChild[data.slug] && navigationChild[data.slug].counts;

    const result =
      navigationChild[data.slug] &&
      childArray.filter((item) => {
        if (item.value.includes(e.target[0].value)) {
          return item;
        }
      });

    if (result.length > 0) {
      const newFacet = String(result[0].facet);
      dispatch(
        setNavigationChild({
          ...advanceSearch,
          [newFacet]: {
            ...advanceSearch[`${newFacet}`],
            counts: result
          }
        })
      );
    } else {
      // empty search
      // show empty list
      dispatch(
        setNavigationChild({
          ...advanceSearch,
          [data.slug]: {
            ...advanceSearch[`${data.slug}`],
            counts: result
          }
        })
      );
    }
  };

  const changeHandler = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value
    });

    if (e.target.value === '') {
      dispatch(
        setAdvanceSearchValues({
          [e.target.name]: ''
        })
      );
    }
  };

  return (
    <section style={{ display: 'flex', margin: '15px' }}>
      <div
        style={{
          padding: '6px 8px',
          background: '#0175AD',
          borderRadius: '5px',
          color: 'white',
          marginRight: '15px',
          cursor: 'pointer'
        }}>
        <SearchIcon />
      </div>

      <form onSubmit={(e) => searchHandler(e)}>
        <Search>
          <StyledInputBase
            name={data.slug}
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            value={inputValue[data.slug] || advanceSearchValues[data.slug] || ''}
            onChange={(e) => changeHandler(e)}
            // onBlur={(e) => searchHandler(e)}
          />
        </Search>
      </form>
    </section>
  );
};

export default SearchBar;
