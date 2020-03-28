const request = require('request-promise')
const {map} = require('lodash')
const headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

const domain = process.env.MIDDLEWR_URL
const uri = `${domain}/exame/create`

const array_chunks = (array, chunk_size) => Array(Math.ceil(array.length / chunk_size)).fill().map((_, index) => index * chunk_size).map(begin => array.slice(begin, begin + chunk_size))

const execute = (body) => {
  return new Promise((resolve,reject) => {
    request({uri, body, headers, method: 'POST', 'json': true})
      .then((object) => resolve(object))
      .catch((error) => reject(error))
  })
}
const saveData = (body) => {
  let l = body.length
  let n = 100
  const chunks = array_chunks(body, n)
  console.log(`savedata.body.length`, l, n, chunks.length)
  const promises = map(chunks, (item) => execute(item))
  return Promise.all(promises)
}
module.exports = {saveData}