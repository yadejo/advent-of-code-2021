const fs = require("fs");

const file = fs.readFileSync('input.txt');
const commands = file.toString().split('\r\n').map(x => x.split(' ')).map(x => [x[0], Number(x[1])]);

const defaultState = { depth: 0, hor: 0, aim: 0 };

const part1Reducer = (state, [type, number]) => {
        switch (type) {
                case 'forward':
                        return { ...state, hor: state.hor + number };
                case 'down':
                        return { ...state, depth: state.depth + number };
                case 'up':
                        return { ...state, depth: state.depth - number };
                default:
                        return state;
        }
}

const part2Reducer = (state, [type, number]) => {
        switch (type) {
                case 'forward':
                        return {
                                ...state,
                                hor: state.hor + number,
                                depth: state.depth + (number * state.aim)
                        };
                case 'down':
                        return { ...state, aim: state.aim + number };
                case 'up':
                        return { ...state, aim: state.aim - number };
                default:
                        return state;
        }
}


const endStatePart1 = commands.reduce(part1Reducer, defaultState);
console.log(endStatePart1.depth * endStatePart1.hor);

const endStatePart2 = commands.reduce(part2Reducer, defaultState);
console.log(endStatePart2.depth * endStatePart2.hor);


