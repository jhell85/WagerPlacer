import React, { useState, useEffect, useGlobal } from "reactn";
import client from "../api/client";
import NumberFormat from 'react-number-format';

const MoneyForm = ({ currentBet }) => {
  const [teamChoice, setTeamChoice] = useState("home")
  const handleTeamChange = (e) => setTeamChoice(e.target.value);

  return (
    <form>
      <div>
        <label for="away">
          {currentBet.awayReferences.city} {currentBet.awayReferences.name}&nbsp;
            </label>
        <input
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
          <strong>
            @
        </strong>
        </div>
        <label for="home">
          {currentBet.homeReferences.city} {currentBet.homeReferences.name}&nbsp;
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
  )
}

const CreateBet = () => {
  const { 0: token } = useGlobal("token");
  const { 0: currentBet } = useGlobal("currentBet")
  const [spread, setSpread] = useState('away')
  const [overUnder, setOverUnder] = useState('over')
  const [betType, setBetType] = useState("over-under");


  const handleSubmit = async (event) => {
    event.preventDefault();
  }

  const handleSpreadChange = (event) => {
    setSpread(event.target.value);
  }
  const handleOverUnderChange = (event) => {
    setOverUnder(event.target.value);
  }

  const overUnderForm = (

    <form onSubmit={handleSubmit}>
      <div>
        {currentBet.awayReferences.city} {currentBet.awayReferences.name}&nbsp;
            <strong>
          @
            </strong>
        <div>

        </div>
        <div>
          {currentBet.homeReferences.city} {currentBet.homeReferences.name}
        </div>
        <div>
          Total points: {currentBet.overUnder.overUnder.overUnder}
        </div>
        <label for="over">Over <strong>Odds: {currentBet.overUnder.overUnder.overLine.decimal}</strong></label>
        <input
          type="radio"
          name="over-under"
          value="over"
          onChange={handleOverUnderChange}
          checked={overUnder === "over"}
        />
        <label for="under">Under<strong> Odds: {currentBet.overUnder.overUnder.underLine.decimal}</strong></label>
        <input
          type="radio"
          name="over-under"
          value="under"
          onChange={handleOverUnderChange}
          checked={overUnder === "under"}
        />
        <div>
          {/* <input
        type="number"
        name="bet-amount" 
        onChange={handleSpreadChange}
        /> */}
          <NumberFormat value={2456981} displayType={'text'} thousandSeparator={true} prefix={'$'} />
        </div>


      </div>
    </form>

  )

  const spreadForm = (
    <form onSubmit={handleSubmit}>
      <div>
        <label for="away">
          {currentBet.awayReferences.city} {currentBet.awayReferences.name}&nbsp;
            <strong>
            {currentBet.pointSpread.pointSpread.awaySpread}
          </strong>
        </label>
        <input
          type="radio"
          name="spread"
          value="away"
          onChange={handleSpreadChange}
          checked={spread === "away"}
        />
        <div>
          <strong>
            Odds: {currentBet.pointSpread.pointSpread.awayLine.decimal}
          </strong>
        </div>
      </div>
      <strong>
        @
            </strong>
      <div>
        <label for="home">
          {currentBet.homeReferences.city} {currentBet.homeReferences.name}&nbsp;
            <strong>
            {currentBet.pointSpread.pointSpread.homeSpread}
          </strong>
        </label>
        <input
          type="radio"
          name="spread"
          value="home"
          onChange={handleSpreadChange}
          checked={spread === "home"}
        />
        <div>
          <strong>
            Odds: {currentBet.pointSpread.pointSpread.homeLine.decimal}
          </strong>
        </div>
      </div>
    </form>
  )
  return (
    <>
      <h1>Create a bet:</h1>
      <button onClick={() => setBetType("spread")}>Spread</button>
      <button onClick={() => setBetType("money")}>Money</button>
      <button onClick={() => setBetType("over-under")}>Over/Under</button>
      {betType === "spread" && spreadForm}
      {betType === "money" && <MoneyForm currentBet={currentBet} />}
      {betType === "over-under" && overUnderForm}

    </>
  )


}



export default CreateBet;