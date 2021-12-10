
    const fs = require("fs");
    const path = require("path");

    const fileContent = fs.readFileSync(path.join(__dirname,'input.txt'));
    const lines = fileContent.toString().split('\n').map(x => x.split(''));

    console.log("part 1: ", calcGammaRate(lines) * calcEpsilonRate(lines))
    console.log("part 2: ", calcCO2Rate(lines) * calcOxygenRate(lines))


    function calcGammaRate(bitArrays) {
        let gammaRate = '';
        for(let i = 0; i < bitArrays[0].length; i++) {
            const nthBits = bitArrays.map(x => x[i]).reduce((prev, curr) => prev.concat([curr]), []);
            gammaRate += getMostCommonBit(nthBits);
        }
        return parseInt(gammaRate, 2);
    }

    function calcEpsilonRate(bitArrays) {
        let epsilonRate = '';
        for(let i = 0; i < bitArrays[0].length; i++) {
            const nthBits = bitArrays.reduce((prev, curr) => prev.concat([curr[i]]), []);
            epsilonRate += getLeastCommonBit(nthBits);
        }
        return parseInt(epsilonRate, 2);
    }

    function calcOxygenRate(bitArrays) {
        let oxygenArr = [...bitArrays];
        for(let i = 0; i < bitArrays[0].length; i++) {
            if(oxygenArr.length > 1)
                oxygenArr = oxygenArr.filter(x => x[i] === getMostCommonBitOnPosition(oxygenArr, i))
        }

        const oxygenRate = parseInt(oxygenArr[0].join(''), 2);
        return oxygenRate;
    }
    
    function calcCO2Rate(bitArrays) {
        let co2Arr = [...bitArrays];
        for(let i = 0; i < bitArrays[0].length; i++) {
            if(co2Arr.length > 1)
                co2Arr = co2Arr.filter(x => x[i] === getLeastCommonBitOnPosition(co2Arr, i))
        }
    
        const co2Rate = parseInt(co2Arr[0].join(''), 2);

        return co2Rate;
    }


    function getMostCommonBitOnPosition(lines, position) {
        const bits = lines.map(x => x[position]);
        return getMostCommonBit(bits);
    }

    function getLeastCommonBitOnPosition(lines, position) {
        const bits = lines.map(x => x[position]);
        return getLeastCommonBit(bits);
    }

    function getMostCommonBit(bits) {
        return bits.filter(x => x === '0').length > (bits.length/2) ? '0' : '1';
    }

    function getLeastCommonBit(bits) {
        return bits.filter(x => x === '0').length > (bits.length/2) ? '1' : '0';
    }

    function hasBitOnTheNthPosition(arr, bit, index) {
        return arr[index] === bit;
    }
