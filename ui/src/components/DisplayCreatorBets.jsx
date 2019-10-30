import React, { useState, useEffect, useGlobal } from "reactn";
import { Redirect } from "react-router-dom";
import client from "../api/client";

const DisplayCreatorBets = () => {
  console.log("DisplayBets ran");
  const [bets, setBets] = useState([]);
  const { 0: token } = useGlobal("token");

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
        <div>{bet.homeReferences.city}</div>
      ))}
    </div>
  );
};
export default DisplayCreatorBets;
