const request = require('request-promise')
const csv = require('csv-parser')
const {filter, map} = require('lodash')
const fs = require('fs')
const domain = process.env.MIDDLEWR_URL
const headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

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
    fs.createReadStream(path)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
  })
}
const parseData = (result, pacoteid, filters) => {
  return new Promise((resolve,reject)=> {
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
    // console.log(`filtered`, filtered.length)
    map(result, (item) => {
      len = len + 1
      let {
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
        X1,
        X2,
        X3,
        X4,
        X5
      } = item
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
        X1,
        X2,
        X3,
        X4,
        X5
      }
      list.push(obj)
    })
    index.TOTAL = list.length
    return resolve({list, index})
  })
}
module.exports = {savePacote, parseData, parseFile}