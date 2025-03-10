// fetch /repos/{owner}/{repo}/pulls/{pull_number}
// and check its mergeable_state
// if "clean", exit with status code 0
// else exit with error
const { setTimeout } = require('timers/promises');

(async () => {
  const tries = 10;
  const retryDelay = 30000;

  await setTimeout(retryDelay);

  for (let t = 0; t < tries; t++) {
    try {
      const [repo, pull_number] = process.argv.slice(2);

      const data = await (await fetch(`https://api.github.com/repos/${repo}/pulls/${pull_number}`)).json();

      console.log(data);
      if (data.mergeable_state === 'clean') {
        process.exit(0);
      }
      await setTimeout(retryDelay);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
  process.exit(1);
})();
