const express = require("express");
const app = express();
const path = require("path");
const matchRoutes = require("./routes/matchRoutes"); // Import match routes
require("dotenv").config();
const connectDB = require("./config/db.js");
const PORT = process.env.PORT;
const BookedSeat = require("./models/Bookings.js");
const User = require("./models/User.js");
const Match = require("./models/Match.js");
const profileRoutes = require("./routes/profileRoutes.js");

connectDB();
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, "public")));
   

// Home Route
app.get("/", (req, res) => {
  res.render("Home", {
    title: "Home Page",
    message: "Welcome to my EJS website!",
  });
});
  
// Other Routes
app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/profile", (req, res) => {
  res.render("profile");
});

app.use("/api/auth", require("./routes/userRoutes.js"));
app.use('/user',profileRoutes);


app.get("/matches", (req, res) => {
  res.render("Matches");
});

app.get("/venues", (req, res) => {
  res.render("venues");
});

app.get("/about", (req, res) => {
  res.render("about");
});

// Use the match routes from matchRoutes.js
app.use("/matches", matchRoutes);

app.get("/seating", (req, res) => {
  res.render("seating");
});

app.get("/payment", (req, res) => {
  res.render("payment");
});
 
app.get("/tickets.html", (req, res) => {
  res.render("tickets");
});
   
app.post("/seating", async (req, res) => {
  const matchDetails = req.body;
  console.log(matchDetails);
  try {
    const match = await Match.findOne({ name: matchDetails.name });
    
    if (!match) {
      return res.status(404).send("Match not found");
    }
    
    res.json({ matchId: match._id }); // Send matchId to the frontend
  } catch (e) {
    console.log("Error", e);
    res.status(500).send("Server Error");
  }
});


app.post("/payment", (req, res) => {
  const { selectedSeats, totalAmount, matchDetails } = req.body;

  if (!selectedSeats || !totalAmount) {
    return res.status(400).json({ message: "Invalid request data" });
  }

  // Save booking data to database or process payment here

  console.log("Selected Seats:", selectedSeats);
  console.log("Total Amount:", totalAmount);
  console.log("Match Details:", matchDetails);

  res.json({ message: "Booking successful. Redirecting to payment page..." });
});
 
app.post("/tickets", (req, res) => {
  const { matchDetails } = req.body;
  console.log("Received Match Details:", matchDetails);
  res.status(200).send("Payment Processed Successfully!");
});
 
app.post("/book", async (req, res) => {
  try { 
    const { userId, matchId, selectedSeats } = req.body;
    console.log(req.body);
    if (
      !userId ||
      !matchId ||
      !selectedSeats ||
      !Array.isArray(selectedSeats)
    ) {
      return res.status(400).json({ error: "Invalid request data" });
    }
  
    const bookedSeats = selectedSeats.map((seat) => ({
      userId,
      matchId,
      seatNumber: seat.seatNumber,
      circleType: seat.circleType,
    }));
    await User.findByIdAndUpdate(
      userId,
      { $push: { bookings: { $each: bookedSeats } } },
      { new: true }
    );
    console.log("saved to user"); 
    // Save the booked seats to the database
    await BookedSeat.insertMany(bookedSeats);
    res.status(200).json({ message: "Booking successful" });
  } catch (error) {
    console.error("Error during booking:", error.message);
    
    res.status(500).json({ error: "Internal Server Error" });
  }
});
  
 
// Route to fetch booked seats based on matchId
app.get('/booked-seats', async (req, res) => {
  const { matchId } = req.query;

  try {
    if (!matchId) {
      return res.status(400).json({ error: 'matchId is required.' });
    }

    const bookedSeats = await BookedSeat.find({ matchId });
    res.status(200).json(bookedSeats);
  } catch (error) {
    console.error('Error fetching booked seats:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


 

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
