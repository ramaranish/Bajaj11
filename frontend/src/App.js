import React, { useState } from 'react';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selection, setSelection] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSelection([]);

    try {
      const sanitizedInput = jsonInput.replace(/'/g, '"');
      const parsedInput = JSON.parse(sanitizedInput);

      const response = await fetch('http://localhost:8080/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedInput),
      });

      const result = await response.json();
      setResponse(result);
    } catch (error) {
      setError('Invalid JSON format');
      console.error('Error:', error);
    }
  };

  const handleSelectionChange = (e) => {
    const { options } = e.target;
    const selected = [];
    for (const option of options) {
      if (option.selected) {
        selected.push(option.value);
      }
    }
    setSelection(selected);
  };

  const renderResponse = () => {
    if (!response) return null;
    
    const { numbers, alphabets, highest_lowercase_alphabet } = response;

    return (
      <div>
        {selection.includes('Numbers') && <p>Numbers: {JSON.stringify(numbers)}</p>}
        {selection.includes('Alphabets') && <p>Alphabets: {JSON.stringify(alphabets)}</p>}
        {selection.includes('Highest lowercase alphabet') && highest_lowercase_alphabet &&
          <p>Highest Lowercase Alphabet: {JSON.stringify(highest_lowercase_alphabet)}</p>}
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ABCD123</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            rows="5"
            cols="50"
            placeholder='Enter JSON here...'
          />
          <br />
          <button type="submit">Submit</button>
        </form>
        {error && <p className="error">{error}</p>}
        <select multiple onChange={handleSelectionChange}>
          <option value="Alphabets">Alphabets</option>
          <option value="Numbers">Numbers</option>
          <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
        </select>
        {renderResponse()}
      </header>
    </div>
  );
}

export default App;
