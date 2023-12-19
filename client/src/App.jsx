import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [age, setAge] = useState('');
  const [batch, setBatch] = useState('');
  const [fullName, setFullName] = useState('');
  const [message, setMessage] = useState('');
  const [pay, setPay] = useState('');
  const batches = [
    'None',
    '6.00 AM TO 7.00 AM',
    '7.00 AM TO 8.00 AM',
    '8.00 AM TO 9.00 AM',
    '5.00 PM TO 6.00 PM',
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    if (age < 18 || age > 65) {
      setMessage('Age must be between 18 and 65');
      return;
    }
    if (!fullName) {
      setMessage('Please enter your full name');
      return;
    }
    if (fullName.trim().length < 3) {
      setMessage('Full name must be at least 3 characters in length');
      return;
    }
    if (!batch || batch === 'None') {
      setMessage('Please select a batch');
      return;
    }
    const data = {
      name: fullName,
      age: age,
      batch: batch,
    };

    axios
      .post('https://yoga-enrollment-form-rho.vercel.app/enroll', data)
      .then(() => {
        setMessage(
          'Enrollment successful!, Please pay Rs.500 to confirm your seat'
        );
      })
      .catch((error) => {
        console.log(error);
        setMessage('There was an error enrolling. Please try again.');
      });
  };
  const handlePayment = async () => {
    try {
      const response = await axios.get(
        'https://yoga-enrollment-form-rho.vercel.app/CompletePayment'
      );
      if (response.data.message) {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage('There was an error with Payment. Please try again.');
    }
  };

  return (
    <div className='App'>
      <h2>Yoga Class Enrollment Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <div className='label-text'>Full Name</div>
          <div className='age-input-container'>
            <input
              type='text'
              placeholder='Enter your Full Name'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
        </label>
        <label>
          <div className='label-text'>Age</div>
          <div className='age-input-container'>
            <input
              className='age-input'
              placeholder='Enter your Age'
              type='number'
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
        </label>
        <label>
          <div className='label-text'>Batch</div>
          <div className='batch-input-container'>
            <select
              className='batch-select'
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
            >
              {batches.map((batch) => (
                <option key={batch} value={batch}>
                  {batch}
                </option>
              ))}
            </select>
          </div>
        </label>
        <div className='button-container'>
          <button type='submit'>Enroll</button>
        </div>
      </form>
      {message && <p>{message}</p>}
      <div className='button-container'>
        {message ===
          'Enrollment successful!, Please pay Rs.500 to confirm your seat' && (
          <button onClick={handlePayment}>Pay</button>
        )}
      </div>
    </div>
  );
}

export default App;
