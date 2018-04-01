require('siimple'); // Global Styles
require('./styles/emoji.css');

require('./styles/main.styl');

const graphQLRaw = require('../githubGraphQLAPI.json');
const npmRaw = require('../modulesAPI.json');

const convertNpmToGithub = (data) => {
    const contributions = data.modules.map((m) => {
        const { name } = m;
        m.nameWithOwner = `${name}/cmswalker`;
        m.url = `https://www.npmjs.com/package/${name}`;
        return m;
    });

    return { contributions };
};

const npmResults = convertNpmToGithub(npmRaw);
const graphQLResults = parseResults(graphQLRaw);
const count = {};
graphQLResults.contributions = [ ...graphQLResults.contributions, ...npmResults.contributions].reduce((result, current) => {
    const { name } = current;
    if (!count[name]) {
        result.push(current);
    }

    count[name] = 1;
    return result;
}, []);

const ignoreSet = new Set([
  'my-npm-profile',
  'cmswalker.github.io',
  'dawts',
  'am',
  'stealthy-require',
  'isotope',
  'resume.github.com',
  'code-problems',
  'interview',
  'cdn',
  'makefiles',
  'angular-isotope',
  'javascript',
  'hyperapp',
  'os01'
]);

const ignoreRegexes = [/mobile-web/, /ot-/, /hth/, /up-for/, /yuzu/, /awesome/, /front/, /portal/, /gopher/];

const isIgnored = name => {
  const isInIgnoreSet = ignoreSet.has(name.toLowerCase());

  if (isInIgnoreSet) {
    return true;
  }

  return !!ignoreRegexes.find(reg => {
    return !!name.toLowerCase().match(reg);
  });
};


const scrollTo = (element) => {
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: element.offsetTop
    });
}

const scrollToAnchor = (id) => {
    const element = document.getElementById(id);

    if (element) {
        scrollTo(element);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    changeTitle();
    setupTabs();
    generateOpenSource();
    setTimeout(() => {
        const { hash = '' } = window.location;
        scrollToAnchor(hash.replace('#', ''));
    }, 500);
});

function changeTitle() {
    const headerTitle = document.getElementById('header-title');
    const originalText = headerTitle.innerHTML;

    let newText = '';
    let i = 0;
    for (let value of originalText) {
        let className = '';
        if (i & 1) {
            className = 'color-teal';
        }

        newText = `${newText}<span class="${className}">${value}</span>`;
        i++;
    }

    headerTitle.innerHTML = newText;
}


function parseResults({ data }) {
    return {
        user: parseUserFields(data.viewer),
        organizations: parseOrgs(data.viewer.organizations),
        starredRepos: parseStarred(data.viewer.starredRepositories),
        contributions: parseContributions(data.viewer.contributedRepositories)
    }
}
function parseUserFields({ login, name, location, company }) {
    return {
        login, name, location, company
    };
}
function parseOrgs(orgs) {
    return getEdges(orgs.edges).map(getRootInfo);
}
function parseStarred(starred) {
    return getEdges(starred.edges).map(getRootInfo);
}
function parseContributions(contributions) {
    return getEdges(contributions.edges).map(getRootInfo);
}
function getEdges(edges) {
    return edges.map(e => e.node);
}
function getRootInfo({ name, nameWithOwner, homepageUrl, url, description, stargazers }) {
    return {
        name, nameWithOwner, homepageUrl, url, description, stargazers
    };
}

function generateOpenSource() {
    const $openSource = document.getElementById('open-source-contributions');
    const $starred = document.getElementById('open-source-starred');
    const dictionary = {};
    const colorPattern = ['white', 'navy', 'teal'];
    const rootColor = colorPattern[0];

    function generateLinks(arr) {
        return arr.filter((c) => {
            return !dictionary[c.name] && !isIgnored(c.name);
        }).map((c, i, arr) => {
            let color = rootColor;

            if (i < 3) {
                if (i === 1) {
                    color = colorPattern[i];
                }

                if (i === 2) {
                    color = colorPattern[i];
                }
            } else {
                const lastColor = arr[i - 1].color;
                const lastColorIdx = colorPattern.indexOf(lastColor);

                color = colorPattern[lastColorIdx + 1] || rootColor;
            }

            c.color = color;
            return c;
        }).map((c, i) => {
            const { totalCount = 0 } = c.stargazers || {};
            const { color } = c;

            dictionary[c.name] = 1;

            let tagStart = 'siimple-tag siimple-tag';

            return `
                <a target='_blank' href='${c.homepageUrl || c.url}' class='${tagStart}--${color}'>
                    <div >
                        ${c.name}
                    </div>
                </a>
            `
        });
    }

    const contributions = generateLinks(graphQLResults.contributions);
    const starred = generateLinks(graphQLResults.starredRepos);

    $openSource.innerHTML = `
        <div class='contributions'>
            ${contributions.join('')}
        </div>
    `;

    $starred.innerHTML = `
        <div class='contributions'>
            ${starred.join('')}
        </div>
    `;
}

function setupTabs() {
    const main = document.getElementsByClassName('no-tabs')[0];
    const sections = main.getElementsByClassName('siimple-grid-col-md--6');
    const toolSections = Array.prototype.map.call(sections, (sect) => {
        const title = sect.getElementsByClassName('bold')[0].innerText;
        const toolNodes = sect.getElementsByClassName('tool-section');

        const tools = Array.prototype.map.call(toolNodes, (t) => {
            return `<div class="margin-bottom-5">${t.innerHTML}</div>`;
        });
        return { title, tools }
    });

    const tabSections = document.getElementsByClassName('tool-content');

    Array.prototype.forEach.call(tabSections, (ts, i) => {
        ts.innerHTML = toolSections[i].tools.join('\n')
    });
}