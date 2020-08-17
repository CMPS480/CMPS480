const express= require('express');
const reviewController= require('../controllers/review');
const router = express.Router();

router.post("/trailreview", reviewController.trailreview);
   

module.exports= router;