import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import DataBase from './DataBase.js';
import PlayArrow from '@material-ui/icons/PlayArrow';
import processQuery from './processQueries.js';

const commands = [
	"CREATE-COLS [columsArray]",
	"INSERT-VALUES [valuesArray]",
	"SELECT-ROW-WHERE [column, value]",
	"UPDATE-TO-WHERE [column, newValue, actualValue]",
	"DELETE-WHERE [column, value]"
];

const useStyles = makeStyles(theme => ({
	title: { 
		marginTop: "3vh",
		marginBottom: "3vh"
	}
}));

export default function App(props){
	const classes = useStyles();
	
	let [query, setQuery] = useState("");
	let [columns, setColumns] = useState([]);
	let [rows, setRows] = useState({ rows: [] });

  return (
		<Grid container
			className="App"
			justifyContent="center" 
			spacing={2}>
			<Grid item xs={10} className={classes.title}>
				<Typography variant="h5" align="center">SpreadSheet Database</Typography>
			</Grid>
			<Grid item xs={8}>
				<TextField onBlur={ e => setQuery(e.target.value) } 
					label="Insira um comando SQL" 
					variant="filled"
					fullWidth/>
			</Grid>
			<Grid item xs={2}>
				<Button variant="contained" 
					color="primary"
					onClick={ e => {
						const processed = processQuery(query);

						if(processed.columns){
							setColumns(processed.columns);
						}else if(processed.updated){
							setRows({ rows: processed.updated });
						}else{
							setRows({ rows: processed.rows });
						}
					} }><PlayArrow/></Button>
			</Grid>
			<Grid item xs={11}>{ console.log(rows) }
				<DataBase columns={ columns } rows={ rows.rows } />
			</Grid>
			<Grid item xs={10} className={classes.title}>
				<Paper>
					<Typography variant="subtitle1" align="center">Comandos disponíveis</Typography>
					<List component="nav" aria-label="Lista de comandos disponiveis">
					{commands.map(com => (
						<ListItem>
							<ListItemText primary={com}/>
						</ListItem>
					))}
					</List>
				</Paper>
			</Grid>
		</Grid>
  );
};
