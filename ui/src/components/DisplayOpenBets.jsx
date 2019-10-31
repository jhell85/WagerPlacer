import React, { useState, useEffect } from "reactn";
import { Redirect } from "react-router-dom";
import client from "../api/client";

const DisplayOpenBets = () => {
  const [bets, setBets] = useState([]);

  const betParameters = props => {
    console.log(props);
    if (props.hasOwnProperty("betType")) {
      console.log("it has BetType");
      if (props.betType.hasOwnProperty("pointSpread")) {
        if (props.homeAway === true) {
          return (
            <div>
              <div>
               
              taking the {props.awayReferences.city} {props.awayReferences.name}{" "}
              </div>
              <div>on the road at the</div>
              <div>{props.homeReferences.city} {props.homeReferences.name}{props.betType.pointSpread.homeSpread}</div>
              <div>with the point spread </div>
              <div> if you win your opponent will pay {} </div>
            </div>
          );
        }
      }
    }
  };

  const getBets = async () => {
    const response = await client.get("/bets");
    setBets(response.data);
  };
  useEffect(() => {
    getBets();
  }, []);
  return (
    <div>
      {bets.map(bet => (
        <div>
          {betParameters(bet)} {bet.homeReferences.city}
        </div>
      ))}
    </div>
  );
};
export default DisplayOpenBets;
