const express = require("express");
const app = express();
var cors = require("cors");
app.use(cors());
app.use(express.json());

app.post("/getSearches", async (req, res) => {
  console.log(req.body.placeid);
  console.log(req.body.from_date);
  console.log(req.body.to_date);

  const data = await fetch(
    "https://gya7b1xubh.execute-api.eu-west-2.amazonaws.com/default/HotelsSimulator",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: {
          ski_site: req.body.placeid,
          from_date: req.body.from_date,
          to_date: req.body.to_date,
          group_size: 2,
        },
      }),
    }
  ).then((res) => res.json());

  console.log(data.body.accommodations);
  res.status(200).json(data);
});

app.listen(3001, () => {
  console.log(`Example app listening on port 3001`);
});
