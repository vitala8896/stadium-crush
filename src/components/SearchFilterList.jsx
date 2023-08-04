import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  styled,
  Chip,
  Popover,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  FormLabel,
  useTheme
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';

// app navigation
import { appNavigation } from '../navigation';

// Images
import { ReactComponent as FilterIcon } from '../assets/img/Icons/modelIcon.svg';

// Redux Actions
import { clickedItem, getDocuments } from '../redux/facet';

// Components
import SearchBar from './SearchBarAdvanceSearch';

const CustomList = styled(List)(({ theme }) => ({
  border: `1px solid gray`,
  borderRadius: '5px',
  minHeight: '250px',
  maxHeight: '250px',
  height: '100%',
  width: '100%',
  overflow: 'scroll',
  '&::-webkit-scrollbar': {
    width: `6px`,
    height: `6px`
  },
  '&::-webkit-scrollbar-track': {
    background: "gray"
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: "gray",
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: 'darkgray'
  }
}));

const CustomChip = styled(Chip)(({ theme }) => ({
  borderRadius: '5px',
  background: "gray",
  color: "gray"
}));

const CustomBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between'
});

const SearchFilterList = () => {
  const [clickItem, setClickItem] = React.useState(null);
  const [searchItem, setSearchItem] = React.useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { advanceSearch, clickedItems, dateQuery } = useSelector((state) => state.facet);
  const dispatch = useDispatch();
  const theme = useTheme();

  const openPop = Boolean(anchorEl);
  const id = openPop ? 'simple-popover' : undefined;

  const handleClickPop = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onChangeHandler = (e) => {
    const data = { ...clickItem };
    delete data.count;

    const obj = {
      prefix: e.target.value,
      filter: data
    };

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

    dispatch(clickedItem(obj));
    dispatch(getDocuments(query));
    handleClose();
  };

  const renderChild = (data, item) => {
    let child = null;
    const childArray = !data.slug
      ? data && data[item.slug]?.counts
      : advanceSearch && advanceSearch[data.slug]?.counts;
    // debugger;

    child = childArray?.map(
      (childItem) =>
        childItem.value !== '' && (
          <div key={nanoid()}>
            <ListItem
              disablePadding
              onClick={(e) => {
                handleClickPop(e);
                setClickItem(childItem);
              }}>
              <ListItemButton>
                <ListItemText primary={childItem.value} />
                <CustomChip
                  label={
                    childItem.count &&
                    childItem.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                />
              </ListItemButton>
            </ListItem>
            <Divider />
          </div>
        )
    );

    return (
      <>
        <SearchBar data={item} setSearchItem={setSearchItem} />
        {child}
      </>
    );
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', maxWidth: '75vw', width: '100%', overflowX: 'scroll',
      paddingBottom: '10px',
        '&::-webkit-scrollbar': {
          width: `6px`,
          height: `8px`
        },
        '&::-webkit-scrollbar-track': {
          background: "gray"
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: "gray",
          borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: 'darkgray'
        }
      }}>
        {advanceSearch &&
          appNavigation?.map((item) => {
            console.log('appNavigation', appNavigation);
            console.log('appNavigation', advanceSearch);
            return Object.keys(advanceSearch).length === 0 ? null : (
              <div key={nanoid()}>
                {!(item.slug in advanceSearch) && null}

                {item.slug in advanceSearch && (
                  <Box sx={{ minWidth: '250px', maxWidth: '250px', marginRight: '20px' }}>
                    <CustomBox my={1}>
                      <Typography variant="bold" component="span" color="primary">
                        {item.title}
                      </Typography>
                      <FilterIcon />
                    </CustomBox>

                    <CustomList disablePadding>{renderChild(searchItem || item, item)}</CustomList>
                  </Box>
                )}
              </div>
            );
          })}
      </Box>

      <Popover
        id={id}
        open={openPop}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}>
        <Box sx={{ padding: '20px' }}>
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
    </Box>
  );
};

export default SearchFilterList;
