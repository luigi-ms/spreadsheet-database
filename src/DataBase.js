import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';

let defaultColumnNames = ["column01", "column02", "column03", "column04", "column05"];

const useStyles = makeStyles(theme => ({
	tableHeadColors: {
		backgroundColor: "rgb(16, 29, 37)",
		color: "rgb(210, 215, 219)"
	},
	tableBodyColors:{
		backgroundColor: "rgb(35, 45, 54)",
		color: "rgb(173, 181, 184)"
	},
	tableSpacing: { marginTop: "3vh" }
}));

export default function DataBase(props){
	const classes = useStyles();

	return(
		<TableContainer className={classes.tableSpacing}>
			<Table aria-label="Spreadsheet" color="primary">
				<TableHead>
					<TableRow align="right">
						{defaultColumnNames.map(name => (
							<TableCell className={classes.tableHeadColors}>{name}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{[0, 1, 2, 3, 4].map(column => (
						<TableRow align="right">
							{[0, 1, 2, 3, 4].map(row => (
								<TableCell className={classes.tableBodyColors}>{props.value}</TableCell>	
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
