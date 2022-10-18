const express = require("express");
const cors = require("cors"); // Middleware to provide access to another system
const rateLimit = require('express-rate-limit'); // To limit the api request per user

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// RateLimiter Middleware
const limiter = rateLimit({
	windowMs:  60 * 1000, // 1 minutes
	max: 10, // Limit each IP to 10 requests per `window` (here, per 1 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Puspak-AI Api." });
});

require("./app/routes/vehicle.routes")(app);
require("./app/routes/violation.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});