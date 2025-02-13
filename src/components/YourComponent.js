import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function YourComponent() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const result = await someApiCall();
        if (mounted) {
          setData(result);
        }
      } catch (error) {
        if (mounted) {
          // Handle error
        }
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      mounted = false;
      // Clean up any DOM elements, event listeners, or subscriptions
      // that might have been created
    };
  }, []);

  // Rest of your component code
} 