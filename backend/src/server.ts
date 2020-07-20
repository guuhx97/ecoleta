import express from "express";

const app = express();

app.get("/users", (req, res) => {
  console.log("Listagem de usuários");
  res.json(["Julios", "Joao", "carlos"]);
});

app.listen(3333);
