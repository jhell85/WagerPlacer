import React, { useState, useEffect, useGlobal } from "reactn";
import client from "../api/client";
import GetGames from "../components/GetGames"

const Games = () => {
  return(
    <div>
      <GetGames/>
    </div>
  )
}
export default Games;