const mysql=require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
});

exports.trailreview = (req,res) => {
	console.log(req);
	
	const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const state = req.body.state;
    const subject = req.body.subject;
	
	db.query('INSERT INTO reviews SET ? ', {firstname: firstname, lastname: lastname, state:state, subject:subject}, (error, results)=> {
        if(error) {
            console.log(error);
        } else {
            console.log(results);
            return res.render('trailreview', {
                message: 'Review submitted.'
          });
     }
    });
}