import  { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import db from '../firebase'; // Import your Firebase configuration

function FirebaseTest() {
  const [count, setCount] = useState(0);

  // Fetch the count from Firestore
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const docRef = doc(db, 'counts', 'counter'); // Reference to the single document
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCount(docSnap.data().count);
        }
      } catch (error) {
        console.error('Error fetching count:', error);
      }
    };
  
    fetchCount();
  }, []);

  // Function to increment the count in Firestore
  const incrementCount = async () => {
    try {
      const docRef = doc(db, 'counts', 'counter'); // Reference to the single document
      await setDoc(docRef, { count: count + 1 }); // Update the count in the document
      setCount(count + 1);
    } catch (error) {
      console.error('Error incrementing count:', error);
    }
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={incrementCount}>Increment</button>
    </div>
  );
}

export default FirebaseTest;