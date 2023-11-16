import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { FormEvent, useEffect, useState } from 'react';

const Product: React.FC = () => {
  document.title = 'Demo - Example CRUD';

  const [products, setProducts] = useState([]);
  const [id, setId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [cost, setCost] = useState<number|null>(null);
  const [selection, setSelection] = useState(new Array(products.length).fill(''));
  const [open, setOpen] = useState<boolean>(false);

  useEffect(():void => {
    fetch(process.env.WOF_SERVER + '/products', {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      setProducts(response)
    })
    .catch(error => console.log(error));
  }, []);

  const handleSelection = (e:FormEvent<HTMLInputElement>, id:string):void => {
    const index = selection.indexOf(id);
    if (index < 0)
      selection.push(id);
    else
      selection.splice(index, 1);

    setSelection([...selection]);
  }

  const submitDelete = ():void => {
    if (selection.length < 0)
      return;

    fetch(process.env.WOF_SERVER + '/products', {
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
        setProducts([...products.filter(product => selection.indexOf(product._id) < 0)]);
        setSelection([]);
      }
    })
    .catch(error => console.log(error));
  };

  const submitCreate = ():void => {
    fetch(process.env.WOF_SERVER + '/products', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, cost})
    })
    .then(response => response.json())
    .then(response => {
      if (response.acknowledged && response.insertedId !== null) {
        setName('');
        setCost(null);
        setProducts([...products, { _id: response.insertedId, name, cost }]);
      }
    })
    .catch(error => console.log(error));
  };

  const handleUpdate = (id:string, name:string, cost:number):void => {
    const product = products.find(p => p._id == id);
    product.name = name;
    product.cost = cost;
    fetch(process.env.WOF_SERVER + '/products', {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      if (response.acknowledged && response.insertedId !== null) {
        setId('')
        setName('');
        setCost(null);
        setOpen(false);
      }
    })
    .catch(error => console.log(error));
  }

  return (
    <>
      {open && <UpdateProductModal name={name} cost={cost} id={id} open={true} close={() => setOpen(false)} update={handleUpdate}/>}
      <Box display={'flex'} justifyContent={'center'}>
        <Typography sx={{mt: 2}} variant='h3' gutterBottom>CRUD Example</Typography>
      </Box>
      <Box display={'flex'} justifyContent={'center'}>
        <table>
          <thead>
            <tr>
              <td rowSpan={2}>&nbsp;</td>
              <td>
                <TextField label="Name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  variant="filled"
                  color='secondary'
                  required
                  fullWidth
                />
              </td>
              <td>
                <TextField label="Cost"
                  onChange={(e) => setCost(parseFloat(e.target.value))}
                  value={cost ? cost : ''}
                  type="number"
                  variant="filled"
                  color="secondary"
                  required
                  fullWidth
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <Button sx={{mt: 1}} color="primary" onClick={submitCreate} fullWidth variant="contained">
                  <Typography color={'inherit'}>Add New Product</Typography>
                </Button>
              </td>
            </tr>
            <tr>
              <th>
                <span onClick={submitDelete}><DeleteForeverIcon /></span>
              </th>
              <th>Name</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, productIndex) => {
              return (
                <tr key={productIndex}>
                  <td>
                    <Checkbox onChange={(e:FormEvent<HTMLInputElement>):void => handleSelection(e, product._id)} checked={selection.some(id => id === product._id)}/>
                  </td>
                  <td onClick={() => {
                    setName(product.name);
                    setCost(product.cost);
                    setId(product._id);
                    setOpen(true);
                  }}>
                    <Typography>{product.name}</Typography>
                  </td>
                  <td onClick={() => {
                    setName(product.name);
                    setCost(product.cost);
                    setId(product._id);
                    setOpen(true);
                  }} align='right'><Typography>${product.cost}</Typography></td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
              <tr>
                <td colSpan={3} align='center'>
                  {!products.length && <Typography sx={{my: 2}} color={'standard'}>Wow. A empty list!</Typography>}
                </td>
              </tr>
          </tfoot>
        </table>
      </Box>
    </>
  );
};

const UpdateProductModal: React.FC<{open:boolean, id:string, name:string, cost:number, update:(id:string, name:string, cost:number) => void, close:() => void}> = ({open, id, name, cost, update, close}) => {
  const [productName, setProductName] = useState<string>(name);
  const [productCost, setProductCost] = useState<number>(cost);

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>

        <TextField autoFocus margin="dense" label="Name" fullWidth variant="standard" value={productName} onChange={(e) => {setProductName(e.target.value)}}/>
        <TextField autoFocus margin="dense" label="Cost" type='number' fullWidth variant="standard" value={productCost} onChange={(e) => {setProductCost(parseFloat(e.target.value))}}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button onClick={() => update(id, productName, productCost)}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}

export default Product;