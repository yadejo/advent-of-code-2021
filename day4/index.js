
const fs = require("fs");
const path = require("path");

const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'));
let [drawnNumberLine, __, ...boardLines] = fileContent.toString().split('\n');


const drawnNumbers = drawnNumberLine.split(',');
let boards = chunkArray(boardLines.filter(x => x !== ''), 5).map(boardLine => boardLine.map(y => y.split(' ').filter(x => !!x)));


(function part1() {
    console.log("Part 1: ", calculateScore(getNextWinner(drawnNumbers, boards)));
})();

(function part2() {
    let remainingBoards = [...boards];
    let lastWin = undefined;
    while(remainingBoards.length) {
        lastWin = getNextWinner(drawnNumbers, remainingBoards);
        remainingBoards = remainingBoards.filter(x => x !== lastWin.board);
    }

    console.log("Part 2: ", calculateScore(lastWin));
})();

function getNextWinner(numbers, boards) {
    let calledNumbers = [];
    for (i = 0; i < numbers.length; i++) {
        calledNumbers = numbers.slice(0, i + 1);
        const wonBoards = boards.filter(b => checkBoard(b, calledNumbers));
        if(wonBoards.length) {
            return {board: wonBoards[0], calledNumbers };
        }
    }
}

function calculateScore({board, calledNumbers}) {
    const numbers = board.reduce((prev, curr) => [...prev, ...curr], []);

    const numbersNotCalled = numbers.filter(x => !calledNumbers.includes(x));
    const sum = numbersNotCalled.reduce((x, y) => (+x) + (+y), 0);
    const score = sum * calledNumbers[calledNumbers.length - 1];

    return score;
}

function checkBoard(board, numbers) {
    const anyRow = board.filter(row => row.every(number => numbers.includes(number)));
    const anyColumn = getColumnsForBoard(board).filter(row => row.every(number => numbers.includes(number)));

    return anyRow.length || anyColumn.length;
}

function getColumnsForBoard(boardRows) {
    let result = [];
    for (let i = 0; i < boardRows[0].length; i++) {
        result.push(boardRows.map(x => x[i]));
    }

    return result;
}

function chunkArray(arr, size) {
    return arr.length > size
        ? [arr.slice(0, size), ...chunkArray(arr.slice(size), size)]
        : [arr]
}

