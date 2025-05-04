import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { CustomerData, Customer } from '../types';


type EditCustomerProps = {
  data: CustomerData;
  fetchCustomers: () => void;
};

export default function EditCustomer(props: EditCustomerProps) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState<Customer>({} as Customer);

  const handleClickOpen = () => {
    setOpen(true);
    console.log(props.data)
    setCustomer({
      firstname: props.data.firstname,
      lastname: props.data.lastname,
      streetaddress: props.data.streetaddress,
      postcode: props.data.postcode,
      city: props.data.city,
      email: props.data.email,
      phone: props.data.phone,
    });
   
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    fetch(props.data._links.self.href, { method: 'PUT',
        headers: { "content-type" : "application/json"},
        body: JSON.stringify(customer)
    })
    .then(response => {
        if (!response.ok)
            throw new Error("Error update");

        return response.json();
    })
    .then(() => props.fetchCustomers())
    .catch(err => console.error(err))
    .finally(() => handleClose);
  };
      

  return (
    <>
      <Button size="small" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} 
              onClose={handleClose}
              >

        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
          
            <TextField
               required
               margin="dense"
               name="firstname"
               value={customer.firstname}
               label="Firstname"
               onChange={event => setCustomer({...customer, firstname: event.target.value})}
               fullWidth
               variant="standard"
            />

<TextField
               required
               margin="dense"
               name="lastname"
               value={customer.lastname}
               label="Lastname"
               onChange={event => setCustomer({...customer, lastname: event.target.value})}
               fullWidth
               variant="standard"
            />

<TextField
               required
               margin="dense"
               name="streetaddress"
               value={customer.streetaddress}
               label="Street Address"
               onChange={event => setCustomer({...customer, streetaddress: event.target.value})}
               fullWidth
               variant="standard"
            />
             <TextField
               required
               margin="dense"
               name="postcode"
               value={customer.postcode}
               label="Postcode"
               onChange={event => setCustomer({...customer, postcode: event.target.value})}
               fullWidth
               variant="standard"
            />
             <TextField
               required
               margin="dense"
               name="city"
               value={customer.city}
               label="City"
               onChange={event => setCustomer({...customer, city: event.target.value})}
               fullWidth
               variant="standard"
            />
           <TextField
               required
               margin="dense"
               name="email"
               value={customer.email}
               label="Email"
               onChange={event => setCustomer({...customer, email: event.target.value})}
               fullWidth
               variant="standard"
            />
             <TextField
               required
               margin="dense"
               name="phone"
               value={customer.phone}
               label="Phone"
               onChange={event => setCustomer({...customer, phone: event.target.value})}
               fullWidth
               variant="standard"
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
