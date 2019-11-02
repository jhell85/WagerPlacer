import React, { useState, useGlobal } from "reactn";
import client from "../api/client";
import { Redirect } from "react-router-dom";

const ConfirmBetForm = () => {
  const { 0: confirmBet } = useGlobal("confirmBet");
  const { 0: token } = useGlobal("token");
  const betParameters = () => {
    if (confirmBet.betType === "overUnder")
      if (confirmBet.homeAway === true)
        return (
          <div className="center-wrapper">
            <div className="text">
              total combined points to be over {confirmBet.betTypeData.overUnder.overUnder}{" "}
              points
            </div>
            <div>
              wagering: {confirmBet.wager} to win: {confirmBet.payOut}
            </div>
          </div>
        );
      else
        return (
          <div className="center-wrapper">
            <div className="text">
              total combined points to be under {confirmBet.betTypeData.overUnder.overUnder}{" "}
              points
            </div>
            <div>
              wagering: {confirmBet.wager} to win: {confirmBet.payOut}
            </div>
          </div>
        );
    else if (confirmBet.betType === "pointSpread")
      if (confirmBet.homeAway === true)
        return (
          <div className="center-wrapper">
            <div className="text">
              {confirmBet.homeReferences.city} {confirmBet.homeReferences.name}{" "}
              at home {confirmBet.betTypeData.pointSpread.homeSpread}
            </div>
            <div>
              wagering: {confirmBet.wager} to win: {confirmBet.payOut}
            </div>
          </div>
        );
      else
        return (
          <div className="center-wrapper">
            <div className="text">
              {confirmBet.awayReferences.city} {confirmBet.awayReferences.name}{" "}
              {confirmBet.betTypeData.pointSpread.awaySpread} on the road
            </div>
            <div>
              wagering: {confirmBet.wager} to win: {confirmBet.payOut}
            </div>
          </div>
        );
    else if (confirmBet.homeAway === true)
      return (
        <div className="center-wrapper">
          <div className="text">
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
        <div className="center-wrapper">
          <div className="text">
            {confirmBet.awayReferences.city} {confirmBet.awayReferences.name} on
            the road
          </div>
          <div>
            wagering: {confirmBet.wager} to win: {confirmBet.payOut}
          </div>
        </div>
      );
  };

  const [betSelected, setBetSelected] = useState(false);
  const postBet = async e => {
    e.preventDefault();
    const { data } = await client.post(
      "/bets",
      {
        ...confirmBet,
        [e.target.name]: e.target.value
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    setBetSelected(true);
  };
  return (
    <>
    {betSelected && <Redirect to="/profile" />}
    <div className="center-wrapper">
      <div>
        <h1>{betParameters()}</h1>
      </div>
      <div>
        <form onSubmit={postBet}>
          <button>Create Bet</button>
        </form>
      </div>
    </div>
    </>
  );
};
export default ConfirmBetForm;
