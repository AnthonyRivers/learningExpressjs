import express from 'express';
import data from './data/data.json'

const app = express();
const PORT = 3000;

/**
 * Following code shows how to load static files. 
 * The static method to load images.
 *
 * When no path is used it defaults to
 * '/'.
 */
//for public access
app.use(express.static('./public'));

//for images folder on path images
app.use('/images', express.static('images'));

app.get('/', (req, res) => {
	//res.send(`A GET request with route '/' on port: ${PORT}`);
	res.json(data);
});

app.post('/newItem', (req, res) => {
	res.send(`A POST request with route '/newItem' on port: ${PORT}`);
});

app.put('/item', (req, res) => {
	res.send(`A PUT request with route '/item' on port: ${PORT}`);
});

app.delete('/item', (req, res) => {
	res.send(`A DELETE request with route '/item' on port: ${PORT}`);
});

app.get('/item/:id', (req, res) =>{
	console.log(req.params.id);
	let user = Number(req.params.id);

	console.log(user);

	console.log(data[user]);

	res.send(data[user]);
});
app.listen(PORT, () => {
	console.log(`Your server is running on port: ${PORT}`);
	//console.log(data);
});


