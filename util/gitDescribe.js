const spawn = require("child_process").spawnSync;
const semver = require("semver");

/**
 * Gets current repository version from git describe.
 * @return {semver} Version
 */
function getGitDescribeVersion() {
  let gitDescribeVersion = null;

  const gitDescribeProc = spawn("git", ["describe", "--always"]);
  if (gitDescribeProc.status === 0) {
    const procStdout = gitDescribeProc.stdout.toString();
    gitDescribeVersion = semver.clean(procStdout);
  }
  return gitDescribeVersion;
}

module.exports = getGitDescribeVersion;
