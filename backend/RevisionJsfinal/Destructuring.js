const person={
    name: 'Maxii',
    age: 28,

    greet(){
        console.log('Hi , i am '+this.name);
    }
}

const printName =({ name })=>{
    console.log(name);
}

printName(person);

const {name ,age}=person;                     // destructing object

console.log(name,age)

// it  can be destructuring with array as well

const hobbies=['sportssss','cooking']                   //destructing array

const [hobby1,hobby2]=hobbies;

console.log(hobby1, hobby2)

