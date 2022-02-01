// TODO: timeout the voting

// !poll Which was the best boy band? [N'Sync, Backstreet Boys, Boyz II Men]

const poll = document.querySelector(".poll");
const optionTemplate = document.getElementById("option");
let numOptions = 0;
let totalVotes = 0;
let votes = {};
let voteQueue = [];
let voters = new Set();

const clearPoll = () => {
  numOptions = 0;
  totalVotes = 0;
  votes = {};
  voteQueue = [];
  voters = new Set();
  poll.innerHTML = "";
};

const createPoll = (message, newPoll = false) => {
  const optionsRe = /\[(.+?)\]/m;
  const optionsMatch = message.match(optionsRe);
  const options = optionsMatch ? optionsMatch[1].split(",") : [];

  const h1 = newPoll ? document.createElement("h1") : poll.querySelector("h1");
  const question = optionsMatch ? message.replace(optionsMatch[0], "") : "";
  h1.innerText = question;

  if (newPoll) {
    poll.appendChild(h1);
  }

  options.map((value, i) => {
    const optionId = `opt${i + 1}`;
    const itemId = `${optionId}-item`;

    const newOption = newPoll
      ? optionTemplate.content.cloneNode(true)
      : document.getElementById(itemId);

    newOption.querySelector("label").textContent = `${i + 1}: ${value}`;

    if (newPoll) {
      newOption.querySelector(".option").id = itemId;
      newOption.querySelector("progress").id = optionId;
      poll.appendChild(newOption);
    }
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
