import React, { useState, useGlobal, useEffect } from "reactn";
import { Redirect } from "react-router-dom";
import client from "../api/client";

import "./GetGames.css";

const Bet = (props) => {
    const { bet } = props;

}
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
    <div>
        {bets.map((bet) =>(
            <div> 
                <div>
                    NFL week {bet.game.week}
                </div>
                <div>
                    away {bet.awayReferences.
                    map((team) => team.name)}
                </div>
                <div>
                    home {bet.homeReferences.
                    map((team) => team.name)}  
                    {bet.lines
                        .filter((line) => line.pointSpread.gameSegment === "FULL")
                        .map((line) => (
                            <span className="homeSpread">{line.pointSpread.homeSpread}</span>
                        )
                    )}
                </div>

            </div>
            
        ))}
    </div>
    </>
)
}
export default BetList;