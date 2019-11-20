import React, { useState, useGlobal } from "reactn";
import client from "../api/client";
import { Redirect } from "react-router-dom";
import NumberFormat from "react-number-format";
import "./CreateBet.css";



const MoneyForm = ({ currentBet }) => {
  const [teamChoice, setTeamChoice] = useState(null);
  const handleTeamChange = e => setTeamChoice(e.target.value);

  const [confirmBet, setConfirmBet] = useGlobal("confirmBet");
  const [betSelected, setBetSelected] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const [wager, setWager] = useState();
  const teamSide = teamChoice === "home" ? true : false;
  const betOdds =
    teamSide === true
      ? currentBet.moneyLine.moneyLine.homeLine.decimal
      : currentBet.moneyLine.moneyLine.awayLine.decimal;
  const accepterOdds =
    teamSide === true
      ? currentBet.moneyLine.moneyLine.awayLine.decimal
      : currentBet.moneyLine.moneyLine.homeLine.decimal;

  const handleSubmit = async e => {
    e.preventDefault();
    if (teamChoice !== null) {
      setConfirmBet({
        homeAway: teamSide,
        homeReferences: currentBet.homeReferences,
        awayReferences: currentBet.awayReferences,
        game: currentBet.game,
        event_time: currentBet.game.startTime,
        odds: betOdds,
        accepterOdds: accepterOdds,
        payOut: Math.round((wager * betOdds - wager) * 100) / 100,
        accepterPayOut: Math.round((wager * accepterOdds - wager) * 100) / 100,
        wager: wager,
        betType: "moneyLine",
        betTypeData: currentBet.moneyLine
      });
      setBetSelected(true);
    } else setSubmitError(true);
  };

  return (
    <>
      {betSelected && <Redirect to="/confirm-bet" />}
      <div className="forms">
        <form onSubmit={handleSubmit}>
          <div>
            <label for="away">
              {currentBet.awayReferences.city} {currentBet.awayReferences.name}
              &nbsp;
            </label>
            <input
              id="away"
              type="radio"
              name="money"
              value="away"
              onChange={handleTeamChange}
              checked={teamChoice === "away"}
            />
          </div>
          <strong>
            Odds: {currentBet.moneyLine.moneyLine.awayLine.decimal}
          </strong>
          <div>
            <div>
              <strong>@</strong>
            </div>
            <label for="home">
              {currentBet.homeReferences.city} {currentBet.homeReferences.name}
              &nbsp;
              <input
                id="home"
                type="radio"
                name="money"
                value="home"
                onChange={handleTeamChange}
                checked={teamChoice === "home"}
              />
              {submitError && (
                <div className="error-message">
                  You must select {currentBet.homeReferences.name} or{" "}
                  {currentBet.awayReferences.name}
                </div>
              )}
            </label>
            <div>
              <strong>
                Odds: {currentBet.moneyLine.moneyLine.homeLine.decimal}
              </strong>
            </div>
            <div>
              <NumberFormat
                name="wager"
                onValueChange={e => setWager(e.floatValue)}
                decimalScale="2"
                value={wager}
                displayType={"input"}
                thousandSeparator={true}
                prefix={"$"}
                isNumericString={true}
                placeholder="Wager"
              />
              <NumberFormat
                name="payOut"
                decimalScale="2"
                value={wager * betOdds}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
                placeholder="Wager"
              />
            </div>
            <button>Submit Bet</button>
          </div>
        </form>
      </div>
    </>
  );
};
const SpreadForm = ({ currentBet }) => {
  const [teamChoice, setTeamChoice] = useState(null);
  const handleTeamChange = event => {
    setTeamChoice(event.target.value);
  };
  const [confirmBet, setConfirmBet] = useGlobal("confirmBet");
  const [betSelected, setBetSelected] = useState(false);
  const [wager, setWager] = useState();

  const teamSide = teamChoice === "home" ? true : false;
  const [submitError, setSubmitError] = useState(false);

  const betOdds =
    teamSide === true
      ? currentBet.pointSpread.pointSpread.homeLine.decimal
      : currentBet.pointSpread.pointSpread.awayLine.decimal;

  const accepterOdds =
    teamSide === true
      ? currentBet.pointSpread.pointSpread.awayLine.decimal
      : currentBet.pointSpread.pointSpread.homeLine.decimal;

  const handleSubmit = async e => {
    e.preventDefault();
    if (teamChoice !== null) {
      setConfirmBet({
        homeAway: teamSide,
        homeReferences: currentBet.homeReferences,
        awayReferences: currentBet.awayReferences,
        game: currentBet.game,
        event_time: currentBet.game.startTime,
        odds: betOdds,
        accepterOdds: accepterOdds,
        payOut: Math.round((wager * betOdds - wager) * 100) / 100,
        accepterPayOut: Math.round((wager * accepterOdds - wager) * 100) / 100,
        wager: wager,
        betType: "pointSpread",
        betTypeData: currentBet.pointSpread
      });
      setBetSelected(true);
    } else setSubmitError(true);
  };
  return (
    <>
      {betSelected && <Redirect to="/confirm-bet" />}
      <div className="forms">
        <form onSubmit={handleSubmit}>
          <div>
            <label for="away">
              {currentBet.awayReferences.city} {currentBet.awayReferences.name}
              &nbsp;
              <strong>{currentBet.pointSpread.pointSpread.awaySpread}</strong>
            </label>
            <input
              type="radio"
              name="spread"
              value="away"
              onChange={handleTeamChange}
              checked={teamChoice === "away"}
            />
            <div>
              <strong>
                Odds: {currentBet.pointSpread.pointSpread.awayLine.decimal}
              </strong>
            </div>
          </div>
          <strong>@</strong>
          <div>
            <label for="home">
              {currentBet.homeReferences.city} {currentBet.homeReferences.name}
              &nbsp;
              <strong>{currentBet.pointSpread.pointSpread.homeSpread}</strong>
            </label>
            <input
              type="radio"
              name="spread"
              value="home"
              onChange={handleTeamChange}
              checked={teamChoice === "home"}
            />
            {submitError && (
              <em>
                You must select {currentBet.homeReferences.name} or{" "}
                {currentBet.awayReferences.name}
              </em>
            )}
            <div>
              <strong>
                Odds: {currentBet.pointSpread.pointSpread.homeLine.decimal}
              </strong>
            </div>
            <div>
              <NumberFormat
                name="wager"
                decimalScale="2"
                onValueChange={e => setWager(e.floatValue)}
                value={wager}
                displayType={"input"}
                thousandSeparator={true}
                prefix={"$"}
                isNumericString={true}
                placeholder="Wager"
              />
              <NumberFormat
                name="payOut"
                decimalScale="2"
                value={wager * betOdds}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
                placeholder="Wager"
              />
            </div>
            <button>Submit Bet</button>
          </div>
        </form>
      </div>
    </>
  );
};

const OverUnderForm = ({ currentBet }) => {
  const [overUnder, setOverUnder] = useState(null);
  const handleOverUnderChange = event => {
    setOverUnder(event.target.value);
  };
  const [confirmBet, setConfirmBet] = useGlobal("confirmBet");
  const [betSelected, setBetSelected] = useState(false);
  const [wager, setWager] = useState();

  const teamSide = overUnder === "home" ? true : false;

  const betOdds =
    teamSide === true
      ? currentBet.overUnder.overUnder.overLine.decimal
      : currentBet.overUnder.overUnder.underLine.decimal;
  const accepterOdds =
    teamSide === true
      ? currentBet.overUnder.overUnder.overLine.decimal
      : currentBet.overUnder.overUnder.underLine.decimal;

  const [submitError, setSubmitError] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (overUnder !== null) {
      // await client.post("/bets", {
      //   homeAway: teamSide,
      //   homeReferences: currentBet.homeReferences,
      //   awayReferences: currentBet.awayReferences,
      //   game: currentBet.game,
      //   event_time: currentBet.game.startTime,
      //   odds: betOdds,
      //   payOut: wager * betOdds,
      //   wager: wager,
      //   betType: currentBet.overUnder
      // });
      setConfirmBet({
        homeAway: teamSide,
        homeReferences: currentBet.homeReferences,
        awayReferences: currentBet.awayReferences,
        game: currentBet.game,
        event_time: currentBet.game.startTime,
        odds: betOdds,
        accepterOdds: accepterOdds,
        payOut: Math.round((wager * betOdds - wager) * 100) / 100,
        accepterPayOut: Math.round((wager * accepterOdds - wager) * 100) / 100,
        wager: wager,
        betType: "overUnder",
        betTypeData: currentBet.overUnder
      });
      setBetSelected(true);
    } else setSubmitError(true);
  };

  return (
    <>
      {betSelected && <Redirect to="/confirm-bet" />}
      <div className="forms">
        <form onSubmit={handleSubmit}>
          <div>
            {currentBet.awayReferences.city} {currentBet.awayReferences.name}
            &nbsp;
            <strong>@</strong>
            <div></div>
            <div>
              {currentBet.homeReferences.city} {currentBet.homeReferences.name}
            </div>
            <div>Total points: {currentBet.overUnder.overUnder.overUnder}</div>
            <div>
              <label>
                Over{" "}
                <strong>
                  Odds: {currentBet.overUnder.overUnder.overLine.decimal}
                </strong>
              </label>
              <input
                id="home"
                type="radio"
                name="homeAway"
                value="home"
                onChange={handleOverUnderChange}
                checked={overUnder === "home"}
              />
            </div>
            <label>
              Under
              <strong>
                {" "}
                Odds: {currentBet.overUnder.overUnder.underLine.decimal}
              </strong>
            </label>
            <input
              id="away"
              name="homeAway"
              type="radio"
              value="away"
              onChange={handleOverUnderChange}
              checked={overUnder === "away"}
            />
            {submitError && <em>You must select Over or Under</em>}
          </div>
          <div>
            <NumberFormat
              name="wager"
              onValueChange={e => setWager(e.floatValue)}
              value={wager}
              decimalScale="2"
              displayType={"input"}
              thousandSeparator={true}
              prefix={"$"}
              isNumericString={true}
              placeholder="Wager"
            />
            <NumberFormat
              name="payOut"
              value={wager * betOdds - wager}
              decimalScale="2"
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              placeholder="Wager"
            />
          </div>
          <button>Submit Bet</button>
        </form>
      </div>
    </>
  );
};

const CreateBet = () => {
  const { 0: token } = useGlobal("token");
  const { 0: currentBet } = useGlobal("currentBet");
  const [betType, setBetType] = useState("over-under");
  const [wagerAmount, setWagerAmount] = useState(null);

  return (
    <>
      <h1>Create a bet</h1>

      <div className="forms-button-container">
      {currentBet.pointSpread && (
        <div className="form-button">
          <button onClick={() => setBetType("spread")}>Spread</button>
        </div>
      )}
        {currentBet.moneyLine && (
        <div className="form-button">
          <button onClick={() => setBetType("money")}>Money</button>
        </div>
        )}
        {currentBet.overUnder && (
          <div className="form-button">
            <button onClick={() => setBetType("over-under")}>Over/Under</button>
          </div>
        )}
        
      </div>

      <div>
      {currentBet.pointSpread && (
        <div>
        {betType === "spread" && <SpreadForm currentBet={currentBet} />}
        </div>
      )}
        {currentBet.moneyLine && (
          <div>
        {betType === "money" && <MoneyForm currentBet={currentBet} />}
        </div>
        )}
        
        {currentBet.overUnder && (
          <div>
        {betType === "over-under" && <OverUnderForm currentBet={currentBet} />}
        </div>
        )}
       
      </div>
    </>
  );
};

export default CreateBet;
