const { Box } = require('@mui/material');
const { styled } = require('@mui/system');

const ChartBox = styled(Box)(() => ({
  backgroundColor: 'black',
  borderRadius: '1rem',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  color: '#fff'
}))

export default ChartBox;