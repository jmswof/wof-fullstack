import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useAuthContext } from '../../context/AuthContext';
import { FormEvent, useEffect, useState } from 'react';


const FloorType: React.FC = () => {
  document.title = 'World of Floors - Configure Floor Type';

  const {user} = useAuthContext();
  const [name, setName] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [floorTypes, setFloorTypes] = useState([]);
  const [selection, setSelection] = useState(new Array(floorTypes.length).fill(''));
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  useEffect(
    () => {
      fetch(`${process.env.WOF_SERVER}/configure/floor-type`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Basic ${btoa(user['multiFactor'].user.accessToken)}`
        }
      })
      .then(response => response.json())
      .then(response => setFloorTypes(response))
      .catch(error => {
        // TODO: Navigate to login screen if 403 response.
        console.log(error)
      });
    },
    []
  );

  const handleSelection = (e:FormEvent<HTMLInputElement>, id:string):void => {
    const index = selection.indexOf(id);
    if (index < 0)
      selection.push(id);
    else
      selection.splice(index, 1);

    setSelection([...selection]);
  }

  const submitCreate = ():void => {
    fetch(`${process.env.WOF_SERVER}/configure/floor-type`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
      },
      body: JSON.stringify({name})
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      if (response.acknowledged && response.insertedId !== null) {
        setFloorTypes([...floorTypes, { _id: response.insertedId, name }]);
        setName('');
      }
    })
    .catch(error => console.log(error));
  };

  const submitDelete = ():void => {
    console.log(selection);
    if (selection.length < 1)
      return;

    fetch(`${process.env.WOF_SERVER}/configure/floor-type`, {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selection)
    })
    .then(response => response.json())
    .then(response => {
      if (response.acknowledged && response.deletedCount === selection.length) {
        setFloorTypes([...floorTypes.filter(floorType => selection.indexOf(floorType._id) < 0)]);
        setSelection([]);
      }
    })
    .catch(error => console.log(error));
  };

  const handleUpdate = (id:string, name:string):void => {
    const floorType = floorTypes.find(p => p._id == id);
    floorType.name = name;
    fetch(`${process.env.WOF_SERVER}/configure/floor-type`, {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(floorType)
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      if (response.acknowledged && response.matchedCount === 1) {
        setId('')
        setName('');
        setOpenDialog(false);
      }
    })
    .catch(error => console.log(error));
  }

  return (
    <Container sx={{mb:5}}>
      {
        openDialog &&
        <UpdateFloorTypeModal
          name={name}
          id={id}
          open={true}
          close={() => {
            setId('');
            setName('');
            setOpenDialog(false)
          }}
          update={handleUpdate}
        />
      }
      <Box display={'flex'} sx={{my: 2}} justifyContent={'center'}>
        <Typography variant='h3'>Configure Floor Type</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>
                <Button onClick={submitDelete}>
                  <DeleteForeverIcon />
                </Button>
              </TableCell>
              <TableCell>
                <FormControl fullWidth>
                  <InputLabel htmlFor="floor-type">Flooring Type</InputLabel>
                  <Input id="floor-type" aria-describedby="floor-type-helper" value={name} onChange={(e) => setName(e.target.value)} />
                  <FormHelperText id="floor-type-helper">Any type of flooring</FormHelperText>
                </FormControl>
              </TableCell>
              <TableCell>
                <Button variant='contained' onClick={submitCreate} fullWidth>
                  <Typography>Create New Floor Type</Typography>
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              !floorTypes.length &&
              <TableRow>
                <TableCell align='center' colSpan={3}>
                  <Typography sx={{my: 2}} color={'standard'}>Wow. A empty list!</Typography>
                </TableCell>
              </TableRow>
            }
            { floorTypes.map((floorType, floorTypeIndex) => {
              return (
                <TableRow key={floorTypeIndex}>
                  <TableCell align='center'>
                    <Checkbox
                      onChange={
                        (e:FormEvent<HTMLInputElement>):void => handleSelection(e, floorType._id)
                      }
                      checked={
                        selection.some(id => id === floorType._id)}
                      />
                    </TableCell>
                  <TableCell colSpan={2} onClick={() => {
                      setId(floorType._id);
                      setName(floorType.name);
                      setOpenDialog(true);
                  }}>
                    {floorType.name}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell align='center' colSpan={3}>{floorTypes.length} Floor Types</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
};

const UpdateFloorTypeModal: React.FC<{open:boolean, id:string, name:string, update:(id:string, name:string) => void, close:() => void}> = ({open, id, name, update, close}) => {
  const [floorTypeName, setFloorTypeName] = useState<string>(name);

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>Edit Floor Type</DialogTitle>
      <DialogContent>
        <TextField autoFocus margin="dense" label="Name" fullWidth variant="standard" value={floorTypeName} onChange={(e) => {setFloorTypeName(e.target.value)}}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button onClick={() => update(id, floorTypeName)}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}

export default FloorType;