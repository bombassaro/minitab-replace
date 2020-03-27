const express = require('express')
const router = express.Router()
const {create} = require('./create')
const {filter} = require('./filter')
const {doImport} = require('./import')
router.post('/create', create)
router.post('/filter', filter)
router.post('/import', doImport)
module.exports = router