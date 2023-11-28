const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection without deprecated options
mongoose.connect('mongodb+srv://zahid:abcd1234@Cluster0.4iybdst.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

// Define indexes
userSchema.index({ username: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/register', async (req, res) => {
  const { userName, userPassword, userConfirmPassword } = req.body;

  if (userPassword !== userConfirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const existingUser = await User.findOne({ username: userName });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const user = await User.create({ username: userName, password: userPassword });
    res.status(201).json({ message: 'Registration successful', user });
  } catch (error) {
    res.status(400).json({ message: 'Registration failed', error: error.message });
  }
});

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'register.html');
  res.sendFile(filePath);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
