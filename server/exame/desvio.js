const Model = require('./model')
const {map} = require('lodash')

const loadExames = (body) => {
  return new Promise((resolve,reject)=> {
    return Model.filter(body, (result) => resolve(result))
  })
}
const calcMediaGeral = ({items}) => {
  return new Promise((resolve,reject)=> {
    let SOMA_MEDIA = 0
    let TOTAL_ITEMS = items.length
    map(items, (item) => {
      const {MEDIA} = item
      if(!isNaN(MEDIA)) SOMA_MEDIA = SOMA_MEDIA + MEDIA
    })
    let MEDIA_GERAL = SOMA_MEDIA / TOTAL_ITEMS
    return resolve({SOMA_MEDIA, MEDIA_GERAL, TOTAL_ITEMS})
  })
}
const calcDesvioPadrao = ({result, media}) => {
  return new Promise((resolve,reject)=> {
    const {items} = result
    const {SOMA_MEDIA, MEDIA_GERAL, TOTAL_ITEMS} = media
    let DESVIO_SOMA = 0
    map(items, (item) => {
      let DESVIO = item.MEDIA - MEDIA_GERAL
      let DESVIO_2 = DESVIO * DESVIO
      DESVIO_SOMA = DESVIO_SOMA + DESVIO_2
    })
    let DESVIO_PADRAO = Math.sqrt(DESVIO_SOMA / (TOTAL_ITEMS - 1))
    return resolve({SOMA_MEDIA, MEDIA_GERAL, TOTAL_ITEMS, DESVIO_SOMA, DESVIO_PADRAO})
  })
}
const desvio = (req, res) => {
  const body = req.body
  return loadExames(body).then((result) => {
    return calcMediaGeral(result).then((media) => {
      return calcDesvioPadrao({result, media}).then((resume) => {
        const final = {
          resume,
          index: result.index,
          items: result.items
        }
        return res.status(200).json(final)
      })
    })
  })
}

module.exports = {desvio}