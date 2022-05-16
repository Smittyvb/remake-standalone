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
    execSync(`cd /tmp/standalone && git config user.email '${escapeShell(commit.email)}'`);
    execSync(`cd /tmp/standalone && git config user.name '${escapeShell(commit.name)}'`);
    execSync(`export GIT_COMMITTER_DATE="${escapeShell(commit.date)}" && cd /tmp/standalone && git add . && git commit --allow-empty -m "${escapeShell(commit.msg)}" ${commit.msgExtra ? `-m '${escapeShell(commit.msgExtra)}'` : ""} --author="${escapeShell(commit.name)} <${escapeShell(commit.email)}>" --date="${escapeShell(commit.date)}"`)
}

// doCommit(commits[20])
for (let i = commits.length - 1; i >= 0; i--) doCommit(commits[i]);
