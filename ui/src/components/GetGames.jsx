import React, { useState, useGlobal, useEffect } from "reactn";
import { Redirect } from "react-router-dom";
import client from "../api/client";

import "./GetGames.css";

const BetList = () => {
    const [bets, setBets] = useState([]);
    const [currentBet, setCurrentBet] = useGlobal("currentBet");
    const [betSelected, setBetSelected] = useState(false);

    const getBets = async () =>{
        const response = await client.get("/games")
        console.log(response)
        setBets(response.data)
    }

    const setBetAndRedirect = (bet) => {
        setCurrentBet(bet);
        setBetSelected(true);
    }

    useEffect(() => {
        getBets()
    }, [])
    return (
        <>
        {betSelected && (
            <Redirect to="/create-bet" />
        )}
        <div className="gameContainer">
            {bets.map((bet) =>(
                <div className="game"> 
                    <div className="gameHeader">
                        NFL week {bet.game.week}
                    </div>
                    <div>
                        away: {bet.awayReferences.name} 
                    </div>
                    <div>
                        home: {bet.homeReferences.name} {bet.pointSpread.pointSpread.homeSpread}
                    </div>
                    {bet.overUnder && (
                        <div>
                            {bet.overUnder.overUnder.overUnder} over/under
                        </div>
                    )}
                    <button onClick={() => setBetAndRedirect(bet)}>Create Bet</button>
                </div>
            ))}
        </div>
        </>
    )
}
export default BetList;