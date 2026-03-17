 import Trip from "../models/Trip.js";


// CREATE TRIP
const createTrip = async (req, res) => {
 try {

  const trip = new Trip(req.body);

  await trip.save();

  res.json({ message: "Trip created successfully" });

 } catch (error) {

  res.status(500).json({ error: error.message });

 }
};


// GET USER TRIPS
const getUserTrips = async (req, res) => {

 try {

  const { email } = req.params;

  const trips = await Trip.find({ userEmail: email });

  res.json(trips);

 } catch (error) {

  res.status(500).json({ error: error.message });

 }

};


// UPDATE TRIP (USED FOR EDIT TRIP)
const updateTrip = async (req, res) => {

 try {

  const { id } = req.params;

  const updatedTrip = await Trip.findByIdAndUpdate(
    id,
    req.body,
    { new: true }
  );

  if (!updatedTrip) {
    return res.status(404).json({ message: "Trip not found" });
  }

  res.json(updatedTrip);

 } catch (error) {

  res.status(500).json({ error: error.message });

 }

};


// EXPORT FUNCTIONS
export { createTrip, getUserTrips, updateTrip };