import React, { useState } from "reactn";
import { Redirect } from "react-router-dom";
import client from "../api/client";

const DisplayBets = () => {
  const [bets, setCurrentBet] = useState();
  
  const getBets = async () =>{
    const response = await client.get("/bets")
  }
}