const { Box } = require('@mui/material');
const { styled } = require('@mui/system');

const ChartBox = styled(Box)(() => ({
  backgroundColor: '#202121',
  borderRadius: 0,
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  color: '#fff'
}))

export default ChartBox;