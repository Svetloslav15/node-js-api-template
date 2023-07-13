const http = require('http');
const { Octokit } = require('octokit');
require('dotenv').config();

const octokit = new Octokit({
  auth: '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',
});

const server = http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/webhook') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const event = JSON.parse(body);
        if (event.action === 'opened' && event.pull_request) {
          const pullRequest = event.pull_request;
          const response = await octokit.rest.issues.createComment({
            owner: pullRequest.base.repo.owner.login,
            repo: pullRequest.base.repo.name,
            issue_number: pullRequest.number,
            body: 'Hello! Thanks for creating the pull request.',
          });

          console.log('Comment created:', response.data.html_url);
        }
      } catch (error) {
        console.error('Error handling webhook:', error.message);
      }

      res.statusCode = 200;
      res.end('Received');
    });
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

const port = process.env.PORT || 5500;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
