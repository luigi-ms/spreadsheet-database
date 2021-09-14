const express = require('express'),
			parser = require('body-parser'),
			cors = require('cors');

const app = express();
const table = {
  columnsNames: [],
  rows: []
}

function getColumnIndex(columnName){
	const columnNameIndex = table.columnsNames.findIndex(col => col === columnName);
	return columnNameIndex;
}

function getRowIndex(value){
	const rowIndex = table.rows.findIndex(row => row.some(datum => datum === value));
	return rowIndex;
}

async function columnExists(column){
	const existsAsColumn = await table.columnsNames.some(col => col === column);
	return existsAsColumn ? true : false;
}

async function valueExists(value = ""){
	const existsAsData = await table.rows.some(row => row.some(cell => cell === value));
	return existsAsData ? true : false;
}

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cors());

//GET ALL DATA
app.get('/all-data', (req, res) => {
	res.send({ columns: table.columnsNames, rows: table.rows });
});

//SELECT
app.get('/data', async function(req, res){
	const [col, value] = [req.query.column, req.query.value];

	try{
		const thereIsValue = await valueExists(value);
		const	thereIsColumn = await columnExists(col);

		if(thereIsValue && thereIsColumn){
			const rowIndex = getRowIndex(value);
			res.send({ found: table.rows[rowIndex] });
		}else{
			res.send({ error: "Informação inexistente" });
			res.status(404);
		}
	}catch(err){
		console.log("getError: "+err);
		res.status(500);
	}	
});

//INSERT
app.post('/data/new', (req, res) => {
	table.rows.push(req.body.values);
	res.send(table.rows);
});

//UPDATE
app.put('/data/change', async function(req, res){
	const [col, id, newValue] = [req.body.column, req.body.id, req.body.newValue];

	try{
		const thereIsValue = await valueExists(id);
		const thereIsColumn = await columnExists(col);

		if(thereIsValue && thereIsColumn){
			const [colIndex, rowIndex] = [getColumnIndex(col), getRowIndex(id)];
			table.rows[rowIndex][colIndex] = newValue;
			res.send({ updated: table.rows[rowIndex] });
		}else{
			res.send({ error: "Informação inexistente" });
			res.status(404);
		}
	}catch(err){
		console.log("putError: "+err);
		res.status(500);
	}
});

//DELETE
app.delete('/data/erase', async function(req, res){
	const [column, value] = [req.query.column, req.query.value];

	try{
		const thereIsValue = await valueExists(value);
		const thereIsColumn = await columnExists(column);

	  if(thereIsValue && thereIsColumn){
  	  const rowIndex = getRowIndex(value);
			table.rows = table.rows.filter((row, index) => index !== rowIndex);
			res.send({ updated: table.rows });
  	}else{
    	res.send({ error: "Informação inexistente" });
			res.status(404);
	  }
	}catch(err){
		console.log("deleteError: "+err);
		res.status(500);
	}
});

//CREATE
app.post('/table/new', (req, res) => {
  table.columnsNames = req.body.columnsNames;
  res.send({ columns: table.columnsNames });
});

app.listen(5000, () => {
	console.log("Running at http://localhost:5000");
});
