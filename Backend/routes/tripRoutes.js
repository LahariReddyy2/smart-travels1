 import express from "express";

import {
createTrip,
getUserTrips,
deleteTrip,
updateTrip
} from "../controllers/tripController.js";

const router = express.Router();

router.post("/create", createTrip);

router.get("/mytrips/:email", getUserTrips);

router.delete("/delete/:id", deleteTrip);

router.put("/update/:id", updateTrip);

export default router;