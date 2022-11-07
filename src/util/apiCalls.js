import axios from "axios";

const Token = process.env.GITHUB_TOKEN;

export const getImage = async (user) => {
  const query = `
        query($userName:String!) {
            user(login: $userName){
              avatarUrl
            }
          }
        `;
  const variables = `
        {
            "userName":"${user}"
        }
        `;

  const body = {
    query,
    variables,
  };

  const config = {
    method: "POST",
    url: "https://api.github.com/graphql",
    headers: {
      Authorization: `Bearer ${Token}`,
    },
    data: JSON.stringify(body),
  };
  const res = await axios.request(config);  
  return res.data.data.user.avatarUrl;
};

export const retrieveContribution = async (user) => {
  const query = `
        query($userName:String!) {
            user(login: $userName){
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  
                }
              }
            }
          }
        `;
  const variables = `
        {
            "userName":"${user}"
        }
        `;

  const body = {
    query,
    variables,
  };

  const config = {
    method: "POST",
    url: "https://api.github.com/graphql",
    headers: {
      Authorization: `Bearer ${Token}`,
    },
    data: JSON.stringify(body),
  };

  const res = await axios.request(config);
  return res.data.data.user.contributionsCollection.contributionCalendar
    .totalContributions;
};

export const getFollowers = async (user) => {
  const query = `query ($userName:String!){ 
            user(login: $userName) { 
              followers {
                totalCount
              }
            }
          }`;
  const variables = `
        {
            "userName":"${user}"
        }
        `;
  const body = {
    query,
    variables,
  };

  const config = {
    method: "POST",
    url: "https://api.github.com/graphql",
    headers: {
      Authorization: `Bearer ${Token}`,
    },
    data: JSON.stringify(body),
  };

  const res = await axios.request(config);
  return res.data.data.user.followers.totalCount;
};

export const getRep = async (user) => {
  const query = `
        query ($userName:String!){ 
            user(login: $userName) {
              repositories {
                totalCount
              }
            }
          }
        `;

  const variables = `
        {
            "userName":"${user}"
        }
        `;

  const body = {
    query,
    variables,
  };

  const config = {
    method: "POST",
    url: "https://api.github.com/graphql",
    headers: {
      Authorization: `Bearer ${Token}`,
    },
    data: JSON.stringify(body),
  };

  const res = await axios.request(config);
  return res.data.data.user.repositories.totalCount;
  
};

export const getUserName = (thePath) => {
  return thePath.substring(thePath.lastIndexOf("/") + 1);
};
