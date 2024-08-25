import React, { useState } from 'react';

function JsonInput({ setResponse, setSelection }) {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSelection([]);

    try {
      const parsedInput = JSON.parse(jsonInput);

      const response = await fetch('http://localhost:8080/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedInput),
      });

      const result = await response.json();
      console.log(result)
      setResponse(result);
    } catch (error) {
      setError('Invalid JSON format');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="10"
          cols="50"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Enter JSON like { "data": ["A", "C", "z"] }'
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default JsonInput;
