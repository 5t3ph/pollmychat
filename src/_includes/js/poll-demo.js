const createDemoPoll = (
  newPoll = false,
  question = "Which was the best boy band?",
  choices = "[N'Sync, Backstreet Boys, Boyz II Men]"
) => {
  createPoll(`${question} ${choices}`, newPoll);
};
createDemoPoll(true);

const demoVotes = [
  "1",
  "1",
  "2",
  "3",
  "3",
  "3",
  "3",
  "2",
  "3",
  "3",
  "2",
  "2",
  "2",
  "2",
  "2",
  "1",
  "1",
  "1",
  "2",
  "3",
  "3",
  "2",
  "2",
  "2",
  "2",
  "2",
  "1",
  "1",
  "1",
  "1",
];

const simulateVotes = () => {
  demoVotes.map((vote, i) => {
    setTimeout(() => {
      voteQueue.push(demoVotes[vote]);
      updateVote();
    }, 150 * i);
  });
};
document.getElementById("simulate").addEventListener("click", simulateVotes);

const question = document.getElementById("question");
const choices = document.getElementById("choices");
const command = document.querySelector(".chat-command");

const updateDemoPoll = (q, c) => {
  const newPoll = c.split(",").length !== numOptions;
  const choiceArr = `[${c}]`;
  if (newPoll) {
    clearPoll();
  }
  createDemoPoll(newPoll, q, choiceArr);
  command.textContent = `!poll ${q} ${choiceArr}`;
};
question.addEventListener("keyup", (e) => {
  updateDemoPoll(e.target.value, choices.value);
});
choices.addEventListener("keyup", (e) => {
  updateDemoPoll(question.value, e.target.value);
});

const color = document.getElementById("color");
const url = document.querySelector(".embed-url");
color.addEventListener("change", (e) => {
  const hue = e.target.value;
  const theme = document.getElementById("theme");
  theme.innerHTML = `progress { --base-hue: ${hue} }`;
  url.textContent = `pollmychat.dev/poll/TWITCHUSERNAME/${hue}`;
});
