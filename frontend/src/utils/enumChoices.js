// src/hooks/useEnumChoices.js
import { useEffect, useState } from 'react';
import { useApiRequest } from '../context/ApiRequestContext';

export const useEnumChoices = () => {
  const { request } = useApiRequest();
  const [enums, setEnums] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  
  useEffect(() => {
    const fetchEnums = async () => {
      try {
        const res = await request('http://localhost:8000/api/forms/get/enums/', {
          method: 'GET'
        });

        if (!res || !res.ok) {
          throw new Error('Failed to fetch enum choices');
        }

        const data = await res.json();
        setEnums(data);
      } catch (err) {
        console.error("Enum fetch error:", err);
        setError(err.message); // Optional
      } finally {
        setLoading(false);
      }
    };

    fetchEnums();
  }, [request]);

  return { enums, loading, error }; 
};
