import React, { useState, useEffect, useGlobal } from "reactn";
import client from "../api/client";
import BetList from "../components/GetGames"

const Games = () => {
  return(
    <div>
      <BetList/>
    </div>
  )
}
export default Games;