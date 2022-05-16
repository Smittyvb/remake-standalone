const commits = require("./commits.json");
// const fetch = require("node-fetch");
const { execSync } = require("child_process");

execSync("mkdir standalone");
execSync("cd standalone");

const commitUrl = c => `https://sourcegraph.com/github.com/uup-dump/standalone@${c}/-/raw?format=zip`;

function doCommit(commit) {
    execSync(`cd standalone && rm -rf ~/remake-standalone/standalone/* && rm -rf .github && wget -O raw.zip "${commit.hash}"`);
    execSync("cd standalone && unzip raw -d . && rm raw.zip");
    execSync(`cd standalone && git add . && git commit -m "${commit.msg}" --author="${commit.name} <${commit.email}>" --date="${commit.date}"`)
}

doCommit(commits[20])
// for (let i = commits.length; i > 0; i--) doCommit(commits[i]);
