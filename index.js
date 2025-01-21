/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(GAMES_JSON) {
  for (const game of GAMES_JSON) {
    // create a new div element, which will become the game card
    const gameCard = document.createElement("div");

    // add the class game-card to the list
    gameCard.classList.add("game-card");

    // set the inner HTML using a template literal to display some info 
    // about each game
    gameCard.innerHTML = `
        <h3>${game.name}</h3>
        <img src="${game.img}" alt="${game.name}" style="width: 100%; height: auto; object-fit: cover;">
        <p>${game.description}</p>
    `;


    // append the game to the games-container
    gamesContainer.appendChild(gameCard);
  }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((total, game) => total + game.backers, 0); 

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = ` ${totalContributions.toLocaleString()}`;


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// calculate total raised using the 'pledged' property
const totalRaised = GAMES_JSON.reduce((total, game) => total + (game.pledged || 0), 0);

// set inner HTML using template literal
raisedCard.innerHTML = ` ${totalRaised.toLocaleString('en-US', { 
    style: 'currency', 
    currency: 'USD', 
    minimumFractionDigits: 0, 
    maximumFractionDigits: 0 
})}`;


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = ` ${GAMES_JSON.length}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
  
    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
  
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
  }
  
  // show only games that are fully funded
  function filterFundedOnly() {
    deleteChildElements(gamesContainer);
  
    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
  
    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);
  }
  
  // show all games
  function showAllGames() {
    deleteChildElements(gamesContainer);
  
    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON); 
  }
  
  // select each button in the "Our Games" section
  const unfundedBtn = document.getElementById("unfunded-btn");
  const fundedBtn = document.getElementById("funded-btn");
  const allBtn = document.getElementById("all-btn");
  
  // add event listeners with the correct functions to each button
  unfundedBtn.addEventListener("click", filterUnfundedOnly);
  fundedBtn.addEventListener("click", filterFundedOnly);
  allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// Grab the description container
const descriptionContainer = document.getElementById("description-container");

// Calculate total amount raised, number of games, and unfunded games
const totalraised = GAMES_JSON.reduce((total, game) => total + (game.pledged || 0), 0);
const totalGames = GAMES_JSON.length;
const numUnfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// Create the detailed message
const unfundedGamesMessage = `A total of $${totalraised.toLocaleString()} has been raised for ${totalGames} games. 
Currently, ${numUnfundedGames} games remain unfunded. We need your help to fund these amazing games!`;

// Create a new <p> element
const unfundedGamesElement = document.createElement('p');
unfundedGamesElement.textContent = unfundedGamesMessage;

// Append the <p> element to the description container
descriptionContainer.appendChild(unfundedGamesElement);

// Return the opening tag of the description container
console.log(descriptionContainer.outerHTML.split('>')[0]);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

// Use destructuring and the spread operator to grab the top two games based on pledged amounts
const [topGame, runnerUpGame] = [...GAMES_JSON].sort((a, b) => b.pledged - a.pledged);

// Create a new element to hold the name of the top pledge game, then append it to the correct element
const topTitle = document.createElement('h3');
topTitle.textContent = topGame.name;
firstGameContainer.appendChild(topTitle);

// Do the same for the runner-up game
const runnerUpTitle = document.createElement('h3');
runnerUpTitle.textContent = runnerUpGame.name;
secondGameContainer.appendChild(runnerUpTitle);