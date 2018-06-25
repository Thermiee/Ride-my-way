const Joi = require('joi');
const express = require('express');
const bodyParser =  require('body-parser');
const rides = require('./models/rides.js');

const app = express();
app.use(bodyParser.json());

function validateride (ride) {
	const schema = {
		name: Joi.string().min(3).required()
	};
	return Joi.validate(ride, schema);
};

app.get('/', (req, res) => {
	res.status(200).json({
		message: 'Ride my way API'
	});
});

app.get('/api/rides', (req, res) => {
	res.send(rides);
});


app.get('/api/rides/:id', (req, res) => {
	const ride = rides.find(r => r.id === parseInt(req.params.id));
	if (!ride) return res.status(404).send("The ride you're looking for is not available");
	res.send(ride)
});

app.post('/api/rides', (req, res) => {
	// validate
	const { error } = validateride(req.body); 

	// if invalid return 400
	if (error) return res.status(400).send(error.details[0].message); //400 Bad ride
	const ride = {
		id: rides.length + 1,
		name: req.body.name
	};
	rides.push(ride);
	res.send(ride);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));