import { useState } from 'react';

const PriceForm = ({ onSubmit }) => {
  const [course, setCourse] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ course, amount });
    setCourse('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Price</h2>
      <input
        type="text"
        placeholder="Course"
        value={course}
        onChange={e => setCourse(e.target.value)}
        required
      />
      <br />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        required
      />
      <br />
      <button type="submit">Add Price</button>
    </form>
  );
};

export default PriceForm;