const qs = require('querystring');
const axios = require('axios');
const JsonDB = require('node-json-db');

const db = new JsonDB('users', true, false);

const apiUrl = 'https://slack.com/api';


const postResult = result => console.log(result.data);

// default message - edit to include actual ToS
const message = {
  token: process.env.SLACK_ACCESS_TOKEN,
  link_names: true,
  text: 'Welcome to the Map Camp Slack! We\'re glad you\'re here.',
  as_user: true,
  attachments: JSON.stringify([
    {
      title: 'Helpful Resources',
      text: 'Just to make you aware, there\'s a <https://community.wardleymaps.com|public Wardley maps forum> and a <https://www.linkedin.com/groups/13604539|Wardley Maps Community LinkedIn group> that you\'d also be welcome to join.\n\nFinally, a few more resources you may find useful:\n* <https://medium.com/wardleymaps|Creative commons book by Simon Wardley>\n* <https://bit.ly/wardleymaps|YouTube channel>\n* <https://www.wardleymaps.com/tool.html|Atlas>\n* <https://hiredthought.com/wardley-mapping/|Additional tools and templates>\n* <https://learn.leadingedgeforum.com/p/wardley-mapping/?product_id=277424|LEF Course>\n* <https://www.map-camp.com/_pages/code_of_conduct/|Our Code of Conduct>',
      color: '#74c8ed',
    }]
  ),
};

const initialMessage = (teamId, userId) => {
  // send the default message as a DM to the user
  message.channel = userId;
  axios.post(`${apiUrl}/chat.postMessage`, qs.stringify(message))
    .then((result => {
      console.log(result.data);
    }));
};

const accept = (userId, teamId) => {};

const remind = () => {};

module.exports = { initialMessage, accept, remind };
