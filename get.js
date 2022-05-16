const commits = require("./commits.json");
// const fetch = require("node-fetch");
const { execSync } = require("child_process");

execSync("rm -rf /tmp/standalone");
execSync("mkdir /tmp/standalone && cd /tmp/standalone && git init");

const commitUrl = c => `https://sourcegraph.com/github.com/uup-dump/standalone@${c}/-/raw?format=zip`;
function escapeShell(arg) {
    return arg.replace(/'/g, `'\\''`).replace(/`/g, "\\`");
}


function doCommit(commit) {
    execSync(`cd /tmp/standalone && rm -rf /tmp/standalone/* && rm -rf .github .gitmodules && wget -O raw.zip '${escapeShell(commitUrl(commit.hash))}'`);
    execSync("cd /tmp/standalone && unzip raw -d . && rm raw.zip");
    execSync(`GIT_COMITTER_NAME="${escapeShell(commit.name)}" GIT_COMITTER_EMAIL="${escapeShell(commit.email)}" cd /tmp/standalone && git add . && git commit --allow-empty -m "${escapeShell(commit.msg)}" --author="${escapeShell(commit.name)} <${escapeShell(commit.email)}>" --date="${escapeShell(commit.date)}"`)
}

// doCommit(commits[20])
for (let i = commits.length - 1; i >= 0; i--) doCommit(commits[i]);
