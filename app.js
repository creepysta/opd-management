const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const graphQlResolvers = require('./graphql/resolvers/index');
const graphQlSchema = require('./graphql/schema/index');
const isAuth = require('./middleware/is-auth');

const app = express();
app.use(bodyParser.json());

app.use((req,res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
	if(req.method == 'OPTIONS') {
		res.sendStatus(200);
	}
	next();
})


//query for sending request from frontend
// /*
fetch('http://localhost:8000/graphql', {
	method: 'POST',
	body: JSON.stringify(requestBody),
	headers: {
		'Content-Type': 'application/json'
	}
})
	.then(res=> {
		if(res.status !== 200 || res.status !== 201) {
			throw new Error('Connection Failed.');
		}
		return res.json();
	})
	.then(resData => {
		console.log(resData)
	})
	.catch(err=> {
		console.log(err);
		throw err;
	});

// */

app.use(isAuth);
app.use('/graphql', graphqlHttp({
	schema: graphQlSchema,
	rootValue: graphQlResolvers,
	graphiql: true
}));


mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-bxg3r.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
	.then(() => app.listen(8000))
	.catch((err) => console.log(err));
