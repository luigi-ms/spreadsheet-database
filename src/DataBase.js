import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';

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
					{props.columns.map(col => (
						<TableCell className={classes.tableHeadColors}>{col}</TableCell>
					))}
					</TableRow>
				</TableHead>
				<TableBody>
				{props.rows.map(row => (
					<TableRow align="right">{
						row.map(cell => (
							<TableCell className={classes.tableBodyColors}>{
								cell
							}</TableCell>
						))}
					</TableRow>
				))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
