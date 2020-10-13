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
    const id = event.queryStringParameters.id;
    console.log('query params: ',event.queryStringParameters)
    const result = await octokit.users.list({since: id});
    return { statusCode: 200, body: JSON.stringify(result.data)}
  } catch{
    return { statusCode: 500, body: "ERROR-BAD REQUEST"}
  }
};
