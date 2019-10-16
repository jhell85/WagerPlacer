import React, { useState, useGlobal } from "reactn";
import { Redirect } from "react-router-dom";
import client from "../api/client";

const Bet = (props) => {
    const { bet } = props;

}
const BetList = () => {
    const [bets, setBets] = useState([]);

    const getBets = async () =>{
        const response = await client.get("/games")
        setBets(response.data)
    }
    getBets()
return (
    <>
    <div>
        {bets.map((bet) =>(
            <div>
                {bet.game.id}
                <div>
                NFL week {bet.game.week}<br></br>
                away {bet.game.awayTeamAbbreviation}<br></br>
                home {bet.game.homeTeamAbbreviation} {bet.lines.map((line) => 
                  
                    <>{line.pointSpread.homeSpread}</>
                    )}
                
                </div>

            </div>
            
        ))}
    </div>
    </>
)
}
export default BetList;