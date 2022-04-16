const fs = require('fs');
const path = require('path');

const buildFolder = 'build';
const infoFile = path.join(buildFolder, 'info.json');

function main() {
  const buildInfo = {
    time: new Date().toISOString(),
    commitSha: getCommitSHA()
  };

  fs.writeFileSync(infoFile, JSON.stringify(buildInfo, null, 2));
}

function getCommitSHA() {
  return (
    process.env.COMMIT_REF ||
    process.env.VERCEL_GIT_COMMIT_SHA ||
    process.env.CF_PAGES_COMMIT_SHA ||
    'not-available'
  );
}

main();
