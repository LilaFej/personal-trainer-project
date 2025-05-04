import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, ColDef, ICellRendererParams } from 'ag-grid-community';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import { getCustomers, deleteCustomers } from '../api.ts';
import DeleteIcon from '@mui/icons-material/Delete';
import { CSVLink } from 'react-csv';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

ModuleRegistry.registerModules([AllCommunityModule]);

export default function CustomerList() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const [columnDefs] = useState<ColDef[]>([
    { field: 'firstname', filter: true, width: 100 },
    { field: 'lastname', filter: true, width: 100 },
    { field: 'streetaddress', filter: true, width: 150 },
    { field: 'postcode', filter: true, width: 98 },
    { field: 'city', filter: true, width: 150 },
    { field: 'email', filter: true, width: 200 },
    { field: 'phone', filter: true, width: 150 },
    {
      width: 70,
      cellRenderer: (params: ICellRendererParams) => (
        <EditCustomer data={params.data} fetchCustomers={fetchCustomers} />
      )
    },
    {
      width: 120,
      cellRenderer: (params: ICellRendererParams) => (
        <Button
          size="small"
          color="error"
          variant="outlined"
          startIcon={<DeleteIcon fontSize="small" sx={{ color: 'error.main' }} />}
          onClick={() => handleDelete(params)}
        >
          Delete
        </Button>
      )
    }
  ]);

  const csvHeaders = [
    { label: 'First Name', key: 'firstname' },
    { label: 'Last Name', key: 'lastname' },
    { label: 'Street Address', key: 'streetaddress' },
    { label: 'Postcode', key: 'postcode' },
    { label: 'City', key: 'city' },
    { label: 'Email', key: 'email' },
    { label: 'Phone', key: 'phone' }
  ];

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    getCustomers()
      .then((data) => setCustomers(data._embedded.customers))
      .catch((err) => console.error(err));
  };

  const handleDelete = (params: ICellRendererParams) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      deleteCustomers(params.data._links.self.href)
        .then(() => fetchCustomers())
        .then(() => setOpen(true))
        .catch((err) => console.error(err));
    }
  };

  return (
    <>
      <div style={{ display: 'flex', gap: '10px', margin: '10px 0' }}>
  <AddCustomer fetchCustomers={fetchCustomers} />
  <Button variant="contained">
    <CSVLink
      data={customers}
      headers={csvHeaders}
      filename="customers.csv"
      style={{ color: 'white', textDecoration: 'none' }}
    >
      Export Customers
    </CSVLink>
  </Button>
</div>

      <div className="ag-theme-material" style={{ height: 500, width: '100%' }}>
        <AgGridReact
          rowData={customers}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoPageSize={true}
        />
      </div>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message="Customer deleted successfully"
      />
    </>
  );
}
