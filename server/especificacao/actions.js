const fs = require('fs')
const csv = require('csv-parser')
const {map} = require('lodash')
const request = require('request-promise')
const Model = require('./model')
const headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}
const {exameNrmlzr} = require('../normalizador/actions')

const configEnv = require('../../configenv.js')
const domain = configEnv.MIDDLEWR_URL

const parseFile = (path) => {
  return new Promise((resolve,reject)=> {
    const results = []
    fs.createReadStream(path, {
      encoding: 'latin1'
    })
    .pipe(csv({separator: '\t'}))
    .on('data', (data) => results.push(data))
    .on('end', () => resolve(results))
  })
}
const parseData = (result) => {
  return new Promise((resolve,reject)=> {
    let len = 0
    let list = []
    let index = {}
    map(result, (item) => {
      len = len + 1
      let {FILME, EXAME: EXAME_TO_NRMLZ, ALVO, MIN, MAX} = item
      let EXAME = exameNrmlzr(EXAME_TO_NRMLZ)
      let obj = {FILME, EXAME, ALVO, MIN, MAX}
      list.push(obj)
    })
    index.TOTAL = list.length
    return resolve({index, list})
  })
}

const uri = `${domain}/especificacao/create`
const array_chunks = (array, chunk_size) => Array(Math.ceil(array.length / chunk_size)).fill().map((_, index) => index * chunk_size).map(begin => array.slice(begin, begin + chunk_size))

const execute = (body) => {
  return new Promise((resolve,reject) => {
    request({uri, body, headers, method: 'POST', 'json': true})
      .then((object) => resolve(object))
      .catch((error) => reject(error))
  })
}
const getData = (filters) => {
  return new Promise((resolve,reject) => {
    Model.findOne(filters).then((result) => resolve(result))
  })
}
const saveData = (body) => {
  let l = body.length
  let n = 100
  const chunks = array_chunks(body, n)
  const promises = map(chunks, (item) => execute(item))
  return Promise.all(promises)
}

module.exports = {getData, saveData, parseData, parseFile}