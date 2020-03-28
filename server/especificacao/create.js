const Model = require('./model')
const create = (req, res) => {
  const body = req.body
  if(body._id) {
    Model.updateItem(body, (result) => {
      return res.status(200).json(result)
    })
  } else {
    Model.saveItem(body, (result) => {
      return res.status(200).json(result)
    })
  }
}
module.exports = {create}