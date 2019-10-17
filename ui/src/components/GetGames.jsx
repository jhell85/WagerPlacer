import React, { useState, useGlobal, useEffect } from "reactn";
import { Redirect } from "react-router-dom";
import client from "../api/client";

import "./GetGames.css";



const BetList = () => {
    const [bets, setBets] = useState([]);



    const getBets = async () =>{
        const response = await client.get("/games")
        setBets(response.data)
    
    }
    useEffect(() => {
        getBets()
    }, [])
return (
    <>
    <div className="gameContainer">
        {bets.map((bet) =>(
            <div className="game"> 
                <div className="gameHeader">
                    NFL week {bet.game.week}
                </div>
                <div>
                    away {bet.awayReferences.name} 
                </div>
                <div>
                    home {bet.homeReferences.name} {bet.pointSpread.pointSpread.homeSpread}
    
                </div>

            </div>
            
        ))}
    </div>
    </>
)
}
export default BetList;