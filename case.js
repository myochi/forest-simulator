class Case {
    constructor(state, posX, posY)
    {
        this.state = state;
        this.posX = posX;
        this.posY = posY;
    }

    setState(newState)
    {
        this.state = newState;
    }

    getState()
    {
        return this.state
    }

    isAlive()
    {
        return this.state === "alive"
    }

    isBurning()
    {
        return this.state === "burning"
    }

    willBeBurnt()
    {
        return this.state === "pre-burning"
    }

    getEmote()
    {
        switch (this.state)
        {
            case "burning" :
                return "🔥";
            case "burnt" :
                return "💀";
            default :
                return "🌳";
        }
    }
}
module.exports = { Case };