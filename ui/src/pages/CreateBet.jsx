import React, { useState, useEffect, useGlobal } from "reactn";
import client from "../api/client";
import NumberFormat from "react-number-format";

const MoneyForm = ({ currentBet }) => {
  const [teamChoice, setTeamChoice] = useState("home");
  const handleTeamChange = e => setTeamChoice(e.target.value);

  return (
    <form>
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
      </div>
    </form>
  );
};
const SpreadForm = ({ currentBet }) => {
  const [teamChoice, setTeamChoice] = useState("home");
  const handleTeamChange = event => {
    setTeamChoice(event.target.value);
  };
  return (
    <form>
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
      </div>
    </form>
  );
};
const OverUnderForm = ({ currentBet }) => {
  const [overUnder, setOverUnder] = useState("over");
  const handleOverUnderChange = event => {
    setOverUnder(event.target.value);
  };
  return (
    <form>
      <div>
        {currentBet.awayReferences.city} {currentBet.awayReferences.name}&nbsp;
        <strong>@</strong>
        <div></div>
        <div>
          {currentBet.homeReferences.city} {currentBet.homeReferences.name}
        </div>
        <div>Total points: {currentBet.overUnder.overUnder.overUnder}</div>
        <div>
          <label for="over">
            Over{" "}
            <strong>
              Odds: {currentBet.overUnder.overUnder.overLine.decimal}
            </strong>
          </label>
          <input
            type="radio"
            name="over-under"
            value="over"
            onChange={handleOverUnderChange}
            checked={overUnder === "over"}
          />
        </div>
        <label for="under">
          Under
          <strong>
            {" "}
            Odds: {currentBet.overUnder.overUnder.underLine.decimal}
          </strong>
        </label>
        <input
          type="radio"
          name="over-under"
          value="under"
          onChange={handleOverUnderChange}
          checked={overUnder === "under"}
        />
      </div>
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    await client.post("/")
  }

  return (
    <>
      <h1>Create a bet:</h1>
      <button onClick={() => setBetType("spread")}>Spread</button>
      <button onClick={() => setBetType("money")}>Money</button>
      <button onClick={() => setBetType("over-under")}>Over/Under</button>
      <form>
        {betType === "spread" && <SpreadForm currentBet={currentBet} />}
        {betType === "money" && <MoneyForm currentBet={currentBet} />}
        {betType === "over-under" && <OverUnderForm currentBet={currentBet} />}
        <div>
          <NumberFormat
            value={null}
            displayType={"input"}
            thousandSeparator={true}
            prefix={"$"}
            placeholder="Wager"
          />
        </div>
        <div>
          <NumberFormat
            value={null}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            placeholder="Wager"
          />
        </div>
      </form>
    </>
  );
};

export default CreateBet;
