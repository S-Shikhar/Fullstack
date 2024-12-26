function func(){
const name = prompt('Enter your name');
alert(`Hello ${name}`);

// if(name ==null || name === ''){
//     alert('You have to enter your name');
// } else {
//     alert(`Hello ${name}`);
// }
}

let now = new Date();
console.log(now);

let formatted = `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
console.log(formatted);

arr = [1, 2, 3, 4, 5];


arr.forEach((item, index) => {
    console.log(`Index: ${index}, value: ${item}`);
});

for(let i = 0; i < arr.length; i++){
    console.log(`Index: ${i}, value: ${arr[i]}`);
}

for(let item of arr){
    console.log(`Index: ${arr.indexOf(item)}, value: ${item}`);
}

for(let i in arr){
    console.log(`Index: ${i}, value: ${arr[i]}`);
}