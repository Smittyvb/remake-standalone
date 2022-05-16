// show all on https://sourcegraph.com/github.com/uup-dump/standalone/-/commits
[...document.querySelectorAll(".GitCommitNode-module__message-toggle_1N76-")].map(b => b.click());
console.log(JSON.stringify([...document.querySelectorAll(".GitCommitNode-module__byline_2cHFd")].map(x => ({
    msg: x.querySelector(".AnchorLink-module__anchor-link_2e_jy").textContent,
    email: x.querySelector("div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > span:nth-child(2)").dataset.tooltip,
    name: x.querySelector("div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > span:nth-child(2)").textContent,
    date: x.querySelector("div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > span:nth-child(3)").dataset.tooltip,
    hash: x.querySelector(".AnchorLink-module__anchor-link_2e_jy").href.split("/")[8],
    msgExtra: x.querySelector(".GitCommitNode-module__message-body_3sp3D")?.textContent
}))))
