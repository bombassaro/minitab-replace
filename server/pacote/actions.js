const request = require('request-promise')
const csv = require('csv-parser')
const getTime = require('date-fns/getTime')
const {map} = require('lodash')
const fs = require('fs')
const domain = process.env.MIDDLEWR_URL
const headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}
const {exameNrmlzr, filmeNrmlzr, linhaNrmlzr} = require('../normalizador/actions')

const ExameModel = require('../exame/model')

const checkIfExists = (obj) => {
  return new Promise((resolve, reject) => {
    const {EXAME, FILME, MR} = obj
    const data = {filters: {EXAME, FILME, MR}}
    ExameModel.filter(data, ({index}) => {
      if(index.total === 0) {
        return resolve(obj)
      }
      return resolve()
    })
  })
}

const savePacote = (body) => {
  return new Promise((resolve,reject) => {
    const uri = `${domain}/pacote/create`
    request({uri, body, headers, method: 'POST', 'json': true})
      .then((object) => resolve(object))
      .catch((error) => reject(error))
  })
}
const parseFile = (path) => {
  return new Promise((resolve,reject)=> {
    const results = []
    fs.createReadStream(path, {
      encoding: 'latin1'
    })
    .pipe(csv({separator: '\t'}))
    .on('data', (data) => {
      results.push(data)
    })
    .on('end', () => resolve(results))
  })
}
const parseData = (result, pacoteid, filters) => {
  // return new Promise((resolve,reject)=> {
    // const {filterdata} = filters
    // const filtered = filter(result, filterdata)
  let len = 0
  let list = []
  let index = {
    _id: pacoteid,
    EXAME: [],
    LINHA: [],
    FILME: [],
    TOTAL: 0
  }
  const promises = []
  map(result, (item) => {
    len = len + 1
    let {
      EXAME: EXAME_TO_NRMLZ,
      LINHA: LINHA_TO_NRMLZ,
      FILME: FILME_TO_NRMLZ,
      MIN,
      MAX,
      MEDIA,
      DP,
      ITEM,
      MR,
      DATA,
      X1,
      X2,
      X3,
      X4,
      X5
    } = item
    const sD = DATA.split("/")
    const new_date = sD.length > 1 ? new Date(sD[2], sD[0] - 1, sD[1]) : new Date()
    const timestamp = getTime(new_date.setHours(20))
    let FILME = filmeNrmlzr(FILME_TO_NRMLZ)
    let EXAME = exameNrmlzr(EXAME_TO_NRMLZ)
    let LINHA = linhaNrmlzr(LINHA_TO_NRMLZ)
    if(index.EXAME.indexOf(EXAME) === -1) index.EXAME.push(EXAME)
    if(index.LINHA.indexOf(LINHA) === -1) index.LINHA.push(LINHA)
    if(index.FILME.indexOf(FILME) === -1) index.FILME.push(FILME)
    let obj = {
      PACOTE: pacoteid,
      EXAME,
      LINHA,
      FILME,
      MIN,
      MAX,
      MEDIA,
      DP,
      ITEM,
      MR,
      DATA,
      DATE: timestamp,
      X1,
      X2,
      X3,
      X4,
      X5
    }
    // check if exists
    // const prom = 
    promises.push(checkIfExists(obj))
  })
  return Promise.all(promises).then((results) => {
    map(results, (r) => r && list.push(r))
    index.TOTAL = list.length
    return {list, index}
  })
  // })
}
module.exports = {savePacote, parseData, parseFile}