

/**1. variables: containers to store our data

	1. var : example - var name = "sanjay" - can redeclare - functional scope
	2. let:  let age  = 23  - can't redeclare in the same scope
	3. const: const api = something which is constant over the execution


2. Data types: 
	1. primitive data type: number, string, Boolean, null, undefined
	2. no-primitive types : 

		1. objects : key-value pairs
        2. arrays : 
        3. functions:


        let person = { name: "sanjay", age:  36}
        let myarray = ['sting', 5, true]

        function greet(){
            console.log('hello!')
        }

        greet()

3. Operators : used fpr mathaticlation caluctlation

let sum = 5 + 3 = addition
let diff = 36 - 64  = subtarcction
let prod = 4 * 5 = multiplication
let div = 10/2 = division
let mod = 10 % 3 = remainder  - 1
let exp = 2 ** 3 = exponentiatoin - 8

Assignment operators:

let x = 6
x+=5
console.log(x)

comparison operators:
    <, >, ,<=, >=, ==== (strictly equality), == (;loose equality), 

Logical operators:
    && - AND - if both condition is true the output will be the true
    || - OR  - if any one one of the condition is true out is true
    !  - NOT  - not equal

Ternary operators:
    let age = 18
    let status = age >= 18 ? "Adult": "Minor"
    console.log(status)


4. Conditional statements:

    1. if statement: - use when the condition is always true
        let age = 18
        if(age <= 18) {
        console.log("You are minor")
        }

    2. if else statement: - use when we need to check condition is false
        let age = 18
        if(age < 18) {
        console.log("You are minor")
        } else {
            console.log("You are major")
            }
        
    3. if else if else - when to check the condition in order
        let age = 18
        if(age < 18) {
        console.log("You are minor")
        } else if(age > ) {
            console.log("You are major")
            } else {
                console.log(`age : ${age}`)
                }

    4. switch statements: 

    let day = "Wednesday";

switch (day) {
    case "Wednesday":
        console.log("Today");
        break;

    case "Thursday":
        console.log("Tomorrow");
        break;

    case "Friday":
        console.log("Day after tomorrow");
        break;

    default:
        console.log(day);
}


Loops: repeat our code multiple times


1. for loop:

Advance JavaScript:

1. let and const 
2. arrow functions:

 const greet = () => {
    console.log("Mornig")
 }

greet()


cost sub = (a, b) => b - a
console.log(sub(4, 7))
    
3. template literals

const name = "John"
console.log(`${name}`)


4. Destructuring: 

1. array destructuring:

let myArray = [3, 65, 67]
const [a, b, c] = myArray
console.log(b)

2. object destructuring:

let myObject = { name : 'ajay', place: 'india'}
const {name, place} = myObject
console.log(place)

5. Spread operators: 

ex:
let myArray1 = [3, 65, 67];
let myArray2 = [...myArray1, 5, 4];

6. Rest operator

function demo(...numbers) {
    console.log(numbers);
}

demo(10, 20, 30, 40);

6. Promises :

const myPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Done");
            }, 3000);
        });

        myPromise.then((message) => {
            console.log(message);
        });


7. async and await


Cypress Installation:
1. npm install cypress --save-dev   -  install cypress
2. npx cypress open                 - open cypress
3. npx cypress run                  - to run tests


example command line flags - --spec, --browser, --headed, --env, --config


  // * assert
        // assert.equal()
        // assert.notEqual()
        // assert.isTrue()
        // assert.isFalse()
        // assert.include()
        // assert.exists()
        // assert.isNull()
        // assert.isNotNull()  


			**/