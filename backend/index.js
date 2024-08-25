const express = require("express");
const cors = require("cors"); // Import cors

const app = express();

// Use cors middleware with default options (allows all origins)
app.use(cors());

app.use(express.json());

app
  .route("/bfhl")
  .get((req, res) => {
    res.status(200).json({ operation_code: 1 });
  })
  .post((req, res) => {
    const data = req.body.data || [];
    const numbers = [];
    const alphabets = [];
    let highest_alphabet = "";

    for (const item of data) {
      if (!isNaN(item)) {
        numbers.push(item);
      } else if (item.length === 1 && isNaN(item)) {
        alphabets.push(item);
        if (
          !highest_alphabet ||
          item.toUpperCase() > highest_alphabet.toUpperCase()
        ) {
          highest_alphabet = item;
        }
      }
    }

    res.json({
      is_success: true,
      user_id: "sanhita17",
      email: "sanhita.kundu2020@vitstudent.ac.in",
      roll_number: "20BEC0215",
      numbers: numbers,
      alphabets: alphabets,
      highest_alphabet: highest_alphabet ? [highest_alphabet] : [],
    });
  });

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
