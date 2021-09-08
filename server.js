const express = require('express');
const app = express();

//SELECT
app.get('/', (req, res) => {
	console.log("requisition: ");
});

//INSERT
app.post('/', (req, res) => {});

//UPDATE
app.put('/', (req, res) => {});

//DELETE
app.delete('/', (req, res) =>{});

app.listen(3300, () => {
	console.log("Running at http://localhost:3300");
});
