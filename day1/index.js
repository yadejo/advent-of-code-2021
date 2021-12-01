const fs = require("fs");

const file = fs.readFileSync('input.txt');
const depths = file.toString().split('\r\n').map(x => Number(x));

let x = 0;
for(let i = 1; i<depths.length; i++) {
    if(depths[i] > depths[i-1]) {
        x++;
    }
}

console.log("result part 1: ", x);




const sums = [];
for(let i = 0; i<depths.length - 2; i++) {
    sums.push(depths[i] + depths[i+1] + depths[i+2]);
}

let y = 0;
for(let i = 1; i<sums.length; i++) {
    if(sums[i] > sums[i-1]) {
        y++;
    }
}

console.log("result part 2: ", y);
