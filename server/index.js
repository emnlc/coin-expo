require("dotenv").config();
const express = require("express");
const axios = require("axios");
const Fuse = require("fuse.js");
const app = express();
const cors = require("cors");

cachedData = null;
cacheTime = 0;

coinGeckoList = {};
let fuse;

app.use(
  cors({
    origin: process.env.DEV,
  })
);

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

const getCoinGeckoList = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/list"
    );

    const data = response.data;
    data.forEach((obj) => {
      const key = `${obj.symbol.toLowerCase()} ${obj.name.toLowerCase()} ${obj.id.toLowerCase()}`;
      coinGeckoList[key] = obj;
    });

    fuse = new Fuse(data, {
      keys: [
        { name: "id", weight: 0.1 }, // Lowest weight
        { name: "symbol", weight: 0.4 }, // Higher weight
        { name: "name", weight: 0.5 }, // Highest weight
      ],
      includeScore: true,
    });
  } catch (error) {
    // console.log(coinGeckoList);
    console.log("Error fetching data: ", error);
  }
};

app.get("/coins", async (req, res) => {
  if (!cachedData) {
    return res.status(500).send("Data not available yet!");
  }

  res.send(cachedData);
});

app.get("/coins/global-metrics", async (req, res) => {
  try {
    const response = await axios.get(
      `https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.CMC_KEY,
        },
      }
    );

    console.log("global metrics fetched!");
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
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

app.get("/coins/watchlist/:watchlist", async (req, res) => {
  try {
    const response = await axios.get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?slug=${req.params.watchlist}`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.CMC_KEY,
        },
      }
    );
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
});

app.get("/coingecko/list", async (req, res) => {
  if (!coinGeckoList) {
    return res.status(500).send("Data not available yet!");
  }

  res.send(coinGeckoList);
});

app.get("/coingecko/search", (req, res) => {
  const { symbol, name, slug } = req.query;

  if (symbol && name && slug) {
    // search with the symbol and name
    const results = fuse
      .search({ $or: [{ symbol: symbol }, { name: name }, { slug: slug }] })
      .map((result) => result.item);

    // return item
    if (results.length > 0) {
      return res.json(results[0]);
    } else {
      return res.status(404).send("No matches found.");
    }
  }

  res.status(400).send("Please provide both symbol and name for fuzzy search!");
});

app.listen(3000, async () => {
  console.log("Server is listening on port 3000");
  await getCoinGeckoList();
  await getCoins();

  setInterval(getCoins, 15 * 60 * 1000); // update every 15 minutes
  setInterval(getCoinGeckoList, 24 * 60 * 60 * 1000); // update every 24 hours
});
