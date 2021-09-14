const table = {
	columnsNames: [],
	rows: [[]]
};

const commands = {
	select: selectRowWhere,
	create: createTable,
	insert: insertInto,
	delete: deleteWhere,
	update: updateToWhere
};

export function processQuery(query){
	const com = query.substring(0, 6).toLowerCase();
	let params = "";
	
	for(let c of query){
		if(c === '[') break;
		query = query.substr(1);
	}
	params = JSON.parse(query);
	commands[com](params);
}

export function getAllData(){
	return {
		columns: table.columnsNames,
		rows: table.rows
	}
}

function getColumnIndex(column){
	return table.columnsNames.findIndex(col => col === column);
}

function getRowIndex(row){
	return table.rows.findIndex(row => row.some(cell => cell === row));
}

function thisColumnExists(column){
	const exists = table.columnsNames.some(col => col === column);
	return exists ? true : false;
}

function thisDatumExists(datum){
	const exists = table.rows.some(row => row.some(cell => cell === datum));
	return exists ? true : false;
}

async function selectRowWhere([col, val]){
	try{
		const thereIsThisColumn = await thisColumnExists(col);
		const thereIsThisValue = await thisDatumExists(val);

		if(thereIsThisColumn && thereIsThisValue){
			const rowIndex = getRowIndex(val);
			return { found: table.rows[rowIndex]}
		}else{
			return { error: "Informação inexistente" }
		}
	}catch(err){
		console.log("SelectError: "+err);
	}
}

function createTable(columnsArray){
	table.columnsNames = columnsArray;
	return { columns: table.columnsNames }
}

function insertInto(valuesArray){
	table.rows.push(valuesArray);
	return { rows: table.rows }
}

async function deleteWhere([col, val]){
	try{
		const thereIsThisColumn = await thisColumnExists(col);
		const thereIsThisValue = await thisDatumExists(val);

		if(thereIsThisColumn && thereIsThisValue){
			const rowIndex = getRowIndex(val);
			table.rows = table.rows.filter((row, index) => index !== rowIndex);
			return { updated: table.rows };
		}else{
			return { error: "Informação inexistente" }
		}
	}catch(err){
		console.log("DeleteError: "+err);
	}
}

async function updateToWhere([col, newValue, actualValue]){
	try{
		const thereIsThisColumn = await thisColumnExists(col);
		const thereIsThisValue = await thisDatumExists(actualValue);

		if(thereIsThisColumn && thereIsThisValue){
			const [colIndex, rowIndex] = [getColumnIndex(col), getRowIndex(actualValue)];
			table.rows[rowIndex][colIndex] = newValue;
			return { updated: table.rows[rowIndex] };
		}else{
			return { error: "Informação inexistente" };
		}
	}catch(err){
		console.log("UpdateError: "+err);
	}
}
