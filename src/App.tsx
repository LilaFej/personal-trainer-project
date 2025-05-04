import { CssBaseline, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useState } from 'react';
import Container from '@mui/material/Container';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import TrainingCalendar from './components/TrainingCalendar';
import Statistics from "./components/Statistics";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InsertChartIcon from '@mui/icons-material/InsertChart';


function App() {
  const [page, setPage] = useState('customers');

  return (
    <Container>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 2 }}>
            Personal Trainer
          </Typography>
          <Button color="inherit" onClick={() => setPage("customers")} startIcon={<PeopleAltIcon />}>
  Customers
</Button>
<Button color="inherit" onClick={() => setPage("trainings")} startIcon={<FitnessCenterIcon />}>
  Trainings
</Button>
<Button color="inherit" onClick={() => setPage("calendar")} startIcon={<CalendarMonthIcon />}>
  Calendar
</Button>
<Button color="inherit" onClick={() => setPage("statistics")} startIcon={<InsertChartIcon />}>
  Statistics
</Button>
        </Toolbar>
      </AppBar>


      {page === 'customers' && <CustomerList />}
      {page === 'trainings' && <TrainingList />}
      {page === 'calendar' && <TrainingCalendar />}
      {page === "statistics" && <Statistics />}
    </Container>
  );
}

export default App;
