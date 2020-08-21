const express= require('express');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const router = express.Router();
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
});

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

router.get("/pennsylvania", (req,res) => {
	const state = 'pennsylvania';
	db.query('SELECT * FROM reviews WHERE state = ?', [state], async(error, results) =>{
		console.log(results);
		if(results.length == 0) {
			res.render(state)
		} else{
			res.status(200).render('pennsylvania', {
				reviews: results
			});
		}
	})
});

router.get("/maryland", (req,res) => {
	const state = 'maryland';
	db.query('SELECT * FROM reviews WHERE state = ?', [state], async(error, results) =>{
		console.log(results);
		if(results.length == 0) {
			res.render(state)
		} else{
			res.status(200).render(state, {
				reviews: results
			});
		}
	})
});

router.get("/westvirginia", (req,res) => {
	const state = 'westvirginia';
	db.query('SELECT * FROM reviews WHERE state = ?', ["west virginia"], async(error, results) =>{
		console.log(results);
		if(results.length == 0) {
			res.render(state)
		} else{
			res.status(200).render(state, {
				reviews: results
			});
		}
	})
});

module.exports= router;