const {parseData} = require('./actions')
const {parseFile} = require('./actions')
const {savePacote} = require('./actions')
const {saveData} = require('../exame/actions')

const doImport = (req, res) => {
  const {filename} = req.body
  const path = `./data/${filename}`
  const pacote = {"ARQUIVO": filename}
  return savePacote(pacote).then(({_id: pacoteid}) => {
    return parseFile(path).then((results) => {
      return parseData(results, pacoteid, req.body).then(({list, index}) => {
        return saveData(list).then(() => {
          return savePacote(index).then(() => {
            return res.status(200).json({index})
          })
        })
      })
    })
  })
}
module.exports = {doImport}