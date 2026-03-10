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


// DELETE TRIP
const deleteTrip = async (req, res) => {

 try {

  const { id } = req.params;

  await Trip.findByIdAndDelete(id);

  res.json({ message: "Trip deleted successfully" });

 } catch (error) {

  res.status(500).json({ error: error.message });

 }

};


// UPDATE TRIP
const updateTrip = async (req, res) => {

 try {

  const { id } = req.params;

  const updatedTrip = await Trip.findByIdAndUpdate(
    id,
    req.body,
    { new: true }
  );

  res.json(updatedTrip);

 } catch (error) {

  res.status(500).json({ error: error.message });

 }

};


// EXPORT FUNCTIONS
export { createTrip, getUserTrips, deleteTrip, updateTrip };