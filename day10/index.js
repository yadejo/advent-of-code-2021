
const exp = require("constants");
const fs = require("fs");
const path = require("path");

const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'));
const lines = fileContent.toString().split('\n');


const matchingChars = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>'
}

    (function part1() {
        let score = 0;
        lines.forEach(line => {
            let illegalChar = getIllegalChar(line);
            score += illegalChar ? {
                ')': 3,
                ']': 57,
                '}': 1197,
                '>': 25137
            }[illegalChar] : 0
        });
        console.log("Part 1: ", score)
    })()



    (function part2() {
        const incomplete = lines.filter(line => !getIllegalChar(line));
        const charsPerLine = incomplete.map(getCompletionCharacters);
        const scorePerLine = charsPerLine.map((chars) => {
            return chars.reduce((sc, char) => sc * 5 + {
                ')': 1,
                ']': 2,
                '}': 3,
                '>': 4
            }[char], 0)
        }, 0).sort((a, b) => a - b);

        console.log("Part 2: ", scorePerLine[Math.floor(scorePerLine.length / 2)]);
    })();


function getCompletionCharacters(line) {
    const expectedClosingChars = [];

    for (let i = 0; i < line.length; i++) {
        if (isOpeningChar(line[i])) {
            expectedClosingChars.push(matchingChars[line[i]]);
        } else {
            if (line[i] !== expectedClosingChars.pop()) {
                throw "Illegal line"
            }
        }
    }
    return expectedClosingChars.reverse();
}

function getIllegalChar(line) {
    const expectedClosingChars = [];

    for (let i = 0; i < line.length; i++) {
        if (isOpeningChar(line[i])) {
            expectedClosingChars.push(matchingChars[line[i]]);
        } else {
            if (!expectedClosingChars.length) break;
            if (line[i] !== expectedClosingChars.pop()) {
                return line[i];
            }
        }
    }
}

function isOpeningChar(char) {
    return Object.keys(matchingChars).includes(char);
}
