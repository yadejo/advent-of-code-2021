
    const fs = require("fs");
    const path = require("path");

    const fileContent = fs.readFileSync(path.join(__dirname,'input.txt'));
    const fish = fileContent.toString().split(',').map(x => parseInt(x));
    const cache = {};

    console.log(fish.map((f, i) => {
        if(cache[f]) return cache[f]; 
        return calculate(f, 256);
    }).reduce((prev, curr) => prev + curr, 0));


    function calculate(fish, numOfDays) {
        let resultingFish = 1;
        let curr = fish;
        let increaseNextTime = false;
        for(let i = 0; i < numOfDays; i++) {
            if(curr === 0) {
                increaseNextTime = true;
                curr = 6;

            } else {
                curr--;
            }
            if(increaseNextTime) {
                increaseNextTime = false;
                resultingFish+=calculate(8, numOfDays - i - 1);
            }
        }

        cache[fish] = resultingFish;
        return resultingFish;
    }