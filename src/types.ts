export type Customer = Omit<CustomerData, "_links">;
export type Training = Omit<TrainingData, "_links">;

export type CustomerData = {
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
    _links: {
      self: { href: string };
      customer: { href: string };
    };
  };
  
  export type TrainingData = {
    date: string;
    activity: string;
    duration: number;
    customer: Customer;
      
    
  };
  