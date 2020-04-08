const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
  return res.json(repositories);
});

app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body;

  const repo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repo);

  return res.status(202).json(repo);
});

app.put("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const { title, url, techs } = req.body;

  const index = repositories.findIndex(x => x.id === id);

  if(index < 0){
    return res.status(400).json({ error: 'Repository not found.' })
  }

  const repo = {
    id,
    title,
    url,
    techs,
    likes: repositories[index].likes
  }

  repositories[index] = repo;

  return res.json(repo);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const index = repositories.findIndex(x => x.id === id);
  
  if(index < 0){
    return res.status(400).json({ error: 'Repository not found.' })
  }

  repositories.splice(index, 1);

  return res.status(204).json();
});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;

  const index = repositories.findIndex(x => x.id === id);

  if(index < 0){
    return res.status(400).json({ error: 'Repository not found.' })
  }

  repositories[index].likes += 1;

  return res.json(repositories[index]);
});

module.exports = app;
