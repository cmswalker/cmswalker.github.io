const contentTitle = 'MW | Software Engineer';
const contentDescription =
  'I\'m a software engineer living in Oakland, CA';
const keywords =
  'design, development, engineering, software engineering, frontend, backend, web, cmswalker, michael, walker, node, javascript, go, golang, C#, .net';
const usernames = { name: 'Michael Walker', twitter: '@_huskyjeans_' };
const currentEmployer = 'Pinterest';

const env = process.env.NODE_ENV || 'dev';
const isProd = env === 'production';

console.log('current env', env);
console.log('isProd', isProd);

const urls = {
    resume: 'https://www.dropbox.com/s/pofjfcsxy7s4fg5/Resume.pdf?dl=0',
    site: 'https://cmswalker.github.io',
    employer: 'https://www.pinterest.com',
    github: 'https://github.com/cmswalker',
    twitter: 'https://twitter.com/_huskyjeans_',
    instagram: 'https://www.instagram.com/_huskyjeans_/',
    email: 'cmichaelswalker@gmail.com',
    npm: 'https://www.npmjs.com/~cmswalker',
    linkedin: 'https://www.linkedin.com/in/cmswalker/'
};

const buildUrl = (url, commit) => {
    const split = url.split('/blob/master');
    let cdnUrl = ''

    if (isProd) {
        cdnUrl = split.join(`/${commit}`);
    } else {
        cdnUrl = split.join('/master');
    }

    return cdnUrl;
}

const imageUrls = {
    icono: 'js/windows.png',
};

const emojiBuilder = (emojiTag, content) => {
    return {
        emoji: `<i class="em ${emojiTag}"></i>`,
        content
    };
};

const tools = {
    code: [
        emojiBuilder('em-scroll', 'Javascript + Node.js'),
        emojiBuilder('em-dash', 'Go'),
        emojiBuilder('em-wavy_dash', 'C# + .NET'),
        emojiBuilder('em-atom_symbol', 'React'),
        emojiBuilder('em-shield', 'Angular'),
        emojiBuilder('em-cyclone', 'Redux'),
        emojiBuilder('em-nail_care', 'Styled Components'),
        emojiBuilder('em-triangular_ruler', 'CSS Modules')
    ],
    build: [
        emojiBuilder('em-fencer', 'TDD'),
        emojiBuilder('em-black_large_square', 'Black Box Testing'),
        emojiBuilder('em-black_joker', 'Component Tests'),
        emojiBuilder('em-robot_face', 'Automation'),
        emojiBuilder('em-whale2', 'Docker'),
        emojiBuilder('em-globe_with_meridians', 'Mesos'),
        emojiBuilder('em-gift', 'Bundlers'),
        emojiBuilder('em-curly_loop', 'CI Pipelines')
    ],
    data: [
        emojiBuilder('em-leaves', 'MongoDB'),
        emojiBuilder('em-closed_book', 'Redis'),
        emojiBuilder('em-spider_web', 'GraphQL'),
        emojiBuilder('em-rabbit2', 'RabbitMQ'),
        emojiBuilder('em-mag_right', 'Elasticsearch'),
        emojiBuilder('em-dolphin', 'MySQL'),
        emojiBuilder('em-elephant', 'Postgres'),
        emojiBuilder('em-handbag', 'Logstash')
    ],
    method: [
        emojiBuilder('em-large_orange_diamond', 'Monoliths'),
        emojiBuilder('em-small_orange_diamond', 'Microservices'),
        emojiBuilder('em-earth_africa', 'i18n'),
        emojiBuilder('em-raised_hands', 'a11y'),
        emojiBuilder('em-hand_with_index_and_middle_fingers_crossed', 'DDD'),
        emojiBuilder('em-building_construction', 'API Design'),
        emojiBuilder('em-crystal_ball', 'A|B Testing'),
        emojiBuilder('em-female_mage', 'Compilation')
    ]
};

module.exports = {
  env,
  isProd,
  contentTitle,
  contentDescription,
  keywords,
  usernames,
  currentEmployer,
  urls,
  imageUrls,
  tools,
};
