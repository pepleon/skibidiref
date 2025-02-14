
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const referralRoute = require("./routes/referral")
const sendEmailRoute = require("./routes/sendEmail")
const cors = require('cors');
require("dotenv").config(); 

app.use(express.json());


app.use(cors({
  origin: "https://accredian-frontend-task-lacq.onrender.com",
  credentials: false,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));


app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Express server!' });
});

app.use('/', referralRoute);
app.use('/', sendEmailRoute);



app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});










app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
