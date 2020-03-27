const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = new mongoose.Schema(
  {
    ARQUIVO: {type: String},
    EXAME: {type: Array},
    LINHA: {type: Array},
    FILME: {type: Array}
  }, 
  {
    timestamps: true
  }
);
Schema.statics = {
  filter(body, next) {
    const {filters, keys, sorters = {}} = body
    let options = {
      offset: sorters.skip || 0,
      limit: sorters.limit || 100,
      sort: sorters.sort || '-_id',
      select: keys || false
    }
    return this.paginate(filters, options)
      .then(r => {
        const result = {
          index: {
            page: r.offset,
            nextPage: r.nextPage,
            prevPage: r.prevPage,
            total: r.totalDocs,
            limit: r.limit
          },
          items: r.docs
        }
        next(result)
      })
  },
  saveItem(body, next) {
    return this.create(body).then((r) => next(r))
  },
  updateItem(body, next) {
    const query = {'_id': body._id}
    delete body._id
    return this.findOneAndUpdate(query, body)
      .then(r => next(r))
      .catch(e => next(e))
  }
}
Schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Pacote', Schema);