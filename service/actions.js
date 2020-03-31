import {MIDDLEWR_URL} from '../front.confg'
import {doFetch} from './fetch'
const loadPacotes = async (callback) => {
  const method = `POST`
  const body = {
    "filters": {},
    "keys": [],
    "sorters": {
      "limit": 100,
      "skip": 0,
      "sort": "-_id"
    }
  }
  const path = `${MIDDLEWR_URL}/pacote/filter`
  const res = await doFetch(method, path, body)
  callback(res.items)
  return res
}
const loadEspcfcc = async (callback) => {
  const method = `POST`
  const body = {
    "filters": {},
    "keys": [],
    "sorters": {
      "limit": 1000,
      "skip": 0,
      "sort": "-_id"
    }
  }
  const path = `${MIDDLEWR_URL}/especificacao/filter`
  const res = await doFetch(method, path, body)
  callback(res.items)
  return res
}
const doAnalyze = async (SELECTED, callback) => {
  const method = `POST`
  delete SELECTED.PROJETO
  const body = {
    "filters": SELECTED,
    "keys": [],
    "sorters": {
      "limit": 1000,
      "skip": 0,
      "sort": "-_id"
    }
  }
  const path = `${MIDDLEWR_URL}/exame/desvio`
  const res = await doFetch(method, path, body)
  callback(res)
  return res
}
export {
  doAnalyze,
  loadEspcfcc,
  loadPacotes
}