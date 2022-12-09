let playersGuesses = [];

//declare random number as global variable
let serverNumber = randomNumber(1, 25);

//store results
let resultsArray = [];

console.log(serverNumber);

// player comparison function
// take a player parameter and runs it through some comparisons
// returns a result of correct, too high, or too low
function playerCompare(player, serverNumber){
  if (Number(player) < serverNumber){
    return 'too low';
  } else if (Number(player) > serverNumber){
    return 'too high';
  } else {
    return 'correct';
  }
}
//  console.log(playersGuesses[playersGuesses.length-1].playerOne)

// array comparison function
// takes the array.length -1 as a parameter and feeds its properties into
// player comparison function
// also stores all comparison results as an array
function compareAllGuesses(lastObjectInArray){
  let playerNumbers = playersGuesses[playersGuesses.length-1];
  let result1 = playerCompare(playerNumbers.playerOne, serverNumber);
  let result2 = playerCompare(playerNumbers.playerTwo, serverNumber);
  let result3 = playerCompare(playerNumbers.playerThree, serverNumber);
  resultsArray.push(result1);
  resultsArray.push(result2);
  resultsArray.push(result3);
  return resultsArray;
}

// console.log(compareAllGuesses(playersGuesses[playersGuesses.length -1]));

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here
function randomNumber(min, max){
  return Math.floor(Math.random() * ( 1 + max - min) + min )
}

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})


app.post('/playersGuesses', (req, res) => {
  console.log('post/playersGuesses');
  playersGuesses.push(req.body);
  res.sendStatus(201); //tells client the array was created
})

app.get('/playersGuesses', (req, res) => {
  console.log('get/playersGuesses');
  res.send(playersGuesses); //tells client the array was created
})

app.get('/resetFunction', (req, res) => {
  serverNumber = randomNumber(1, 25);
  playersGuesses = []
  resultsArray =[]
  res.send(console.log('reset game'));
})

app.get('/indicateRound', (req, res)=> {
  res.send(playersGuesses.length);
})

app.get('/guessResults', (req,res) =>{
  console.log('it sent!');
  res.send(compareAllGuesses(playersGuesses[playersGuesses.length -1]))
})