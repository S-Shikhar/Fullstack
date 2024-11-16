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

