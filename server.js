const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials'); //__dirname is absolute path.
app.set('view engine', 'hbs'); //key value pair
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = (`${now}: ${req.method} ${req.url}`);
	console.log(log);
	fs.appendFile('Server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log');
		}
	});
	next(); //necessary or nothing else works.
});


// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	// res.send('<h1>Hello Express!</h1>'); //this sends HTML to browser.
	res.render('main.hbs', {
		pageTitle: 'Welcome to the homepage!',
		message: 'This is a page rendered with Express and handlebars!',
	});
}); //This sends json data to browser

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: "About Page",
	});
}); //This sets a new page in browser localHost:3000/about

app.get('/bad', (req, res) => {
	res.send({
		dude: 'Bad request',
		resend: [
		"Make new request", 
		"Try something else"]
	})
}); // localHost:3000/bad

//These are all new urls.

app.listen(3000, () => {
	console.log('Server is up on port 3000');
});