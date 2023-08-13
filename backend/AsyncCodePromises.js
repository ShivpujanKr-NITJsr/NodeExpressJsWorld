// const fetchData=callback=>{
//     setTimeout(()=>{

//         callback('Done!');
//     },1500);
// }
// setTimeout(()=>{
//     console.log('Timer is done!');

//     fetchData(text=>{
//         console.log(text);
//     });
// },2000);
// const fetchData = () => {

//     const promise = new Promise((resolve, reject) => {

//         setTimeout(() => {

//             resolve('Done!');
//         }, 1500);
//     });
//     return promise;

// }
// setTimeout(() => {
//     console.log('Timer is done!');

//     fetchData().then(text => {
//         console.log(text);
//         return fetchData();
//     }).then(text2 => {
//         console.log(text2)
//     })
// }, 2000);

// console.log('Hello!');

// console.log('Hi!');

async function printing(){
    console.log('a');
    console.log('b');

    await new Promise(res => setTimeout(() => {
        console.log('c');
        res();
    }, 3000));
    console.log('d');
    console.log('e');
}
printing();

// const tim = ms => new Promise(resolve => setTimeout(resolve, ms));

// async function printing() {
//   console.log('a');
//   console.log('b');
  
//   await tim(3000);
//   console.log('c');
//   console.log('d');
//   console.log('e');
// }

// printing();


