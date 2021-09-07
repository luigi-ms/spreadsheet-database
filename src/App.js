import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DataBase from './DataBase.js';
import PlayArrow from '@material-ui/icons/PlayArrow';

const useStyles = makeStyles(theme => ({
	title: { textAlign: "center" }
}));

function App() {
	const classes = useStyles();

  return (
    <div className="App">
			<Grid container 
				justifyContent="center" 
				spacing={2}>
				<Grid item alignItems="center" xs={10}>
					<h1 className={classes.title}>SpreadSheet Database</h1>
				</Grid>
				<Grid item xs={6}>
					<Button variant="contained" 
						color="primary">Limpar tabela</Button>
				</Grid>
				<Grid item xs={8}>
					<TextField type="search" 
						label="Insira um comando SQL" 
						variant="outlined" 
						fullWidth/>
				</Grid>
				<Grid item xs={2}>
					<Button variant="contained" 
						color="secondary"><PlayArrow/></Button>
				</Grid>
				<Grid item xs={11}>
					<DataBase/>
				</Grid>
			</Grid>
    </div>
  );
}

export default App;
