
// adding the options to the poll
// saving a connection to each progress meter to 
// ... update the value as new votes come in
// increment votes via !vote chat command
// timeout the voting
// optionally clear the poll from view


const createPoll = (message) => {
  // !poll What is your favorite color? [blue, green, purple]

  // <div class="option">
  //   <p>Blue</p>
  //   <progress max="100" value="50"></progress>
  // </div>;

  const poll = document.querySelector(".poll");
  const optionsRe = /\[(.+?)\]/m;
  const optionsMatch = message.match(optionsRe);
  const options = optionsMatch[1].split(',');

  const question = message.replace(optionsMatch[1], "").replace(" []", "");

  document.querySelector('h1').innerText = question;

  options.map((value) => {
    const opt = ''; // div
    const heading = ''; // p
    const progress = '';

  });
}

ComfyJS.onCommand = (user, command, message, flags, extra) => {
  if (flags.broadcaster && command === "poll") {
    createPoll(message);
  }
};

ComfyJS.Init("5t3phDev");
