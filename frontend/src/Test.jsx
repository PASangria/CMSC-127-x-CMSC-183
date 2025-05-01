import { useEffect } from 'react';

function Test() {
  useEffect(() => {
    fetch('http://localhost:8000/api/test/')
      .then(response => response.json())
      .then(data => console.log('Django says:', data))
      .catch(error => console.error('Error connecting to Django:', error));
  }, []);

  return <div>Check the console for Django connection status.</div>;
}

export default Test;
