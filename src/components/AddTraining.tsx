import { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { addTraining, getCustomers } from '../api';
import dayjs from 'dayjs';

export default function AddTraining({ fetchTrainings }: { fetchTrainings: () => void }) {
  const [open, setOpen] = useState(false);
  const [customers, setCustomers] = useState<any[]>([]); 
  const [training, setTraining] = useState({
    date: dayjs().format('YYYY-MM-DDTHH:mm'),
    activity: '',
    duration: '',
    customer: ''
  });

  const handleClickOpen = () => {
    getCustomers()
      .then(data => {
        setCustomers(data._embedded.customers);
        setOpen(true);
      })
      .catch(err => console.error(err));
  };

  const handleClose = () => setOpen(false);

  const handleAddTraining = () => {
    if (!training.customer) {
      alert("Please select a customer");
      return;
    }

    addTraining(training)
      .then(response => {
        if (!response.ok) throw new Error("Error when adding a training");
        return response.json();
      })
      .then(() => fetchTrainings())
      .then(() => setOpen(false))
      .catch(err => console.error(err));
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
          <TextField
            type="datetime-local"
            margin="dense"
            label="Date"
            fullWidth
            variant="standard"
            value={training.date}
            onChange={e => setTraining({ ...training, date: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Activity"
            fullWidth
            variant="standard"
            value={training.activity}
            onChange={e => setTraining({ ...training, activity: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Duration (min)"
            fullWidth
            variant="standard"
            value={training.duration}
            onChange={e => setTraining({ ...training, duration: e.target.value })}
          />
          <FormControl fullWidth variant="standard" margin="dense">
            <InputLabel>Customer</InputLabel>
            <Select
              value={training.customer}
              onChange={(e) => setTraining({ ...training, customer: e.target.value })}
            >
              {customers.map(cust => (
                <MenuItem key={cust._links.self.href} value={cust._links.self.href}>
                  {cust.firstname} {cust.lastname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddTraining}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
