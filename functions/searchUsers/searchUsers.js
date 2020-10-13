const { Octokit } = require('@octokit/rest');
const dotenv = require('dotenv');
dotenv.config();

// Octokit is a library build to interact with the GitHub API
const octokit = new Octokit({
  auth: process.env.GITHUB_API_KEY,
  userAgent: process.env.GITHUB_USER_AGENT
});

// search users according to provided 'user' query param
exports.handler = async event => {
  try {
    const { user }= event.queryStringParameters
    const result = await octokit.search.users({q: user, per_page: 30});
    return {
      statusCode: 200,
      body: JSON.stringify(result.data.items)
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
