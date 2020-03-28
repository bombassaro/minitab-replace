const app = require('express')()
const cors = require('cors')
const mongoose = require('mongoose')
const next = require('next')
const parser = require('body-parser')
const server = require('http').Server(app)
const exame = require('./server/exame/routes')
const pacote = require('./server/pacote/routes')
const especificacao = require('./server/especificacao/routes')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

// mongo connection
mongoose.connect(`${process.env.MONGO_NAME}`, {
	useNewUrlParser: true, 
	useCreateIndex: true, 
	useUnifiedTopology: true,
	useFindAndModify: false
}, (err) => console.log(err ? `Mongodb error on connection ${err}` : `mongoose connected successfully`))

// next prepare
nextApp.prepare().then(() => {
	app.use(cors())
	app.use(parser.json())
	app.use(parser.urlencoded({extended: true}))
	app.use('/api/exame', exame);
	app.use('/api/pacote', pacote);
	app.use('/api/especificacao', especificacao);
	// react routes
	app.get('*', (req, res) => {
		return nextHandler(req, res)
	})
	server.listen(port, (err) => {
		if (err) throw err
		console.log(`> Ready on localhost:${port}`)
	})
})