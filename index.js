import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import data from './data/data.json'
import routes from './src/routes/crmRoutes'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

const app = express();
const PORT = 3000;

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CRMdb', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// bodyParser setup
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

routes(app);

/**
 * Following code shows how to load static files. 
 * The static method to load images.
 *
 * When no path is used it defaults to
 * '/'.
 */
//for public access
app.use(express.static('./public'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// this is for proxies
app.set('trust proxy', 'loopback');

// method to use JSON
//app.use(express.json());
app.use(express.urlencoded({extended:true}));

//for images folder on path images
app.use('/images', express.static('images'));

app.get('/', (req, res) => {
	//res.send(`A GET request with route '/' on port: ${PORT}`);
	res.json(data);
});


app.post('/newItem', (req, res) => {
	//res.send(`A POST request with route '/newItem' on port: ${PORT}`);

	console.log(req.body);
	res.send(req.body);
});

app.put('/item', (req, res) => {
	res.send(`A PUT request with route '/item' on port: ${PORT}`);
});

app.delete('/item', (req, res) => {
	res.send(`A DELETE request with route '/item' on port: ${PORT}`);
});

app.get('/item/:id', (req, res, next) =>{
	// this is the middleware that pulls the data
	console.log(req.params.id);
	let user = Number(req.params.id);

	console.log(user);

	console.log(data[user]);

	// middleware that uses the request object
	console.log(`Request from: ${req.originalUrl}`);
	console.log(`Request type: ${req.method}`);

	// everything above is middleware, any code added to do anything 
	// before sending a response back
	res.send(data[user]);

	next();

}, (req, res) =>{
	console.log('Did you get the correct data?');
});

// demonstrating how to chain requests by using app.route()
app.route('/chain').get((req, res) => {
	throw new Error();
	//console.log(`A GET response from the chained route on port: ${PORT}`);
}).post((req,res) => {

	console.log(`A POST response from the chained route on port: ${PORT}`);
}).put((req,res) =>{

	console.log(`A PUT response from the chained route on port: ${PORT}`);
}).delete((req,res) => {

	console.log(`A DELETE response from the chained route on port: ${PORT}`);
});

// Error handling function
app.use((err, req, res, next) =>{
	console.error(err.stack);
	res.status(500).send(`Red Alert! Red Alert!: ${err.stack}`);
});

app.listen(PORT, () => {
	console.log(`Your server is running on port: ${PORT}`);
	//console.log(data);
});


