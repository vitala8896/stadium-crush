import { useState } from 'react';
import { Chip, Stack, styled, Typography, Badge, Box, useTheme } from '@mui/material';
// import SearchFilterLoadQueryDialog from './SearchFilterLoadQueryDialog';
// import SearchFilterSaveQueryDialog from './SearchFilterSaveQueryDialog';
import { useSelector, useDispatch } from 'react-redux';

// redux
import { removeItem, getDocuments, clearClickedItem } from '../redux/facet';

// utils
// import useUpdateEffect from '../utils/useUpdateEffect';

const CustomChip = styled(Chip)(({ theme }) => ({
  borderRadius: '3px',
  border: `1px solid gray`,
  background: 'transparent'
}));

const HeadingChip = styled(Chip)(({ theme }) => ({
  borderRadius: '3px',
  background: "gray"
}));

const defaultState = { dialogName: undefined, open: false };

const SearchFT =  () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [{ dialogName, open }, setState] = useState(defaultState);
  const handleRemove = (value) => dispatch(removeItem(value));
  const handleOpen = (dialogName) => () => setState((p) => ({ ...p, dialogName, open: true }));
  const handleClose = (dialogName) => () => setState((p) => ({ ...p, dialogName, open: false }));

  const query = useSelector((state) => {
    const slugList =
      (state.facet.clickedItems.length > 0 && [
        ...new Set(state.facet.clickedItems.map((item) => item.filter.facet))
      ]) ||
      [];

    return slugList?.map((slug) => {
      return {
        [slug || 'Search']: state.facet.clickedItems.filter((item) => item.filter.facet === slug)
      };
    });
  });
  // Maybe remove extra parens  on line 56 and 130?
  const render = () => {
    return (
      <>
        {/* <SearchFilterLoadQueryDialog
          open={dialogName === 'load' && open}
          handleClose={handleClose('load')}
        /> */}
        {/* <SearchFilterSaveQueryDialog
          open={dialogName === 'save' && open}
          handleClose={handleClose('save')}          
        /> */}
        {/* <Box sx={{ display: 'flex', alignItems: 'center', width: '100%'}}>
          {(
            <>
              <Typography sx={{ marginRight: '20px' }} variant="h6">
                Search Query:
              </Typography>

              {query.map((item) => (
                <>
                  <HeadingChip
                    label={Object.keys(item)[0]}
                    size="small"
                    color="primary"
                    sx={{ textTransform: 'capitalize', marginRight: '10px' }}
                  />

                  {item[Object.keys(item)[0]].map((value) => {
                    // debugger;
                    return (
                      <Box onClick={() => handleRemove(value)} sx={{ marginRight: '15px' }}>
                        <Badge
                          sx={{ cursor: 'pointer' }}
                          badgeContent={
                            <Typography
                              variant="bold"
                              component="span"
                              sx={{
                                fontSize: '8px',
                                color: '#ffffff'
                              }}>
                              X
                            </Typography>
                          }
                          color={
                            (value.prefix === 'may' && 'gray') ||
                            (value.prefix === 'not' && 'error') ||
                            'primary'
                          }>
                          <CustomChip
                            label={value.filter.value || value.filter}
                            size="small"
                            sx={{
                              borderColor:
                                (value.prefix === 'may' && '#ACACAC') ||
                                (value.prefix === 'not' && 'red')
                            }}
                          />
                        </Badge>
                      </Box>
                    );
                  })}
                </>
              ))}
              <Btn
                variant="span"
                onClick={() => {
                  dispatch(clearClickedItem());
                }}>
                Clear
              </Btn>

              <Btn
                variant="span"
                onClick={handleOpen('save')}>
                Save/Tag/Export
              </Btn>
              <Btn
                variant="span"
                onClick={handleOpen('load')}>
                Query History
              </Btn>
            </>
          )}
        </Box> */}
      </>
    );
  };

  return (
    (query && (
      <Box>
        <Stack direction="row" py={2}>
          {render()}
        </Stack>
      </Box>
    )) || <></>
  );
};
export default SearchFT;
const Btn = styled(Typography)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: '20px', 
  fontSize: '14px', 
  cursor: 'pointer',
  borderRadius: '4px',
  height: '38px',
  padding: '0 15px',
  background: 'transparent', 
  color: "gray", 
  border: `1px solid gray`,
    '&:hover': {
      background: "gray",
    }
}))