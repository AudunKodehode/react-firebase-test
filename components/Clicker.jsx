import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import db from '../firebase'; // Import your Firebase configuration
import './Clicker.css';

function Clicker(props) {
  const [count, setCount] = useState();

  // Reference to the single document
  const docRef = doc(db, 'counts', 'counter');

  // Set up a real-time listener
  useEffect(() => {
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
          setCount(docSnap.data().count);
      }
    });

    // Return a cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);

  // Function to increment the count in Firestore
  const incrementCount = async () => {
    try {
      await setDoc(docRef, { count: count + 1 }); // Update the count in the document
      
    } catch (error) {
      console.error('Error incrementing count:', error);
    }
  };

  return (
    <div className="clicker">
      <h3>{props.header}: {count}</h3>
      <button onClick={incrementCount}>{props.buttontext}</button>
    </div>
  );
}

export default Clicker;
