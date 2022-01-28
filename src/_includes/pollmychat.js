// Update the progress value as new votes come in
// increment votes via !vote chat command
// timeout the voting
// optionally clear the poll from view

const optionTemplate = document.getElementById("option");

const createPoll = (message) => {
  // !poll Which was the best boy band? [N'Sync, Backstreet Boys, Boyz II Men]

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
};

ComfyJS.onCommand = (_user, command, message, flags, _extra) => {
  if (flags.broadcaster && command === "poll") {
    createPoll(message);
  }
};

ComfyJS.Init("5t3phDev");
