const {parseData} = require('./actions')
const {parseFile} = require('./actions')
const {savePacote} = require('./actions')
const {saveData} = require('../exame/actions')

const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})
const upload = multer({ storage: storage }).single('file')

const doImport = (req, res) => {
  const {filename} = req.body
  const path = `./public/${filename}`
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

const doUpload = (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    req.body = {}
    req.body.filename = req.file.filename
    return doImport(req, res)
    // return res.status(200).send(req.file)
  })
}
module.exports = {doImport, doUpload}