import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';

let defaultColumnNames = ["column01", "column02", "column03", "column04", "column05"];

export default function DataBase(){
	return(
		<TableContainer>
			<Table aria-label="Spreadsheet" color="primary">
				<TableHead>
					<TableRow>
						{defaultColumnNames.map(name => (
							<TableCell>{name}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{[1, 2, 3, 4, 5].map(column => (
						<TableRow>
							{[0, 1, 2, 3, 4].map(row => (
								<TableCell></TableCell>	
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
