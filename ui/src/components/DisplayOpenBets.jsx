import React, { useState, useEffect } from "reactn";
import { Redirect } from "react-router-dom";
import client from "../api/client";

const DisplayOpenBets = () => {

  const [bets, setBets] = useState([]);

  const getBets = async () => {
    const response = await client.get("/bets")
    setBets(response.data);
  };
  useEffect(() => {
    getBets();
  }, []);
  return (
    <div>
      {bets.map(bet => (
        <div>{bet.homeReferences.city}</div>
      ))}
    </div>
  );
};
export default DisplayOpenBets;
