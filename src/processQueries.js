import axios from 'axios';

const commands = {
	select: selectFrom,
	create: createTable,
	insert: insertInto,
	delete: deleteWhere,
	update: updateToWhere
};

export default function processQuery(query){
	const com = query.substring(0, 6).toLowerCase();
	let params = "";
	
	for(let c of query){
		if(c === '[') break;
		query = query.substr(1);
	}
	params = JSON.parse(query);
	commands[com](params);
}

function selectFrom([col, val]){
	axios.get("http://localhost:5000/data", { params: { column: col, value: val } })
		.then(res => console.log("Selected: "+res.data.found))
		.catch(err => console.log("SelectError: "+err));
}

function createTable(columnsArray){
	axios.post("http://localhost:5000/table/new/", { columnsNames: columnsArray })
		.then(res => console.log("Created: "+res.data.columns))
		.catch(err => console.log("CreateError: "+err));
}

function insertInto(valuesArray){
	axios.post("http://localhost:5000/data/new", { values: valuesArray })
		.then(res => console.log("Inserted: "+res.data))
		.catch(err => console.log("InsertError: "+err));
}

function deleteWhere([col, val]){
	axios.delete("http://localhost:5000/data/erase", { params: { column: col, value: val} })
		.then(res => console.log("Deleted: "+res.data.updated))
		.catch(err => console.log("DeleteError: "+err));
}

function updateToWhere([col, newName, actualValue]){
	axios.put("http://localhost:5000/data/change", { column: col, id: actualValue, newValue: newName })
		.then(res => console.log("Updated: "+res.data.updated))
		.catch(err => console.log("UpdateError: "+err));
}

//processQuery("CREATE-TABLE [\"id\", \"nome\", \"cpf\"]");
//processQuery("INSERT-INTO [\"1\", \"luigi\", \"07099519301\"]")
//processQuery("SELECT-ROW-WHERE [\"id\", \"1\"]");
//processQuery("UPDATE-TO-WHERE [\"nome\", \"miguel\", \"luigi\"]");
//processQuery("DELETE-WHERE [\"id\", \"1\"]");
