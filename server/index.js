const express = require("express");
const axios = require("axios");
const app = express();

app.get("/coins", async (req, res) => {
  try {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map",
      {
        headers: {
          "X-CMC_PRO_API_KEY": "1cdaabce-93ec-4911-a45b-cd7aa77b42a0",
        },
      }
    );
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
});

app.listen(3000, () => console.log("Server is listening on port 3000"));
