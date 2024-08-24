/**
 * @file autoCommit.js
 * @description A script to create an automatic commit with a timestamp and emoji, with optional user-provided comment.
 * @author Rayan Almalki
 * @license GPL-3.0
 */

import { exec } from 'node:child_process';

/**
 * Generate a timestamp in 'YYYY-MM-DD HH:mm' format.
 * @returns {string} Formatted timestamp
 */
const getFormattedTimestamp = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const timestamp = getFormattedTimestamp();
const emoji = '🚀';

/**
 * Read the optional user comment from command line arguments.
 * If no comment is provided, only the timestamp and emoji will be used.
 * @type {string}
 */
const userComment = process.argv.slice(2).join(' ') || '';
const commitMessage = `${emoji} ${timestamp}${userComment ? ` - ${userComment}` : ''}`;

// Execute Git commands
exec('git add .', (addError) => {
  if (addError) {
    console.error('Error occurred while adding files:', addError.message);
    return;
  }

  exec(`git commit -m "${commitMessage}"`, (commitError) => {
    if (commitError) {
      console.error('Error occurred while creating the commit:', commitError.message);
      return;
    }

    exec('git push', (pushError) => {
      if (pushError) {
        console.error('Error occurred while pushing changes:', pushError.message);
      } else {
        console.log(`Commit created: "${commitMessage}" and changes pushed to GitHub!`);
      }
    });
  });
});
