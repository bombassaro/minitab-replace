const {parseData} = require('./actions')
const {parseFile} = require('./actions')
const {saveData} = require('./actions')

const doImport = (req, res) => {
  const {filename} = req.body
  const path = `./data/${filename}`
  return parseFile(path).then((results) => {
    return parseData(results,req.body).then(({index, list}) => {
      return saveData(list).then(() => {
        return res.status(200).json({index, list})
      })
    })
  })
}
module.exports = {doImport}