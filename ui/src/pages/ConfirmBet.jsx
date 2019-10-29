import React, { useState, useGlobal } from "reactn";
import client from "../api/client";


const ConfirmBetForm = () => {
  const { 0: confirmBet } = useGlobal("confirmBet");
  const { 0: token } = useGlobal("token");
  const betParameters = () => {
    if (confirmBet.betType.hasOwnProperty("overUnder"))
      if (confirmBet.homeAway === true)
        return (
          <div>
            <div>
              total combined points to be over {confirmBet.betType.overUnder}{" "}
              points
            </div>
            <div>
              wagering: {confirmBet.wager} to win: {confirmBet.payOut}
            </div>
          </div>
        );
      else
        return (
          <div>
            <div>
              total combined points to be under {confirmBet.betType.overUnder}{" "}
              points
            </div>
            <div>
              wagering: {confirmBet.wager} to win: {confirmBet.payOut}
            </div>
          </div>
        );
    else if (confirmBet.betType.hasOwnProperty("pointSpread"))
    if (confirmBet.homeAway === true)
      return (
        <div>
          <div>
            {confirmBet.homeReferences.city} {confirmBet.homeReferences.name} at
            home {confirmBet.betType.pointSpread.homeSpread}
          </div>
          <div>
            wagering: {confirmBet.wager} to win: {confirmBet.payOut}
          </div>
        </div>
      );
    else
      return (
        <div>
          <div>
            {confirmBet.awayReferences.city} {confirmBet.awayReferences.name}{" "}
            {confirmBet.betType.pointSpread.awaySpread} on the road
          </div>
          <div>
            wagering: {confirmBet.wager} to win: {confirmBet.payOut}
          </div>
        </div>
      );
    else
    if(confirmBet.homeAway === true)
    return (
      <div>
        <div>
          {confirmBet.homeReferences.city} {confirmBet.homeReferences.name} at
          home 
        </div>
        <div>
          wagering: {confirmBet.wager} to win: {confirmBet.payOut}
        </div>
      </div>
    );
    else
      return (
        <div>
          <div>
            {confirmBet.awayReferences.city} {confirmBet.awayReferences.name}{" "}
             on the road
          </div>
          <div>
            wagering: {confirmBet.wager} to win: {confirmBet.payOut}
          </div>
        </div>
      );
  };

  const postBet = async (e) => {
    e.preventDefault();
    const { data } = await client.post("/bets", {
      ...confirmBet,
      [e.target.name]: e.target.value
    }, {
      headers: { Authorization: `Bearer ${token}`}
    });

  };
  return (
    <div>

    <div>
      <h1>{betParameters()}</h1>
    </div>
    <div>
      <form onSubmit={postBet}>
      <button>Create Bet</button>
      </form>
    </div>
    </div>
  );
};
export default ConfirmBetForm;
