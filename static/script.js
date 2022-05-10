/* GET THE HTML ELEMENTS */
// $.removeCookie("user-verify-cookie", {
//     path: "/",
// })

//find the guess button
guess_btn = document.querySelector("#guess-btn")

//find the guess input element
let guess_input = document.querySelector("#guess");

//find the message element
let message = document.querySelector("#message");

//find the icon image element
let icon = document.querySelector("#icon");

/* DEFINE THE FUNCTIONS */

//write a function that generates a random number between 1-100
// Reference:  https://www.w3schools.com/js/js_random.asp

function getRandNum(){
    //ADD CODE HERE
    //the function should return the random number
  // Returns a random integer from 1 to 100:
  return Math.floor(Math.random() * 100) + 1;
}

//this function takes a number and compares it to the user input
function compareNums () {

    //convert user input value to a number and assign it to a variable
    let guess = Number(guess_input.value);

    $.get("/guess",{
      guess: guess
    }, function(guess){
      //check to see if the input is a number
      if (guess=="no type"){
        console.log("It's not a number!")
        //if NaN (not a number) is true display this message
        message.innerHTML = ("Please input a number!");

      //change the src of the icon to show the thumbs down image
      icon.src = "/static/img/hand_thumbs_down.png";

      //if it is a number, first check if number is between 1 and 100
    } else if (guess=="no range"){
      //if it's not in the range, display this message
      console.log("Please input a number between 1-100!");

      message.innerHTML = "Please input a number between 1-100!";

    } else {

      console.log("It's a number!");

      //check to see if guess is right, too high, or too low
      if (guess == "ok"){
         // $("#message").text("You are correct!");
        message.innerHTML = "You are correct!";
        icon.src= "/static/img/hand_thumbs_up.png";
        $.removeCookie("user-verify-cookie", {
             path: "/",
         })
      }

       //now add the conditions for too high and too low! Be sure to display a message and the appropriate icon

       //ADD CODE HERE


       else if (guess == "little"){
        message.innerHTML = "Low!";
        icon.src = "/static/img/hand_point_up.png";
       }

        else if (guess == "big"){
        message.innerHTML = "high!";
        icon.src = "/static/img/hand_point_down.png";
       }

    } //end conditionals
    })




} //end function

//declare a variable to call the random number generator function and hold the return value
let rand = getRandNum();

//check the value
console.log(rand);

//add event listener / call event handler for guess button
guess_btn.addEventListener("click",compareNums);
