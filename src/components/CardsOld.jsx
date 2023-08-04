import { Card, styled, Typography, Box } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PropTypes from 'prop-types';



const BasicCard = ({ Icon, count, title }) => {
  return (
    <CustomCard>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconBox>
          <Icon height="50%" width="60%" stroke="#ffffff" />
        </IconBox>
        <Box>
          <Typography variant="h5" component="h4">
            {count}
          </Typography>
          <Typography>{title}</Typography>
        </Box>
      </Box>
      <KeyboardArrowDownIcon />
    </CustomCard>
  );
};

export { BasicCard };

BasicCard.defaultProps = {
  Icon: null,
  count: 0,
  title: 'Tags'
};

BasicCard.propTypes = {
  Icon: PropTypes.oneOfType(PropTypes.object),
  count: PropTypes.number,
  title: PropTypes.string
};


const CustomCard = styled(Card)({
  padding: '15px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});

const IconBox = styled(Box)(() => ({
  background: "gray",
  color: 'white',
  height: '55px',
  width: '60px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '7px',
  marginRight: '15px'
}));