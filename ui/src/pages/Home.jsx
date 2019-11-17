import React, { useGlobal } from "reactn";
import betImage from "../images/sports-betting9.jpg"
import angryTrump from "../images/angry-trump.jpg"
const Home = () => {
  const { 0: token } = useGlobal("token");
if(token === null)
  return (
    <div>
      <h1>Wager Placer</h1>
      <img src={betImage} />
      <img width="290px" height="200px" src={angryTrump}/>
    </div>
  )
  else
  return (
    <div> 
    <h1>Wager Placer</h1>
    <img src={betImage} />
    <div >{JSON.stringify(token)}</div>
  </div>
  )
}

export default Home;