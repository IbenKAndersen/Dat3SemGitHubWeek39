//Tuesday Exercises

//Ex 1.a) 
//Use the filter method to create a new array with only names that contains the letter ‘a’
var names = ["Lars", "Jan", "Peter", "Bo", "Frederik"];
function witha(name) {
    if (name.includes('a'))
        return name;
}
//console.log(names.filter(witha));//works

//Ex 1.b 
//Use the names-array created above, and, using its map method, create a new array with all names reversed.
function reverse(name) {
    return name.split('').reverse().join('');
}
//console.log(names.map(reverse));//works

//Ex 2.a
//Implement a function that providess the same functionality as calling the existing filter method on an array.
function myFilter(array, callback) {
    var filtered = [];
    array.forEach(element => {
        if (!(callback(element) == undefined)) { //so that the function does not add undefined elements
            filtered.push(callback(element));
        }
    });
    return filtered;
}
//console.log(myFilter(names, witha));//works

//Ex 2.b
//Implement a function that provides the same functionality as calling the existing map method on an array.
function myMap(array, callback) {
    var mapped = [];
    array.forEach(element => {
        if (!(callback(element) == undefined)) { //so that the function does not add undefined elements
            mapped.push(callback(element));
        }
    });
    return mapped;
}
//console.log(myMap(names, reverse));//works

//Ex 3
//Create a new version of the two functions (without the array argument) which you should add to the Array prototype property
//Adding myFilter to Array prototype property
Array.prototype.myFilter = function (callback) {
    var filtered = [];
    this.forEach(element => { //using this
        if (!(callback(element) == undefined)) { //so that the function does not add undefined elements
            filtered.push(callback(element));
        }
    });
    return filtered;
}
//console.log(names.myFilter(witha));//works

//Adding myMap to Array prototype property
Array.prototype.myMap = function (callback) {
    var mapped = [];
    this.forEach(element => { //using this
        if (!(callback(element) == undefined)) { //so that the function does not add undefined elements
            mapped.push(callback(element));
        }
    });
    return mapped;
}
//console.log(names.myMap(reverse));//works

//Ex 4.a
//Use map and callback to map numbers array into result array
var numbers = [1, 3, 5, 10, 11];
var result = [4, 8, 15, 21, 11];
function addnext(element, index, array) {
    if (index < array.length - 1)
        return element + array[index + 1];
    else return element;
}
//console.log(numbers.map(addnext));//works

//Ex 4.b
//Use map to create a navigation set 
var html = names.map(name => "<a href=\"\">" + name + "</a>");
html.join(""); //reduces array to single String
html.unshift("<nav>"); //adds element to start of array
html.push("</nav>"); //adds element to end of array
//console.log(html);//works

//Ex 4.c
//Use map and join to create a String representing a two column table
var persons = [
    { name: "Lars", phone: "1234567" }, { name: "Peter", phone: "675843" },
    { name: "Jan", phone: "98547" }, { name: "Bo", phone: "79345" }
];
const td = persons
    .map(el => "\n<tr><td>" + el.name + "</td><td>" + el.phone + "</td></tr>")
    .join("");
const htmlTable = 
    "<table>\n<tr><th> Name </th><th> Phone </th></tr>" + td + "\n</table";
//console.log(htmlTable);//works

//Ex 4.d
//Create a single html-file and test the examples
//document.getElementById("names").innerHTML = html;//works
//document.getElementById("names").innerHTML = makeTable(names);//works

//Ex 4.e
//Add a button with a click-handler and use the filter method to find only names containing the letter 'a'
//document.getElementById("button").onclick = witha(names);

//Ex 5.a 
// Use join to create a single string from all , with names: comma-, space. and # - separated
var all = ["Lars", "Peter", "Jan", "Bo"];
//console.log(all.join(","));//works
//console.log(all.join(" "));//works
//console.log(all.join("#"));//works

//Ex 5.b
//Create a reducer callback that, with reduce(..), will return the sum (105) of all values in numbers
var numbers = [2, 3, 67, 33];
function getSum(total, number) {
    return total + number;
}
//console.log(numbers.reduce(getSum,0));//works, reduces the array to a single value

//Ex 5.c
//Create a reducer callback that, using the Array’s reduce() method, will return the average age of all members
var members = [
    { name: "Peter", age: 18 },
    { name: "Jan", age: 35 },
    { name: "Janne", age: 25 },
    { name: "Martin", age: 22 }
];
const avg = members.reduce((acc, p, idx, arr) => {
    //console.log('idx', idx, 'acc', acc, 'p.age', p.age);//works
    if (idx === arr.length - 1)
        return (acc + p.age) / arr.length;
    return acc + p.age;
}, 0);
//console.log(avg);//works
//acc is the accumulator, the start value is declared ...,0 in the end of the method
//p is the element
//idx is the index
//arr is the array 

//Ex 5.d
//Create a reduce function, that will return a single object with counted votes for the presidential election in USA.
var votes = ["Clinton", "Trump", "Clinton", "Clinton", "Trump", "Trump", "Trump", "None"];
const numberOfVotes = votes.reduce((acc, el) => {
    if (acc[el]) //if the element is defined (truthy) then it counts
        acc[el]++;
    else
        acc[el] = 1;
    return acc;
}, {});
console.log(numberOfVotes);