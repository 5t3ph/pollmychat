ComfyJS.onCommand = (user, command, message, flags, _extra) => {
  if (flags.broadcaster && command === "poll") {
    const optionsMatch = message.match(optionsRe);
    const options = optionsMatch ? optionsMatch[1].split(",") : [];
    const newPoll = options.length !== numOptions;
    createPoll(message, newPoll);
  }

  if (flags.broadcaster && command === "clear") {
    clearPoll();
  }

  if (command === "vote" && !voters.has(user)) {
    voters.add(user);
    voteQueue.push(message);
    updateVote();
  }
};

ComfyJS.Init("{{ eleventy.serverless.path.username }}");
