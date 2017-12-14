#!/bin/bash

echo "Generating JSON from Github GrahQL API"

QUERY="{   viewer {        login        name        location        company        organizations(first: 100) {            edges {                node {                    name                    url                    description                }            }        }        starredRepositories(first: 100) {      totalCount            edges {                node {                    name                    nameWithOwner                    description                    homepageUrl                    url                }            }        }        contributedRepositories(first: 100 privacy: PUBLIC) {      totalCount            edges {                node {          name                    nameWithOwner                    description                    homepageUrl                    url                              stargazers {                        totalCount                               }                          }            }        }    }}"

curl -H "Authorization: bearer ${GH_GRAPHQL_TOKEN}" -X POST -d " \
 { \
   \"query\": \"query ${QUERY}\" \
 } \
" https://api.github.com/graphql -o ./githubGraphQLAPI.json