const { AsyncRouter } = require("express-async-router");
const axios = require("axios");
const authToken = require("../helpers/apiToken");


const getGames = async () => {
  const response = await axios.get("https://api.mysportsfeeds.com/v2.1/pull/nba/current/week/3/games.json", {
      headers: {
          Authorization: `Basic ${authToken}`
      }
  })

  const data = response.data;
  console.log(data)
  return data

}