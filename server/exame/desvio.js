const Model = require('./model')
const {map} = require('lodash')
const {getData} = require('../especificacao/actions')

const round = (number) => parseFloat((number.toFixed(2)))
// const round = (number) => number

const loadExames = (body) => {
  return new Promise((resolve,reject)=> {
    return Model.filter(body, (result) => resolve(result))
  })
}
const getEspecificacoes = ({filters}) => {
  return new Promise((resolve,reject)=> {
    const {FILME, EXAME} = filters
    return getData({FILME, EXAME}).then((specs) => {
      if(!specs) return reject({error: `specs-not-found`})
      const {FILME, EXAME, LINHA, ALVO, MIN, MAX} = specs
      return resolve({FILME, EXAME, LINHA, ALVO, MIN, MAX})
    })
  })
}
const calcMediaGeral = ({result, specs}) => {
  const {items} = result
  const {MIN, MAX} = specs
  return new Promise((resolve,reject)=> {
    let SOMA_MEDIA = 0
    let TOTAL_ITEMS = items.length
    map(items, (item) => {
      const {MEDIA} = item
      if(!isNaN(MEDIA)) {
        SOMA_MEDIA = SOMA_MEDIA + MEDIA
        // SOMA_MEDIA = (MEDIA < MIN) ? (SOMA_MEDIA + MIN) : 
          // (MEDIA > MAX) ? (SOMA_MEDIA + MAX) : 
          // (SOMA_MEDIA + MEDIA)
      }
    })
    let MEDIA_GERAL = SOMA_MEDIA / TOTAL_ITEMS
    // let MEDIA_GERAL = 19.9065
    return resolve({SOMA_MEDIA, MEDIA_GERAL, TOTAL_ITEMS})
  })
}
const calcDesvioPadrao = ({result, specs, somas}) => {
  return new Promise((resolve,reject)=> {
    const {items} = result
    // const {MIN, MAX} = specs
    const {SOMA_MEDIA, MEDIA_GERAL, TOTAL_ITEMS} = somas
    let DESVIO_SOMA = 0
    let DESVIO_RANGE = 0
    let i = 0
    map(items, (item) => {
      i = i + 1
      if(i > 1) {
        let last = items[i - 2]
        let LAST_AVERAGE = last.MEDIA
        let diff = item.MEDIA - LAST_AVERAGE
        DESVIO_RANGE = diff < 0 ? 
          DESVIO_RANGE + (diff * -1) : 
          DESVIO_RANGE + (diff)
      }
      let DESVIO = item.MEDIA - MEDIA_GERAL
      // let DESVIO  = (item.MEDIA < MIN) ? (MIN - MEDIA_GERAL) : 
      //     (item.MEDIA > MAX) ? (MAX - MEDIA_GERAL) : 
      //     (item.MEDIA - MEDIA_GERAL)
      // let DESVIO  = (item.MEDIA < MIN) ? (MIN - MEDIA_GERAL) : 
          // (item.MEDIA > MAX) ? (MAX - MEDIA_GERAL) : 
          // (item.DP)
      // let DESVIO = item.DP
      let DESVIO_I = (DESVIO * DESVIO)
      DESVIO_SOMA = (DESVIO_SOMA + DESVIO_I)
    })
    let DESVIO_PADRAO = (Math.sqrt(DESVIO_SOMA / (TOTAL_ITEMS - 1)))
    // console.log(`DESVIO_PADRAO`, DESVIO_PADRAO)
    let DESVIO_DENTRO = (DESVIO_RANGE / (TOTAL_ITEMS - 2 + 1)) / 1.128
    // console.log(`DESVIO_DENTRO`, DESVIO_DENTRO)
    return resolve({SOMA_MEDIA, MEDIA_GERAL, TOTAL_ITEMS, DESVIO_SOMA, DESVIO_PADRAO, DESVIO_DENTRO})
  })
}
const calcCpCpk = (resume) => {
  return new Promise((resolve,reject)=> {
    const {
      desvios, 
      specs,
    } = resume
    const {
      DESVIO_DENTRO,
      DESVIO_PADRAO,
      MEDIA_GERAL
    } = desvios
    const {
      MIN, 
      MAX
    } = specs
    const cpcpk = {}
    // DESVIO_PADRAO,
    cpcpk.PP = !MAX || !MIN ? null : ((MAX - MIN) / (6 * DESVIO_PADRAO)) // TODO
    cpcpk.PPK1 = !MAX ? null : ((MAX - MEDIA_GERAL) / (3 * DESVIO_PADRAO)) // TODO
    cpcpk.PPK2 = !MIN ? null : ((MEDIA_GERAL - MIN) / (3 * DESVIO_PADRAO)) // TODO
    cpcpk.PPK = cpcpk.PPK1 > cpcpk.PPK2 ? cpcpk.PPK2 : cpcpk.PPK1 // TODO
    //
    cpcpk.CP = !MAX || !MIN ? null : ((MAX - MIN) / (6 * DESVIO_DENTRO)) // TODO
    cpcpk.CPK1 = !MAX ? null : ((MAX - MEDIA_GERAL) / (3 * DESVIO_DENTRO)) // TODO
    cpcpk.CPK2 = !MIN ? null : ((MEDIA_GERAL - MIN) / (3 * DESVIO_DENTRO)) // TODO
    cpcpk.CPK = cpcpk.CPK1 > cpcpk.CPK2 ? cpcpk.CPK2 : cpcpk.CPK1 // TODO
    return resolve(cpcpk)
  })
}
const desvio = (req, res) => {
  const body = req.body
  const {filters} = body
  const resume = {specs: {}, desvios: {}, cpcpk: {}}
  return loadExames(body).then((result) => {
    return getEspecificacoes({filters}).then((specs) => {
      resume.specs = specs
      return calcMediaGeral({result, specs}).then((somas) => {
        return calcDesvioPadrao({result, specs, somas}).then((desvios) => {
          resume.desvios = desvios
          return calcCpCpk(resume).then((cpcpk) => {
            resume.cpcpk = cpcpk
            const final = {
              resume,
              index: result.index,
              items: result.items
            }
            return res.status(200).json(final)
          })
        })
      })
    })
  }).catch((error) => {
    return res.status(500).json({error})
  })
}

module.exports = {desvio}