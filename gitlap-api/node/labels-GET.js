const httpRequest = require('../../common/http-request');
const {config} = require('./config');
const saveToFile = require('../../common/save-to-file');

async function getLabels() {
  return new Promise((r, j) => {
    httpRequest({
      host: config.BASE_GIT_API_HOST,
      port: config.PORT,
      path: `/api/v4/projects/${config.PROJECT_ID}/labels`,
      headers: {
        'Private-Token': config.PRIVATE_TOKEN,
        'Content-Type': "application/json"
      },
      method: 'GET',
    }, res => {
      const d = res.map(({id, name, description}) => ({id, name, description}))
      saveToFile(`${__dirname}/labels.json`, d);
      r(d);
    })
  })
}

module.exports = {
  getLabels
}
