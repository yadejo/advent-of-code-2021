const fs = require("fs");

const file = fs.readFileSync('input.txt');
const lines = file.toString().split('\r\n').map(x => x.split(' '));

// Part 1
const pos = lines.reduce((acc, curr) => {
        console.log(acc, curr); 
        switch (curr[0]) {
                case 'forward':
                        return {...acc, hor: acc.hor + parseInt(curr[1]) };
                case 'down':
                        return {...acc, depth: acc.depth + parseInt(curr[1]) };
                case 'up':
                        return {...acc, depth: acc.depth - parseInt(curr[1]) };
                default:
                        throw "boem"
        }
        
}, {depth: 0, hor: 0});


console.log(pos.depth * pos.hor);


// Part 2
const pos = lines.reduce((acc, curr) => {
        console.log(acc, curr); 
        switch (curr[0]) {
                case 'forward':
                        return {
                                ...acc, 
                                hor: acc.hor + parseInt(curr[1]),
                                depth: acc.depth + (parseInt(curr[1])*acc.aim)
                        };
                case 'down':
                        return {...acc, aim: acc.aim + parseInt(curr[1]) };
                case 'up':
                        return {...acc, aim: acc.aim - parseInt(curr[1]) };
                default:
                        throw "boem"
        }
        
}, {depth: 0, hor: 0, aim: 0});


console.log(pos.depth , pos.hor, pos.depth * pos.hor);