
export const getCustomers = () => {
    return fetch(import.meta.env.VITE_CUSTOMER_API_URL)
      .then(response => {
        if (!response.ok) throw new Error('Error when fetching customers');
        return response.json();
      });
  };
  

  export const deleteCustomers = (url: string) => {
    return fetch(url, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) throw new Error('Error when deleting customer');
        return response.json();
      });
  };
  
 
  export const addCustomer = (customer: any) => {
    return fetch(import.meta.env.VITE_CUSTOMER_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customer),
    }).then(response => {
      if (!response.ok) throw new Error('Error when adding customer');
      return response.json();
    });
  };
  

  

  export const getTrainings = () => {
    return fetch(`${import.meta.env.VITE_TRAINING_API_URL}/gettrainings`)
      .then(response => {
        if (!response.ok) throw new Error('Error when fetching trainings');
        return response.json()
      })

  };

  export const deleteTraining = (id: number) => {
    return fetch(`${import.meta.env.VITE_TRAINING_API_URL}/trainings/${id}`, {
      method: 'DELETE'
    }).then(response => {
      if (!response.ok) throw new Error('Error when deleting training');
    });
  };

  export const addTraining = (training: any) => {
    return fetch(`${import.meta.env.VITE_TRAINING_API_URL}/trainings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(training),
    }).then(response => {
      if (!response.ok) throw new Error('Error when adding training');
      
    });
  };

  