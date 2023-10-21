import  { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import db from '../firebase'; // Import your Firebase configuration
import "./Clicker.css";
function Clicker() {
  const [count, setCount] = useState("laster");

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
    <div className="clicker">
      <p>Antall klikk: {count}</p>
      <button onClick={incrementCount}>Klikk</button>
    </div>
  );
}

export default Clicker;