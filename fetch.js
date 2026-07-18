const fs = require("fs");
require("dotenv").config();

const GITHUB_TOKEN = process.env.VITE_GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const USE_GITHUB_DATA = process.env.USE_GITHUB_DATA;
const MEDIUM_USERNAME = process.env.MEDIUM_USERNAME;

// Fetch failures are logged but never fail the build: the site falls
// back to the hardcoded data in src/portfolio.js when the JSON files
// are missing.
async function fetchGithubProfile() {
  if (USE_GITHUB_DATA !== "true") {
    return;
  }
  if (!GITHUB_USERNAME) {
    console.warn(
      "USE_GITHUB_DATA is true but GITHUB_USERNAME is not set — skipping GitHub fetch."
    );
    return;
  }

  console.log(`Fetching profile data for ${GITHUB_USERNAME}`);
  const query = `
{
  user(login:"${GITHUB_USERNAME}") {
    name
    bio
    avatarUrl
    location
    pinnedItems(first: 6, types: [REPOSITORY]) {
      totalCount
      edges {
        node {
          ... on Repository {
            name
            description
            forkCount
            stargazers {
              totalCount
            }
            url
            id
            diskUsage
            primaryLanguage {
              name
              color
            }
          }
        }
      }
    }
  }
}
`;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "User-Agent": "Node"
    },
    body: JSON.stringify({query})
  });
  if (!res.ok) {
    throw new Error(
      `GitHub request failed with status ${res.status}. Check VITE_GITHUB_TOKEN in your .env file.`
    );
  }
  const data = await res.text();
  fs.writeFileSync("./public/profile.json", data);
  console.log("saved file to public/profile.json");
}

async function fetchMediumBlogs() {
  if (!MEDIUM_USERNAME) {
    return;
  }

  console.log(`Fetching Medium blogs data for ${MEDIUM_USERNAME}`);
  const res = await fetch(
    `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`
  );
  if (!res.ok) {
    throw new Error(
      `Medium request failed with status ${res.status}. Check MEDIUM_USERNAME in your .env file.`
    );
  }
  const data = await res.text();
  fs.writeFileSync("./public/blogs.json", data);
  console.log("saved file to public/blogs.json");
}

(async () => {
  const results = await Promise.allSettled([
    fetchGithubProfile(),
    fetchMediumBlogs()
  ]);
  for (const result of results) {
    if (result.status === "rejected") {
      console.warn(`WARNING: ${result.reason.message}`);
      console.warn("Continuing build with fallback data from portfolio.js.");
    }
  }
})();
