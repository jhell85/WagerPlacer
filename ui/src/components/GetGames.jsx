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
return (
    <>
    <div>
        {bets.map((bet) =>(
            <div>
            {bet}
            </div>
        ))}
    </div>
    </>
)
}
export default BetList;