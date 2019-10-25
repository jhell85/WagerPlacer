import React, { useState, useGlobal } from "reactn";
import client from "../api/client";
import NumberFormat from "react-number-format";

const MoneyForm = ({ currentBet }) => {
  const [teamChoice, setTeamChoice] = useState(null);
  const handleTeamChange = e => setTeamChoice(e.target.value);

  const [wager, setWager] = useState();
  const teamSide = teamChoice === "home" ? true : false;
  const handleSubmit = async e => {
    e.preventDefault();

    await client.post("/bets", {
      homeAway: teamSide,
      homeReferences: currentBet.homeReferences,
      awayReferences: currentBet.awayReferences,
      game: currentBet.game,
      event_time: currentBet.game.startTime,
      odds: betOdds,
      payOut: wager * betOdds,
      wager: wager,
      betType: currentBet.pointSpread
    });
  };
  const betOdds =
    teamSide === true
      ? currentBet.overUnder.overUnder.overLine.decimal
      : currentBet.overUnder.overUnder.underLine.decimal;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label for="away">
          {currentBet.awayReferences.city} {currentBet.awayReferences.name}
          &nbsp;
        </label>
        <input
          type="radio"
          name="money"
          value="away"
          onChange={handleTeamChange}
          checked={teamChoice === "away"}
        />
      </div>
      <strong>Odds: {currentBet.moneyLine.moneyLine.awayLine.decimal}</strong>
      <div>
        <div>
          <strong>@</strong>
        </div>
        <label for="home">
          {currentBet.homeReferences.city} {currentBet.homeReferences.name}
          &nbsp;
          <input
            type="radio"
            name="money"
            value="home"
            onChange={handleTeamChange}
            checked={teamChoice === "home"}
          />
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
          value={wager}
          displayType={"input"}
          thousandSeparator={true}
          prefix={"$"}
          isNumericString={true}
          placeholder="Wager"
        />
        <NumberFormat
          name="payOut"
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
  );
};
const SpreadForm = ({ currentBet }) => {
  const [teamChoice, setTeamChoice] = useState();
  const handleTeamChange = event => {
    setTeamChoice(event.target.value);
  };
  const [wager, setWager] = useState();

  const teamSide = teamChoice === "home" ? true : false;

  const betOdds =
    teamSide === true
      ? currentBet.overUnder.overUnder.overLine.decimal
      : currentBet.overUnder.overUnder.underLine.decimal;

      const handleSubmit = async e => {
        e.preventDefault();
    
        await client.post("/bets", {
          homeAway: teamSide,
          homeReferences: currentBet.homeReferences,
          awayReferences: currentBet.awayReferences,
          game: currentBet.game,
          event_time: currentBet.game.startTime,
          odds: betOdds,
          payOut: wager * betOdds,
          wager: wager,
          betType: currentBet.pointSpread
        });
      };
  return (
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
        <div>
          <strong>
            Odds: {currentBet.pointSpread.pointSpread.homeLine.decimal}
          </strong>
        </div>
        <div>
        <NumberFormat
          name="wager"
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
  );
};
const OverUnderForm = ({ currentBet }) => {
  const [overUnder, setOverUnder] = useState("home");
  const handleOverUnderChange = event => {
    setOverUnder(event.target.value);
  };

  const [wager, setWager] = useState();

  const teamSide = overUnder === "home" ? true : false;

  const betOdds =
    teamSide === true
      ? currentBet.overUnder.overUnder.overLine.decimal
      : currentBet.overUnder.overUnder.underLine.decimal;

  // const handlePayOutChange = (wager * betOdds)

  const handleSubmit = async e => {
    e.preventDefault();

    await client.post("/bets", {
      homeAway: teamSide,
      homeReferences: currentBet.homeReferences,
      awayReferences: currentBet.awayReferences,
      game: currentBet.game,
      event_time: currentBet.game.startTime,
      odds: betOdds,
      payOut: wager * betOdds,
      wager: wager,
      betType: currentBet.overUnder
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {currentBet.awayReferences.city} {currentBet.awayReferences.name}&nbsp;
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
          name="homeAway"
          type="radio"
          value="away"
          onChange={handleOverUnderChange}
          checked={overUnder === "away"}
        />
      </div>
      <div>
        <NumberFormat
          name="wager"
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
          value={wager * betOdds}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
          placeholder="Wager"
        />
      </div>
      <button>Submit Bet</button>
    </form>
  );
};

const CreateBet = () => {
  const { 0: token } = useGlobal("token");
  const { 0: currentBet } = useGlobal("currentBet");
  const [betType, setBetType] = useState("over-under");
  const [wagerAmount, setWagerAmount] = useState(null);

  const handleChange = e => {
    setWagerAmount({
      ...wagerAmount,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    await client.post("/bets");
  };

  return (
    <>
      <h1>Create a bet:</h1>
      <button onClick={() => setBetType("spread")}>Spread</button>
      <button onClick={() => setBetType("money")}>Money</button>
      <button onClick={() => setBetType("over-under")}>Over/Under</button>
      <div>
        {betType === "spread" && <SpreadForm currentBet={currentBet} />}
        {betType === "money" && <MoneyForm currentBet={currentBet} />}
        {betType === "over-under" && <OverUnderForm currentBet={currentBet} />}
        <div>
          <NumberFormat
            name="wager"
            value={null}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            placeholder="Wager"
          />
        </div>
      </div>
    </>
  );
};

export default CreateBet;
