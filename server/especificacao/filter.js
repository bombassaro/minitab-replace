const Model = require('./model')

const filter = (req, res) => {
  const data = req.body
  Model.filter(data, (result) => {
    return res.status(200).json(result)
  })
}

module.exports = {filter}