import 'bootstrap/dist/css/bootstrap.css'
import jokes from "./jokes";

//Get all jokes
const allJokes = jokes.getJokes().map(joke => "<li>" + joke + "</li>");
document.getElementById("jokes").innerHTML = allJokes.join("");

//Get joke by id
document.getElementById("getButton").onclick = function getJoke() {
    var jokeById = document.getElementById("id").value;
    var joke = jokes.getJokeById(jokeById);
    document.getElementById("jokeById").innerHTML = joke;
}

//Add joke
document.getElementById("addButton").onclick = function addJoke() {
    var newJoke = document.getElementById("add").value;
    jokes.addJoke(newJoke);
    document.getElementById("jokeAdded").innerHTML = "Joke has been added successfully.";
    //Get all jokes again
    const allJokes = jokes.getJokes().map(joke => "<li>" + joke + "</li>");
    document.getElementById("jokes").innerHTML = allJokes.join("");
}