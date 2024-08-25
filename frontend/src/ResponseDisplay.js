import React, { useState } from 'react';

function ResponseDisplay({ response, selection, setSelection }) {
  const handleSelectChange = (e) => {
    const options = e.target.options;
    const selected = [];

    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }

    setSelection(selected);
  };

  const filteredResponse = () => {
    const displayData = {};
    if (selection.includes('Alphabets')) displayData.alphabets = response.alphabets;
    if (selection.includes('Numbers')) displayData.numbers = response.numbers;
    if (selection.includes('Highest lowercase alphabet'))
      displayData.highest_lowercase_alphabet = response.highest_lowercase_alphabet;

    return displayData;
  };

  return (
    <div>
      <select multiple={true} onChange={handleSelectChange}>
        <option value="Alphabets">Alphabets</option>
        <option value="Numbers">Numbers</option>
        <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
      </select>

      <h3>Response:</h3>
      <pre>{JSON.stringify(filteredResponse(), null, 2)}</pre>
    </div>
  );
}

export default ResponseDisplay;
