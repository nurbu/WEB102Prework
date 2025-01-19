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
function addGamesToPage(games) {

    // loop over each item in the data
    for(let i =0; i<games.length;i++){
        const gameCard = document.createElement('div');
        gameCard.classList.add('games-card');
        gameCard.innerHTML = `<h1>${games[i].name}</h1>
        <h3>${games[i].description}</h3>
        <img src="${games[i].img}" class="game-img">`;
        gamesContainer.appendChild(gameCard);
    }

}

addGamesToPage(GAMES_JSON);



/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

const totalcontributioner = GAMES_JSON.reduce((sum,games) =>{
    return sum+games.backers;      
    },0);
contributionsCard.innerHTML =`<h2>${totalcontributioner}</h2>`




const raisedCard = document.getElementById("total-raised");
const totalcontributions = GAMES_JSON.reduce((sum,games) =>{
    return sum+games.pledged;      
    },0);
let englishsum = totalcontributions.toLocaleString('en-US');
raisedCard.innerHTML =`<h2>$${englishsum}</h2>`


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const gameslength =  GAMES_JSON.reduce((count,game)=>{return count+1;},0);
gamesCard.innerHTML =`<h2>${gameslength}</h2>`

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let gamesgoalnotreached = GAMES_JSON.filter((game)=>{
        return game.goal>game.pledged;
    });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(gamesgoalnotreached);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    let gamesgoalreached = GAMES_JSON.filter((game)=>{
        return game.goal<=game.pledged;
    });


    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(gamesgoalreached);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener('click',filterUnfundedOnly);
fundedBtn.addEventListener('click',filterFundedOnly);
allBtn.addEventListener('click',showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

let unfundedgamelen = GAMES_JSON.reduce((lengame,game)=>{
    return game.pledged<game.goal ? lengame+1: lengame;
},0);

let fundedgamelen = GAMES_JSON.reduce((lengame,game)=>{
    return game.pledged>=game.goal ? lengame+1: lengame;
},0);



const displayStr =`A total of $${totalcontributions} has been raised for ${fundedgamelen} games. 
Currently,${unfundedgamelen} game remains unfunded. We need your help to fund these ammazing games!`;


// create a new DOM element containing the template string and append it to the description container
const description = createElement('p');
description.innerHTML = displayStr;
descriptionContainer.appendChild(description);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
    return item2.pledged - item1.pledged;
});

console.log("hello"); // logging to the console instead of print

// Use destructuring and the spread operator to grab the first and second games
const [firstgame, secondgame] = sortedGames;

// Create div elements for first and second games
const firstgameword = document.createElement("div");
const secondgameword = document.createElement("div");

firstgameword.innerHTML = `<p>${firstgame.name}</p>`;
secondgameword.innerHTML = `<p>${secondgame.name}</p>`;

firstGameContainer.appendChild(firstgameword);
secondGameContainer.appendChild(secondgameword);


// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item