
const fs = require('fs');
const {Case} = require("./case.js")
const {Grid} = require("./grid.js")

function getGridSize(str){
    let size = str.split(",")
    if(size.length !== 2)
    {
        throw new Error("Parameters size are invalid.")
    }

    if (size[0].match(/\d+/g).length === 1 && size[1].match(/\d+/g).length === 1)
    {
        if (!isNaN(Number(size[0].match(/\d+/g)) && !!isNaN(Number(size[1].match(/\d+/g)))))
        {
            return {"h": Number(size[0]), "w": Number(size[1])}
        }
        else
        {
            throw new Error("Positions aren't numbers.")
        }
    }
    else
    {
        throw new Error("Positions format isn't respected.")
    }
    
}

function getCases(str){
    let resCases = [];
    let cases = str.match(/\(\d+,\d+\)/g);
    if (cases.length < 1)
    {
        throw new Error("No case were found. You must provide one case parameter.")
    }
    for (let i = 0; i < cases.length; i++)
    {
        let coords = cases[i].match(/\d+/g);
        if (coords.length !== 2 || isNaN(coords[0]) || isNaN(coords[1]))
        {
            throw new Error("X & Y positions parameters are incorrect.")
        }
        else
        {
            resCases.push(new Case("burning", Number(coords[0]), Number(coords[1])))
        }
    }
    return resCases;
}

function getProba(str){
    let proba = Number(str);
    if (isNaN(str) || proba < 0 || proba > 100)
    {
        throw new Error("Proba format is incorrect.")
    }
    return proba;
}

function parseConfig() {
    let data = fs.readFileSync("./forest.conf",'utf-8');

    const parameters = data.split(';');
    if (parameters.length !== 3)
    {
        throw new Error("The parameters' number is incorrect.")
    }
    let gridParams = getGridSize(parameters[0])
    let proba = getProba(parameters[1])
    let cases = getCases(parameters[2])
    return {"proba": proba, "grid": new Grid(gridParams.h, gridParams.w, cases)}
}

function youMayBurn(grid, i, j, proba){
    if (i >= 0 && i < grid.getHeight() && j >= 0 && j < grid.getWidth() && grid.cases[i][j].isAlive())
    {
        let rand = Math.floor(Math.random() * (100 - 0 + 1) + 0);
        if (rand <= proba)
        {
            grid.swapCaseState(i, j)
        }
    }
}

function main()
{
    const {proba, grid} = parseConfig()
    let t = 0;
    while (grid.getBurningCases() !== 0)
    {
        console.log(`t = ${t} :`)
        console.log(`Nb burning cases = ${grid.getBurningCases()}\n`)
        grid.displayGrid();
        for (let i = 0; i < grid.getHeight(); i++)
        {
            for (let j = 0; j < grid.getWidth(); j++)
            {
                if (grid.cases[i][j].isBurning())
                {
                    youMayBurn(grid, i , j-1, proba)
                    youMayBurn(grid, i, j+1, proba)
                    youMayBurn(grid, i+1, j, proba)
                    youMayBurn(grid, i-1, j, proba)
                }
            }
        }
        grid.nextGeneration();
        t += 1;
    }
    console.log(`Simulation has been finished in ${t} steps`)
    console.log(`${grid.getTotAlive()} tree${grid.getTotAlive() > 1 ? "s have" : " has"} been saved !\n`)
    grid.displayGrid();
}

main()

