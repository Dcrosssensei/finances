import React, { createContext, useEffect, useState } from 'react';
import { ProductTypes } from '../models';

interface RecordContextState {
  records: ProductTypes[];
  loading: boolean;
  reloadRecords: () => void;
}

const initialState: RecordContextState = {
  records: [],
  loading: true,
  reloadRecords: () => {}
};

export const RecordContext = createContext<RecordContextState>(initialState);

export const RecordProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3002/bp/products');
      const data = await response.json();
      setState(prevState => ({
        ...prevState,
        records: data.data,
        loading: false
      }));
    } catch (error) {
      setState(prevState => ({
        ...prevState,
        records: [],
        loading: false
      }));
      console.log('Error fetching records:', error);
    }
  };

  const reloadRecords = () => {
    fetchData();
  };

  return (
    <RecordContext.Provider value={{ ...state, reloadRecords }}>
      {children}
    </RecordContext.Provider>
  );
};
