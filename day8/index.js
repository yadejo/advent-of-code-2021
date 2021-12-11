
const fs = require("fs");
const path = require("path");

const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'));
const lines = fileContent.toString().split('\n') // .map(x => x.split(' | ')[1].split(' ').filter(x => x.length === 2 || x.length === 4 || x.length === 3 || x.length === 7)).reduce((x,y) => x.concat(y), []);

console.log(lines.length);

let total = 0;
lines.forEach(line => {

    let inputs = line.split(' | ')[0].split(' ').map(x => x.split(''));
    const one = inputs.filter(x => x.length === 2)[0]
    const seven = inputs.filter(x => x.length === 3)[0]
    const four = inputs.filter(x => x.length === 4)[0]
    const eight = inputs.filter(x => x.length === 7)[0]
    const nine = inputs.filter(x => x.length === 6).filter(x => new Set([...x, ...four]).size === 6)[0]
    const six = inputs.filter(x => x.length === 6).filter(x => new Set([...x, ...one]).size === 7)[0]
    const five = inputs.filter(x => x.length === 5).filter(x => [...new Set([...x, ...one])].sort().join('') === nine.sort().join(''))[0]; 
    const two = inputs.filter(x => x.length === 5).filter(x => new Set([...x, ...one]).size === 6).filter(x => new Set([...x, ...four]).size === 7)[0]
    const three = inputs.filter(x => x.length === 5).filter(x => new Set([...x, ...one]).size === 5)[0]

    const nums = {
        [one.sort().join('')]: '1',
        [two.sort().join('')]: '2',
        [three.sort().join('')]: '3',
        [four.sort().join('')]: '4',
        [five.sort().join('')]: '5',
        [six.sort().join('')]: '6',
        [seven.sort().join('')]: '7',
        [eight.sort().join('')]: '8',
        [nine.sort().join('')]: '9'
    }

    const outputs = line.split(' | ')[1].split(' ').map(x => x.split('').sort().join(''));

    let num = ''
    outputs.forEach(output => {
        console.log(nums[output])
       num += nums[output] || '0';
    })
    total += parseInt(num);
});

console.log(total);

