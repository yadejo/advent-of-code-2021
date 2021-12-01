const fs = require("fs");

const file = fs.readFileSync('input.txt');
const depths = file.toString().split('\r\n').map(x => Number(x));

const x = depths.filter((_, i, arr) => i > 0 && arr[i] > arr[i - 1]).length;
console.log("result part 1: ", x);

const y = depths
            .filter((_, i, arr) => 
                        i < arr.length - 2 && 
                        (arr[i] + arr[i+1] + arr[i+2] ) < (arr[i+1] + arr[i+2] + arr[i+3])
        ).length;

console.log("result part 2: ", y);
