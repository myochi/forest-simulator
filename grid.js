const {Case} = require("./case")
class Grid
{

    constructor(h, w, casesArray){

        this.h = h;
        this.w = w;
        this.cases = []
        this.burningCases = casesArray.length
        this.totAlive = w * h - this.burningCases

        for (let i = 0; i < this.h; i++)
        {
            this.cases.push([]);
            for (let j = 0; j < this.w; j++)
            {
                this.cases[i].push(new Case("alive", i, j))
            }
        }
        for (let k = 0; k < casesArray.length; k++)
        {
            this.cases[casesArray[k].posX][casesArray[k].posY].setState("burning")
        }
    }

    nextGeneration()
    {
        for (let i = 0; i < this.h; i++)
        {
            for (let j = 0; j < this.w; j++)
            {
                if (this.cases[i][j].isBurning())
                {
                    this.cases[i][j].setState("burnt");
                    this.burningCases -= 1;
                }
                if (this.cases[i][j].willBeBurnt())
                {
                    this.cases[i][j].setState("burning");
                    this.burningCases += 1;
                    this.totAlive --;
                }
            }
        }

    }

    displayGrid()
    {
        for (let i = 0; i < this.h; i++)
        {
            for (let j = 0; j < this.w; j++)
            {
                if (j === 0)
                {
                    process.stdout.write("|")
                }
                process.stdout.write(` ${this.cases[i][j].getEmote()} |`)
            }
            console.log("\n")
        }
    }
    getHeight(){
        return this.h;
    }
    getWidth(){
        return this.w;
    }
    getBurningCases()
    {
        return this.burningCases;
    }
    getTotAlive()
    {
        return this.totAlive;
    }

    swapCaseState(i, j)
    {
        if (this.cases[i][j].isAlive())
        {
            this.cases[i][j].setState("pre-burning")
        }
    }
}
module.exports = { Grid };