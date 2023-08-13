
import './App.css';
import { useState } from 'react';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';
import Chip from '@mui/material/Chip';
const base_path = "http://192.168.1.6:50100/"
function App() {
  const [angulo,setAngulo] =useState(15);

  const restarAngulo=()=>{
    let aux_angulo = angulo
    aux_angulo = angulo-5
    if(aux_angulo < 10){
      aux_angulo = 15
    }
    setAngulo(aux_angulo)
    enviarAngulo(aux_angulo)

  }

  const sumarAngulo=()=>{
    let aux_angulo = angulo
    aux_angulo = angulo+5
    if(aux_angulo > 220){
      aux_angulo = 220
    }
    setAngulo(aux_angulo)
    enviarAngulo(aux_angulo)

  }


  const enviarAngulo=async(angulo)=>{
    var res;
	await axios.post(`${base_path}/angulo`,{angulo:angulo})
		.then(response => {
           res = response.data;
		})
		.catch(function (error) {
			console.error(error);
		});
    return res

  }



  return (


       
        <Container maxWidth="lg">
        <h5 style={{justifyContent:"center",textAlign:"center"}}>
          Sistema de Monitoreo Smart-Home
        </h5>
        <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <img src="http://192.168.1.6:50100/video" className='img-source'/>
        </Grid>
        <Grid item xs={12} md={4}>
        <Stack direction="column" spacing={2}>
      <Button variant="contained" color='secondary' onClick={restarAngulo} startIcon={<ArrowBackIcon />}>
        MOVER IZQUIERDA
      </Button>
      <Button variant="contained"  color='secondary' onClick={sumarAngulo} endIcon={<ArrowForwardIcon />}>
        MOVER DERECHA
      </Button>
      <Chip label={`Angulo de Camara: ${angulo}`} color="warning" />
    </Stack>
        </Grid>
      </Grid>
      </Container>
       

  );
}

export default App;
