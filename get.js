const commits = require("./commits.json");
const fetch = require("node-fetch");
const { execSync } = require("child_process");

execSync("mkdir standalone");
execSync("cd standalone");

