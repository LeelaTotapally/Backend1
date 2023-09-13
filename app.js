const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a Mongoose Schema for storing names
const nameSchema = new mongoose.Schema({
  name: String,
});

const Name = mongoose.model('Name', nameSchema);

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Route to add a name to the database
app.post('/names', async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const newName = new Name({ name });
    await newName.save();

    res.status(201).json({ message: 'Name added successfully', data: newName });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
