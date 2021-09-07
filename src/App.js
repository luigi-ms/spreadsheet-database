import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DataBase from './DataBase.js';
import PlayArrow from '@material-ui/icons/PlayArrow';

const useStyles = makeStyles(theme => ({
	title: { 
		marginTop: "3vh",
		marginBottom: "3vh"
	}
}));

export default function App() {
	const classes = useStyles();

  return (
    <div className="App">
			<Grid container 
				justifyContent="center" 
				spacing={2}>
				<Grid item xs={10} className={classes.title}>
					<Typography variant="h5" align="center">SpreadSheet Database</Typography>
				</Grid>
				<Grid item xs={8}>
					<TextField type="search" 
						label="Insira um comando SQL" 
						variant="filled" 
						fullWidth/>
				</Grid>
				<Grid item xs={2}>
					<Button variant="contained" 
						color="primary"><PlayArrow/></Button>
				</Grid>
				<Grid item xs={11}>
					<DataBase/>
				</Grid>
			</Grid>
    </div>
  );
}
