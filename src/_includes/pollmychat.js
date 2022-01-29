// timeout the voting
// optionally clear the poll from view

// !poll Which was the best boy band? [N'Sync, Backstreet Boys, Boyz II Men]

const optionTemplate = document.getElementById("option");
let numOptions = 0;
let totalVotes = 0;
const votes = {};
const voteQueue = [];
const voters = new Set();

const createPoll = (message) => {
  const poll = document.querySelector(".poll");
  const optionsRe = /\[(.+?)\]/m;
  const optionsMatch = message.match(optionsRe);
  const options = optionsMatch[1].split(",");

  const h1 = document.createElement("h1");
  const question = message.replace(optionsMatch[0], "");
  h1.innerText = question;
  poll.appendChild(h1);

  options.map((value, i) => {
    const optionId = `opt${i + 1}`;
    const newOption = optionTemplate.content.cloneNode(true);
    newOption.querySelector("label").textContent = `${i + 1}: ${value}`;
    newOption.querySelector("progress").id = optionId;
    poll.appendChild(newOption);
  });

  numOptions = options.length;
};

const tallyVotes = () => {
  for (id in votes) {
    const bar = document.getElementById(id);
    const value = (votes[id] / totalVotes) * 100;
    bar.value = value;
  }
};

const updateVote = () => {
  while (voteQueue.length) {
    const vote = parseInt(voteQueue.shift());
    if (0 < vote && vote <= numOptions) {
      const barId = `opt${vote}`;
      const barTotal = votes[barId] || 0;
      votes[barId] = barTotal + 1;
      totalVotes += 1;
      tallyVotes();
    }
  }
};

ComfyJS.onCommand = (user, command, message, flags, _extra) => {
  if (flags.broadcaster && command === "poll") {
    createPoll(message);
  }

  // if (command === "vote" && !voters.has(user)) {
  //   voters.add(user);
  if (command === "vote") {
    voteQueue.push(message);
    updateVote();
  }
};

ComfyJS.Init("5t3phDev");
