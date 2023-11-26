import { useState, useEffect } from 'react';


function useApiRequest(url, method, headers)  {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [update, setUpdate] = useState(true)

  const updateListHandler = (value) => {
    setUpdate(value)
  }


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url,
            {
              method,
              headers: {
               ...headers,
                "Content-Type": "application/json",
              },
            });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const jsonData = await response.json();
        const message = await jsonData.message;
        
         setData(message)
          console.log("pending-transactions", message)
     
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
  
 

fetchData();
}, 
[url, update]);

return { data, isLoading, error, updateListHandler, update };
}

export default useApiRequest;

