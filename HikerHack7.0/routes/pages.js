const express= require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get("/",(req,res) => {
    res.render("index");
});

router.get("/register",(req,res) => {
    res.render("register");
});

router.get("/login",(req,res) => {
    res.render("login");
});

router.get("/trailreview", (req,res) => {
	const token = req.cookies.jwt;
	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if(err) return res.status(401).render('trailreview', {
			message: 'Please log in to post a review',
		})
		
		return res.render('trailreview', {
			name: user.name
		})
	})
});

router.get("/home", (req,res) => {
	res.render("home");
});

module.exports= router;