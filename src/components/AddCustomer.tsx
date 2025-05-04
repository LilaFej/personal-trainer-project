import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Customer } from '../types';



type AddCustomerProps = {
    fetchCustomers: () => void;
  };
  
  export default function AddCustomer(props: AddCustomerProps) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState<Customer>({} as Customer);
  
    const handleClickOpen = () => {
        setOpen(true);
        setCustomer({} as Customer);
    };

    const handleClose = () => {
        setOpen(false);
      };
    


    const addCustomer = () => {
        fetch(import.meta.env.VITE_CUSTOMER_API_URL, {
            method: "POST", 
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(customer)
        })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when adding a new car");
            return response.json;
        })
        .then(() => props.fetchCustomers())
        .then(() => setOpen(false))
        .catch(err => console.error(err))
      }
    return (
      <>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Customer
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Customer</DialogTitle>
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
            <Button onClick={() => addCustomer()}>Save</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }