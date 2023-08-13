// const person ={
//     namd:'Max',
//     age:29,
//     greet(){
//         console.log('hi, i am '+this.name);
//     }
// };

// const hobbies=['sports','cooking']

// for(let hobby of hobbies){
//     console.log(hobby)
// }

// console.log(hobbies.map(hobby => 'Hobby: '+hobby))

// console.log(hobbies);

const array=['apple', 'oranges' , ' ', 'mango', ' ' , 'lemon'];
//['apple', 'oranges' , 'empty string', 'mango', 'empty string', 'lemon]
const a=array.map((element,index,array)=>{
    if(this[index]==''){
        this[index]='empty string'
    }
    else return element;
})
console.log(a)

const b=[...a]    // spread operator

const c=(...argument)=>{                    // rest operator
    return argument;
}

console.log(b);

console.log(c(1,2,3,4,5))

//   ************* 1. hobbies is const and still it does not give error bcoz array is a type of an object and const variable stores reference to the array , so while assigning or modifying array does not change the references so, it does not gives error
// *************  2.spread operator is used to copy the values in other variable, it creates new object but it is shallow copy not deep copy it means it will give new object but if there is any object within this object and if we did not care and used spread operator for inside object,then new object will contain reference of inside object that was present in older object

//**************** 3. rest operator is used to merge all elements of arguments in array , it should be the last parameter of any function




