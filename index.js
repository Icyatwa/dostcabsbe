const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database')
const http = require('http');
const socketIo = require('socket.io');

const userRoutes = require('./routes/user');
const busRoutes = require('./routes/bus')
const rideRoutes = require('./routes/ride')
const busDetailsRoutes = require('./routes/busDetails');
const bookingRoutes = require('./routes/bookingRoutes');

// express app
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use('/api', userRoutes);
app.use('/api/cabs', busRoutes)
app.use('/api/taxis', rideRoutes)
app.use('/api/cabdetails', busDetailsRoutes)
app.use('/api/cabbookings', bookingRoutes)

// connect to db
const server = http.createServer(app);
const io = socketIo(server);

module.exports.io = io;
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });