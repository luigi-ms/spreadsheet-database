const axios = require('axios');

const commands = {
	select: selectFrom,
	create: createTable,
	insert: insertInto,
	delete: deleteWhere,
	update: updateToWhere
};

function processQuery(query){
	const com = query.substring(0, 6).toLowerCase();
	let params = "";
	
	for(let c of query){
		if(c === '[') break;
		query = query.substr(1);
	}
	params = JSON.parse(query);
	commands[com](params);
}

function getAllData(){
	axios.get("http://localhost:5000/all-data")
		.then(res => console.log(res.data))
		.catch(err => console.log("GetAllError: "+err));
}

function selectFrom([val, col]){
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

function deleteWhere([col, val]){//deal with error string received but int stored
	console.log("type: "+typeof(val));
	axios.delete("http://localhost:5000/data/erase", { params: { column: col, value: val} })
		.then(res => console.log("Deleted: "+res.data))
		.catch(err => console.log("DeleteError: "+err));
}

function updateToWhere([col, newName, id]){
	axios.put("http://localhost:5000/data/change", { column: col, id: id, newValue: newName })
		.then(res => console.log(res.data))
		.catch(err => console.log("UpdateError: "+err));
}

processQuery("CREATE-TABLE [\"id\", \"nome\", \"cpf\"]");
processQuery("INSERT-INTO [1, \"luigi\", \"07099519301\"]")
getAllData();
processQuery("DELETE-WHERE [\"id\", 1]");
