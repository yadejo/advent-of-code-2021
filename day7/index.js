
    const fs = require("fs");
    const path = require("path");

    const fileContent = fs.readFileSync(path.join(__dirname,'input.txt'));
    const positions = fileContent.toString().split(',').map(x => parseInt(x));


    let result;
    for(let i = Math.min(...positions); i <= Math.max(...positions); i++) {
        const total = positions.reduce((prev, curr) => prev + fuelTillPositionPt2(curr, i), 0);

        if(!result || result > total) {
            result = total;
        }
    }

    console.log(result);

    function fuelTillPositionPt1(curr, dest) {
        return Math.abs(curr - dest);
    }

    function fuelTillPositionPt2(curr, dest) {
        const steps = Math.abs(curr - dest);

        return steps * (steps + 1) / 2; // formule voor 1 + 2 + 3 + .... + n = n * (n + 1) / 2
    }

