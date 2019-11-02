import React, { useState, useEffect, useGlobal } from "reactn";
import { Redirect } from "react-router-dom";
import client from "../api/client";
import "./GetGames.css";

const DisplayCreatorBets = () => {
  const [bets, setBets] = useState([]);
  const { 0: token } = useGlobal("token");

  const betParameters = props => {
    if(props.betType === "pointSpread" && props.homeAway === true){
      return(
        <div>
          <div>
           true {props.homeReferences.city} {props.betType}
          </div>
        </div>
      )
    }
    else if(props.betType === "pointSpread" && props.homeAway === false){
      return(
        <div>
        <div>
          false {props.awayReferences.city} {props.betType}
        </div>
      </div>
      )
    }
    else if(props.betType === "moneyLine" && props.homeAway === true){
      return(
        <div>
        <div>
          true {props.homeReferences.city} {props.betType} 
        </div>
        </div>
      )
    }
    else if(props.betType === "moneyLine" && props.homeAway === false){
      return(
        <div>
        <div>
         false {props.awayReferences.city} {props.betType} 
        </div>
      </div>
      )
    }
    else if(props.betType === "overUnder" && props.homeAway === true){
      return(
        <div>
        <div>
          True {props.homeReferences.city} {props.betType}
        </div>
      </div>
      )
    }
    else if(props.betType === "overUnder" && props.homeAway === false){
      return(
        <div>
          <div>
            False {props.homeReferences.city} {props.betType}
          </div>
        </div>
      )
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
