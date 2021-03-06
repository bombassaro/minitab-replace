const express = require('express')
const router = express.Router()
const {create} = require('./create')
const {desvio} = require('./desvio')
const {filter} = require('./filter')
const {report} = require('./report')
router.post('/create', create)
router.post('/desvio', desvio)
router.post('/filter', filter)
router.post('/report', report)
module.exports = router