const { Octokit } = require('@octokit/rest');
const dotenv = require('dotenv');
dotenv.config();

// Octokit is a library build to interact with the GitHub API
const octokit = new Octokit({
  auth: process.env.GITHUB_API_KEY,
  userAgent: process.env.GITHUB_USER_AGENT
});

// get the next 30 users beyond the provided 'since' query param
exports.handler = async (event) => {
  try {
    const user = event.queryStringParameters.user;
    const result = await octokit.request(`GET https://api.github.com/users/${user}/followers`);
    return { statusCode: 200, body: JSON.stringify(result.data)}
  } catch{
    return { statusCode: 500, body: "ERROR-BAD REQUEST"}
  }
};

// const result = await octokit.request(`GET ${props.repos_url}`);