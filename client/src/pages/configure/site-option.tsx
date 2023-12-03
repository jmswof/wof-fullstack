import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import USStates from './option/us-states';
import SiteOptionView from './option/site-option-view';
import { useState } from 'react';

const SiteOption: React.FC = () => {
  document.title = 'World of Floors - Site Option';
  const views = {
    0: 'Floor Type',
    1: 'Labor Type',
    2: 'Job Service',
    3: 'Color',
    4: 'Priority',
    5: 'Reference',
    6: 'Vendor',
    7: 'Product Category',
    8: 'Product Brand',
    9: 'US States'
  };

  const [index, setIndex] = useState(0);

  return (
    <Container component={Paper} sx={{my: 5, p: 2}}>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'} sx={{m: 2}}>
        <Typography variant='h3'>Site Option</Typography>
      </Box>
      <Tabs value={index} onChange={(e, index) => {
        setIndex(index);
      }}>
        {Object.keys(views).map(i => <Tab key={i} label={views[i]}/>)}
      </Tabs>

      {/* {views[index] === 'Floor Type' && <FloorType />} */}
      {views[index] === 'Floor Type' && <SiteOptionView name='Floor Type' url='/configure/floor-type' type='all' />}
      {views[index] === 'Labor Type' && <SiteOptionView name='Labor Type' url='/configure/labor-type' type='all' />}
      {views[index] === 'Job Service' && <SiteOptionView name='Job Service' url='/configure/job-service' type='all' />}
      {views[index] === 'Color' && <SiteOptionView name='Color' url='/configure/color' type='all' />}
      {views[index] === 'Priority' && <SiteOptionView name='Priority' url='/configure/priority' type='all' />}
      {views[index] === 'Reference' && <SiteOptionView name='Reference' url='/configure/reference' type='all' />}
      {views[index] === 'Vendor' && <SiteOptionView name='Vendor' url='/configure/vendor' type='all' />}
      {views[index] === 'Product Category' && <SiteOptionView name='Product Category' url='/configure/product-category' type='all' />}
      {views[index] === 'Product Brand' && <SiteOptionView name='Product Brand' url='/configure/product-brand' type='all' />}
      {views[index] === 'US States' && <USStates />}
    </Container>
  );
};

export default SiteOption;