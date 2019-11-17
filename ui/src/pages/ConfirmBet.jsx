import React, { useState, useGlobal } from "reactn";
import client from "../api/client";
import { Redirect } from "react-router-dom";

const ConfirmBetForm = () => {
  const { 0: token } = useGlobal("token");
  const { 0: confirmBet } = useGlobal("confirmBet");

  const gameInfo = () => {
    return (
      <div>
        <div>NFL week {confirmBet.game.week}</div>
        <div>
          {confirmBet.homeReferences.city} {confirmBet.homeReferences.name}
        </div>
        <div>@</div>
        <div>
          {confirmBet.awayReferences.city} {confirmBet.awayReferences.name}
        </div>
      </div>
    );
  };
  const payOutInfo = () => {
    return (
      <div>
        <div>wagering: {confirmBet.wager}</div>
        <div>
          if you win you will collect {confirmBet.payOut} from your opponent
        </div>
        <div>
          if you lose you will owe {confirmBet.accepterPayOut} to your opponent
        </div>
      </div>
    );
  };
  const betParameters = () => {
    console.log(confirmBet);
    if (confirmBet.betType === "overUnder")
      if (confirmBet.homeAway === true)
        return (
          <div className="center-wrapper">
            <div className="text">
              betting that the total combined points of the game to be over{" "}
              {confirmBet.betTypeData.overUnder.overUnder} points
            </div>
          </div>
        );
      else
        return (
          <div className="center-wrapper">
            <div className="text">
              betting that the total combined points to be under{" "}
              {confirmBet.betTypeData.overUnder.overUnder} points
            </div>
          </div>
        );
    else if (confirmBet.betType === "pointSpread")
      if (confirmBet.homeAway === true)
        if (confirmBet.betTypeData.pointSpread.homeSpread > 0)
          return (
            <div className="center-wrapper">
              <div className="text">
                betting that the {confirmBet.homeReferences.city}{" "}
                {confirmBet.homeReferences.name} will win by{" "}
                {confirmBet.betTypeData.pointSpread.homeSpread} points or more.
              </div>
            </div>
          );
        else
          return (
            <div className="center-wrapper">
              <div className="text">
                betting that the {confirmBet.homeReferences.city}{" "}
                {confirmBet.homeReferences.name} will not lose by more then{" "}
                {confirmBet.betTypeData.pointSpread.homeSpread} points.
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
        <div>{gameInfo()}</div>
        <div>
          <h1>{betParameters()}</h1>
        </div>
        <div>{payOutInfo()}</div>
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
