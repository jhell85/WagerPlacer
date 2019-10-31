import React, { useState, useEffect, useGlobal } from "reactn";
import { Redirect } from "react-router-dom";
import client from "../api/client";
import "./GetGames.css";

const DisplayCreatorBets = () => {
  const [bets, setBets] = useState([]);
  const { 0: token } = useGlobal("token");
  const betParameters = props => {
    console.log(props);
    if (props.hasOwnProperty("betType")) {
      console.log("it has BetType");
      if (props.betType.hasOwnProperty("pointSpread")) {
        if (props.homeAway === false) {
          return (
            <div>
              <div>
              <h3>{props.awayReferences.city} {props.awayReferences.name}</h3>{" "}
              </div>
              <div>on the road at the</div>
              <div><h3>{props.homeReferences.city} {props.homeReferences.name}</h3></div>
            </div>
          );
        }
      }
    }
  };

  const getBets = async () => {
    const response = await client.get("/bets/creator", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setBets(response.data);
  };
  useEffect(() => {
    getBets();
  }, []);
  return (
    <div>
      {bets.map(bet => (
        
        
          <div className="gameContainer">{betParameters(bet)}</div>
     
      ))}
    </div>
  );
};
export default DisplayCreatorBets;
