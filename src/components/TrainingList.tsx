import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, ColDef, themeMaterial, ICellRendererParams} from "ag-grid-community";
import { Button, Snackbar } from '@mui/material';
import { getTrainings, deleteTraining } from '../api';

import DeleteIcon from '@mui/icons-material/Delete';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Training } from '../types';
import AddTraining from './AddTraining';

ModuleRegistry.registerModules([AllCommunityModule]);

export default function TrainingList() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [open, setOpen] = useState(false);

  const [columnDefs] = useState<ColDef<Training>[]>([
    { field: 'activity', filter: true, width: 200 },
    { field: 'date', filter: true, width: 200, valueFormatter: params => new Date(params.value).toLocaleString() },
    { field: 'duration', filter: true, width: 200 },
    { 
      headerName: 'Customer',
      field: 'customer',
      valueFormatter: params => params.value?.firstname + ' ' + params.value?.lastname,
      width: 200
    },
    {
      width: 300,
      cellRenderer: (params: ICellRendererParams) => 
        <Button
          size="small"
          color="error"
          variant="outlined"
          startIcon={<DeleteIcon fontSize="small" sx={{ color: 'error.main' }} />}
          onClick={() => handleDelete(params)}
        >
          Delete
        </Button>
    }
  ]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    getTrainings()
      .then(data => setTrainings(data))
      .catch(err => console.error(err));
  };

  const handleDelete = (params: ICellRendererParams) => {
    if (window.confirm('Are you sure?')) {
      deleteTraining(params.data.id)
        .then(() => fetchTrainings())
        .then(() => setOpen(true))
        .catch(err => console.error(err));
    }
  };

  

  return (
    <>
    <AddTraining fetchTrainings={fetchTrainings}/>
      <div className="ag-theme-material" style={{ height: 500, width: '100%' }}>
        <AgGridReact
          rowData={trainings}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          suppressCellFocus={true}
        />
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message="Training deleted successfully"
      />
    </>
  );
}
