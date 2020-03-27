const express = require('express')
const router = express.Router()
const {create} = require('./create')
const {desvio} = require('./desvio')
const {filter} = require('./filter')
router.post('/create', create)
router.post('/desvio', desvio)
router.post('/filter', filter)
module.exports = router