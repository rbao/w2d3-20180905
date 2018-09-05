const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middlewares
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

const drinkDatabase = [
  { id: '99', name: 'Coffee', price: '$2' },
  { id: '78', name: 'Coke', price: '$1' }
];

// Home Page
app.get('/', (req, res) => {
  res.render('index');
});

// List all drinks
app.get('/drinks', (req, res) => {
  res.render('drinks/index', { drinks: drinkDatabase });
});

// Display the form for creating new drink
app.get('/drinks/new', (req, res) => {
  res.render('drinks/new');
});

// Create a new drink
app.post('/drinks', (req, res) => {
  // 1. Get the form information
  let newDrink = req.body;

  // 2. Append the drink to the database
  drinkDatabase.push(newDrink);

  // 3. Render something
  // .redirect does 3 things:
  //   1. Sets the status code of the response to 300 level
  //   2. Sets the response header 'Location' to the path you pass in
  //   3. Sends the request back to the client
  res.redirect('/drinks');
});

// Display the form for editing existing drink
app.get('/drinks/:id/edit', (req, res) => {
  let targetId = req.params.id;

  let targetDrink = drinkDatabase.find(function(drink) {
    return drink.id === targetId;
  })

  res.render('drinks/edit', { drink: targetDrink });
});

// Update existing drink
app.post('/drinks/:id', (req, res) => {
  let targetId = req.params.id;

  let targetDrink = drinkDatabase.find(function(drink) {
    return drink.id === targetId;
  })

  targetDrink.name = req.body.name
  targetDrink.price = req.body.price

  res.redirect('/drinks');
});

// Delete existing drink
app.post('/drinks/:id/delete', (req, res) => {
  let targetId = req.params.id;

  let targetDrink = drinkDatabase.find(function(drink) {
    return drink.id === targetId;
  })

  let targetIndex = drinkDatabase.indexOf(targetDrink)
  drinkDatabase.splice(targetIndex, 1);

  res.redirect('/drinks');
});

// Start the server
const PORT = 3000;
app.listen(PORT, function() {
  console.log(`app listening on port ${PORT}!`);
});
