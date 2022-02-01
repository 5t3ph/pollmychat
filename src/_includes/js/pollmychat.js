ComfyJS.onCommand = (user, command, message, flags, _extra) => {
  if (flags.broadcaster && command === "poll") {
    const newPoll = totalVotes === 0;
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

ComfyJS.Init("5t3phDev");
