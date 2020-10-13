const { Octokit } = require('@octokit/rest');
const dotenv = require('dotenv');
dotenv.config();

// Octokit is a library build to interact with the GitHub API
const octokit = new Octokit({
  auth: process.env.GITHUB_API_KEY,
  userAgent: process.env.GITHUB_USER_AGENT
});

// get the first 30 users from github directory
exports.handler = async event => {
  try {
    const result = await octokit.users.list()
    return { statusCode: 200, body: JSON.stringify(result.data) }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
};
