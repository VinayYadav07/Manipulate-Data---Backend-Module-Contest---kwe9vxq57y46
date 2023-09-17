const fs = require("fs");
const express = require("express");
const dotenv = require("dotenv");
const resources = JSON.parse(fs.readFileSync(`${__dirname}/data/resources.json`));

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Endpoint to get all resources
app.get("/resources", (req, res) => {
  res.status(200).json(resources);
});

// Endpoint to filter resources by category
app.get("/resources", (req, res) => {
  const { category } = req.query;
  if (category) {
    const filteredResources = resources.filter(
      (resource) => resource.category === category
    );
    res.status(200).json(filteredResources);
  } else {
    res.status(200).json(resources);
  }
});

// Endpoint to get sorted resources by name
app.get("/resources/sort", (req, res) => {
  const { sortBy } = req.query;
  if (sortBy === "name") {
    const sortedResources = [...resources].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    res.status(200).json(sortedResources);
  } else {
    res.status(200).json(resources);
  }
});

// Endpoint to group resources by category
app.get("/resources/group", (req, res) => {
  const groupedResources = resources.reduce((acc, resource) => {
    if (!acc[resource.category]) {
      acc[resource.category] = [];
    }
    acc[resource.category].push(resource);
    return acc;
  }, {});
  res.status(200).json(groupedResources);
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, server }; // Export both app and server