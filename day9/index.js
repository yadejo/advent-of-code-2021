
const fs = require("fs");
const path = require("path");

const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'));
let lines = fileContent.toString().split('\n').map(x => x.split('').map(x => parseInt(x)));

(function part1() {
    let score = 0;

    for (let x = 0; x < lines.length; x++) {
        for (let y = 0; y < lines[x].length; y++) {
            if (isLowPoint(x, y, lines)) {
                score += 1 + lines[x][y]
            }
        }
    }

    console.log("Part 1: ", score);
})();

(function part2() {
    const bassinSizes = [];
    for (let x = 0; x < lines.length; x++) {
        for (let y = 0; y < lines[x].length; y++) {
            if (isLowPoint(x, y, lines)) {
                bassinSizes.push(getBassin(lines, x, y).length)
            }
        }
    }

    const [first, sec, third, ...rest] = bassinSizes.sort((a, b) => b - a);
    console.log("Part 2: ", first * sec * third);
})();

function isLowPoint(x, y, array) {
    return Math.min(array[x][y], ...getAdjecentValues(array, x, y)) === array[x][y] && [array[x][y], ...getAdjecentValues(array, x, y)].filter(p => p == array[x][y]).length === 1;
}

function getAdjecentCoordinates(array, x, y) {
    const res = [];

    if (x !== 0) {
        res.push({ x: x - 1, y: y })
    }

    if (x !== array.length - 1) {
        res.push({ x: x + 1, y: y })
    }

    if (y !== 0) {
        res.push({ x: x, y: y - 1 })
    }

    if (y !== array[x].length - 1) {
        res.push({ x: x, y: y + 1 })
    }
    return res;
}

function getAdjecentValues(array, x, y) {
    return getAdjecentCoordinates(array, x, y).map(p => array[p.x][p.y])
}

function getBassin(array, x, y, alreadyCovered = []) {
    let result = [{ x, y }]
    const neighbourPoints = getAdjecentCoordinates(array, x, y) // Get neighbours
                            .filter(p => array[p.x][p.y] !== 9) // But not the 9's
                            .filter(p => !alreadyCovered.find(ac => ac.x === p.x && ac.y === p.y)); // And not the ones already covered

    neighbourPoints.forEach(nb => result.push(
        ...getBassin(array, nb.x, nb.y, [...alreadyCovered, ...neighbourPoints, ...result])))

    return result;
}