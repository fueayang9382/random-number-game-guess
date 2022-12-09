$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!")
  $('#theSubmitButton').on('click', handleGuessInput)
  $('#resetButton').on('click', resetGame)


}

function handleGuessInput() {
  console.log('button was clicked');
  let guessOne= $('#guessOne').val();
  let guessTwo= $('#guessTwo').val();
  let guessThree= $('#guessThree').val();

  let newPlayersGuesses ={
    playerOne: guessOne,
    playerTwo: guessTwo,
    playerThree: guessThree
  }
  postGuessesInput(newPlayersGuesses);
  getGuesses();
  renderResults();
  indicateRound();
}


function postGuessesInput(newPlayersGuesses) {
  $.ajax({
    url: '/playersGuesses',
    method: 'post', // send the data to the server
    data: newPlayersGuesses
  }).then((res) => { //puts the server message in the browers console
    console.log(res);
  })
}

function getGuesses(){
  $.ajax({
    url: '/playersGuesses',
    method: 'GET', // send the data to the server
  }).then((res) => { //puts the server message in the browers console
    console.log(res);
    $('#guessHistory').empty();
    for (let number of res) {
    $('#guessHistory').append( `
      <tr>
        <td>${number.playerOne}</td>
        <td>${number.playerTwo}</td>
        <td>${number.playerThree}</td>
      </tr>
      `)
    }
    })
  }

function renderResults(){
  $.ajax({
    url: '/guessResults',
    method: 'GET', // send the data to the server
  }).then((res) => {
    $('#guessResults').empty();
    for (let history of res)
    $('#guessResults').append( `
      <td>${history}</td>
    `)
    console.log(res);
  })
}


function resetGame() {
  $.ajax({
    url: '/resetFunction',
    method: 'get', // send the data to the server
  }).then((res) => {
    console.log('enptied arrays and got a new random number')
  })
  getGuesses();
  $('#guessResults').empty();
}

function indicateRound() {
  $.ajax({
    url: '/indicateRound',
    method: 'get',
  }).then((res) => {
    $('#roundNumber').empty();
    $('#roundNumber').text('${res}');
  })
}


