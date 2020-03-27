const app = require('express')()
const cors = require('cors')
const next = require('next')
const parser = require('body-parser')
const server = require('http').Server(app)
const routes = require('./server/routes')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

// next prepare
nextApp.prepare().then(() => {
	app.use(cors())
	app.use(parser.json())
	app.use(parser.urlencoded({extended: true}))
	app.use('/api', routes);
	// react routes
	app.get('*', (req, res) => {
		return nextHandler(req, res)
	})
	server.listen(port, (err) => {
		if (err) throw err
		console.log(`> Ready on localhost:${port}`)
	})
})