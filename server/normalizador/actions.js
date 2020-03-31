const {map, find, some, method} = require('lodash')  
const exames = require('./exames.json')
const filmes = require('./filmes.json')
const linhas = require('./linhas.json')
const exameNrmlzr = (INPUT) => {
  if(!INPUT) return false
  const stringupper = INPUT.toUpperCase()
  const procref = find(exames, {INPUT: stringupper})
  return procref ? procref.OUTPUT : stringupper
}
const filmeNrmlzr = (INPUT) => {
  if(!INPUT) return false
  let stringupper = INPUT.toUpperCase()
  // const procref = find(filmes, {INPUT: stringupper})
  // const procref = some(filmes, method('includes', stringupper));
  map(filmes, (f) => {
    if(stringupper.indexOf(f.INPUT) !== -1) {
      stringupper = stringupper.replace(f.INPUT, f.OUTPUT)
    }
  })
  return stringupper
  // console.log(`procref.INPUT, procref.OUTPUT`, procref.INPUT, procref.OUTPUT, stringupper, stringupper.replace(procref.INPUT, procref.OUTPUT))
  // return procref ? stringupper.replace(procref.INPUT, procref.OUTPUT) : stringupper
}
const linhaNrmlzr = (INPUT) => {
  if(!INPUT) return false
  const stringupper = INPUT.toUpperCase()
  const procref = find(linhas, {INPUT: stringupper})
  return procref ? procref.OUTPUT : stringupper
}
module.exports = {exameNrmlzr, filmeNrmlzr, linhaNrmlzr}