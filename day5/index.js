
const fs = require("fs");
const path = require("path");

const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'));
const lines = fileContent.toString().split('\n');



const allPoints = lines.map(parseLine)
    // .filter(isHorizontalOrVertical) ===> uncomment for part1
    .map(getAllPointsForLine)
    .reduce((prev, curr) => prev.concat(curr), []);


const occurences = allPoints.map(JSON.stringify).reduce((prev, curr) => {
    if(!prev[curr]) {
        prev[curr] = 0;
    }

    prev[curr]++;
    return prev;
}, {});


console.log(Object.keys(occurences).filter(key => occurences[key] > 1).length);


function parseLine(stringPoint) {
    const pointStrings = stringPoint.split(' -> ');


    return [
        pointStrings[0].split(',').map(x => parseInt(x)),
        pointStrings[1].split(',').map(x => parseInt(x))
    ]
}

function isHorizontalOrVertical(line) {
    return line[0][0] === line[1][0] || line[0][1] === line[1][1];
}

function getAllPointsForLine([p1, p2]) {
    const [startX, startY] = p1[0] <= p2[0] ? p1 : p2;
    const [endX, endY] = p1[0] <= p2[0] ? p2 : p1;

    let ricoX = getRico(startX, endX);
    let ricoY= getRico(startY, endY);
    
    let curr = [startX, startY];

    let result = [[startX, startY]];
    while(curr[0] !== endX || curr[1] !== endY) {
        curr = [curr[0] + ricoX, curr[1] + ricoY];
        result.push(curr);
    }

    return result;
}

function pointsAreEqual(p1, p2) {
    return p1[0] === p2[0] && p1[1] === p2[1];
}

function getRico(num1, num2) {
    if(num1 > num2) {
        return -1
    }
    if(num1 < num2) {
        return 1
    }
    return 0;
}