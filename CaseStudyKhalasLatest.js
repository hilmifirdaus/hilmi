//Created by group Khalas for INFO 4302 section 01
//Muhammad Hilmi Firdaus bin Mohd Fuad [1715733]
//Wan Maisarah binti Wan Azhar [1710714]
//Nur Hazirah Binti Haris Fadzilah [1714158]
//Yuseri Che Yunus [1710879]

const readline = require('readline');
const { exit } = require('process');
const { count } = require('console');
const { isNull } = require('util');
const rI = readline.createInterface(process.stdin, process.stdout);

function ask(myquestion) {
    return new Promise((userAns) => {
      rI.question(myquestion, userAns);
    });
  }

//Promise is an object that can be used to get the outcome of 
//an asynchronous operation when that result is not instantly available.

//`await` means "wait for the following thing to happen"
//when you use `await` inside a function, 
//you must use `async` to define that function


// class car
class Car{

    constructor (platNo){
        this.platNo = platNo;
        this.endtime = this.endTime(); 
    }
    
    // generate duration randomly from 0-120 seconds (0-2 minutes)
    endTime(){
        var duration = (Math.random() * (2*60 - 1)*1000 + 1000);
        var now = new Date().getTime();
        return (now + duration);
    }
    
    set PlatNo(platNo){
        this.platNo = platNo;
    }
    get PlatNo(){
        return this.platNo;
    }

    get EndTime(){
        return this.endtime;
    }

    set EndTime(endTime){
        this.endtime = endTime;
    }

    display(){
        console.log('Car: ' + this.platNo + '\nEnd Time: ' + this.endtime);
    }

}


// array bay
var bays = ["", "", "", "", ""];

// array queue
var queue = new Array();


console.log('Welcome to Car Service Lineup System!');
shopTime();
chooseOp();



// check opening hours
function shopTime()
{
    // var plateNo = answer;
    var today = new Date();
    var hour = today.getHours();
    var minute = today.getMinutes() 
    var second = today.getSeconds();

    if(hour>=12)
        var m = 'PM';
    else
        var m = 'AM';

        
    if (hour >= 7 && hour < 19) { //opening hour between 7am until 6.59pm
        hour = hour%12;

        hour = hour < 10 ? "0" + hour : hour;
        second = second < 10 ? "0" + second : second;

        console.log('\nIt is ' + hour + ":" + minute + m + ', The Shop is OPEN!');
    }  

    else{
        console.log('\nIt is ' + hour + ":" + minute + m + ', The Shop is CLOSED!');
        // exit();
    }
}





async function chooseOp() {

    console.log('\nWhat do you want to do? \n 1. Add car \n 2. Check time \n 3. Exit');
    let choosing = await ask('\nChoose Operation (1 - 3): ');

    if(choosing === '1') {
      addCarFunc(); 
    }
    else if(choosing === '3') {
      console.log('Thank you! Please come again!');
      exit();
    }
    else if(choosing ==='2'){
        displayBay();
    }
    else{
        console.log("\nError: Invalid input. Please try again.");
        chooseOp();
    }

}


function displayBay(){
    console.log("\nBays: \t\t    1\t    2\t    3\t    4\t    5");
    console.log('\t\t-----------------------------------------');
    var displayPlateNo = 'No plate: \t|';

    bays.forEach(function(value){
        if(value == "")
            displayPlateNo += "\t|";
        else
            displayPlateNo += value.PlatNo + "\t|";
    });

    console.log(displayPlateNo);

    var displayCountdown = 'Remaining time: |';
    bays.forEach(function(value,index){
        if(value == "")
            displayCountdown += "\t|";
        else
            displayCountdown += countdown(value, index) + "\t|";
    });
    
    console.log('\t\t-----------------------------------------');
    console.log(displayCountdown);
    console.log('\t\t-----------------------------------------');

    console.log("No. of car(s) is queue: " + queue.length);

    chooseOp();
    
}




async function addCarFunc() {

    do{
        let noCars = await ask('\nHow many cars? ');
                
        for (i = 0; i < noCars; i++){
          let input = await ask('Enter car plate no: ');
          
          if(input.length <= 7 && input.length >0){
            bay(String(input));
          }
          else{
            console.log('Error: Invalid Plate No!');
          }         
      }
      
        
        console.log('The car has been inserted... ');
        let addCar = await ask('Do you want to add more car? (y/n) ');

        if(addCar === 'n'){
            chooseOp();
        }
    }
    while(true)
}

function bay(car){
    let empty = bays.findIndex((a) => a == "");
    if(empty != -1){ //bay is not full
        bays[empty] = new Car(car);
        
    }
    else{ //bay is full
        queue.push(car);        
    }
}



function countdown(car, bayno){
    var duration;
    var enti = car.EndTime;

    var now = new Date().getTime();
        
    duration = enti-now;

    if (duration < 1000) {
        bays[bayno] = "";
        duration = 0;
        if(queue.length !=0){ //queue is not empty
            bay(queue[0]);
            queue.shift();
        }       
    }
    return displayTime(duration);
}

//function to display time in hh:mm:ss format
function displayTime(distance){
    // hours = Math.floor((distance / (1000*60*60) % 24));
	minutes = Math.floor((distance / (1000 * 60)%60));
    seconds = Math.floor((distance / 1000)%60);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
    
}
