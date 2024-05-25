require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();

cachedData = null;
cacheTime = 0;

const getCoins = async () => {
  try {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=1000",
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.CMC_KEY,
        },
      }
    );
    cachedData = response.data;
    cacheTime = Date.now();
    console.log("Data fetched!");
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

app.get("/coins", async (req, res) => {
  if (!cachedData) {
    return res.status(500).send("Data not available yet!");
  }

  res.send(cachedData);
});

app.get("/coins/:coin", async (req, res) => {
  try {
    const response = await axios.get(
      `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?slug=${req.params.coin}`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.CMC_KEY,
        },
      }
    );

    console.log(req.params.coin + " data fetched!");
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
});

app.listen(3000, async () => {
  console.log("Server is listening on port 3000");
  await getCoins();

  setInterval(getCoins, 15 * 60 * 1000); // update every 10 minutes
});
