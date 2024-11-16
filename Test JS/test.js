const a = 2  // const is a constant variable, it can't be changed
console.log(a);

var b = 3    // var is a variable that can be changed, and is global
console.log(b);

let c = 5  // let is a variable that can be changed, and is local to the block
console.log(c);

for(let i = 0; i <= 10; i++){
    console.log(i);
}

function test(a, b){
    console.log(a + b);
}

test(2, 5.5);

var d = (a, b) => {
    return a + b;
}

function isPrime(num) {
    for (var i = 2; i < num/2; i++) {
        if (num % i == 0) return false;
    }
    return true;
}

peoples = [
    ["Rouymadip Patra", 86],
    ["Suvendu Dash Adhikary", 117],
    ["Souharda Shikhar Biswas", 103]
]

for (let people of peoples) {
    for (let i of people) {
        console.log(i)
    }
}

for (let [name, roll] of peoples) {
    console.log(`Name: ${name} and Roll:${roll}`);
}

