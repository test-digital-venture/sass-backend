import express from "express";

const app = express();

app.get("/", (req, res) => {
  return res.status(200).json({ message: "OK" });
});
app.get("/test", (req, res) => {
  return res.status(200).json({
    message: "OK",
    data: {
      users: [],
      status: "OK",
    },
  });
});

app.all("*", (_, res) => {
  return res.sendStatus(405);
});

export default app;
