import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';

const Example: React.FC<{fcname:string}> = ({fcname}) => {
  document.title = 'Demo - Parameters & Props';
  const { rpname } = useParams();

  return (
    <>
      <Box display={'flex'} justifyContent={'center'}>
        <Typography sx={{mt: 2}} variant='h3' gutterBottom>Parameters & Props</Typography>
      </Box>
      <Box display={'flex'} justifyContent={'center'} alignContent={'center'}>
        <table>
          <tbody>
            <tr>
              <th>FC Props:</th>
              <td>{fcname}</td>
            </tr>
            <tr>
              <th>Parameter:</th>
              <td>{rpname}</td>
            </tr>
          </tbody>
        </table>
      </Box>
    </>
  );
};

export default Example;