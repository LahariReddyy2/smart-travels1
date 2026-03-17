 import express from "express";
import { createTrip, getUserTrips, updateTrip } from "../controllers/tripController.js";

const router = express.Router();

router.post("/create", createTrip);
router.get("/mytrips/:email", getUserTrips);
router.put("/update/:id", updateTrip);

export default router;