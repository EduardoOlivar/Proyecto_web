import React from "react";
import "../hojas-de-estilo/Pregunta.css";
import preguntas from "../ensayoNumeros";
import { useState, useEffect  } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'katex/dist/katex.min.css';
import Box from "@mui/material/Box";
import { red, green,grey } from '@mui/material/colors';
import { getFormatedTime } from '../helper'
import LinearProgress from "@mui/material/LinearProgress";
import { Card, CardContent, CardMedia, CardHeader, List, ListItemButton, Typography } from '@mui/material'
import { Accordion, AccordionDetails, AccordionSummary, Chip, ListItem } from '@mui/material';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import $ from 'jquery';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DatosPreguntas from '../datosPreguntas.json';
import { InlineMath, BlockMath } from 'react-katex';
import Loading from "./Loading";
import Navbar from "./Navbar";
import HeadEnsayo from "./HeadEnsayo";
import Cookies from 'universal-cookie';
import axios from 'axios';
import EnsayoNumerosPro from "./EnsayoNumerosPro";


const Apiurl = "http://127.0.0.1:8000/questions_alternative/?subject=numeros";
const cookies = new Cookies();
function PruebaNumeros(){
  
 




const [post, setPost] = React.useState(null);
  




  React.useEffect(() => {
    axios.get(Apiurl).then((response) => {
      setPost(response.data);
    });
    
  }, []);
  if (!post) return null;
  
    return(
        <div>
            <EnsayoNumerosPro
            ensayo= {post}
            />
        </div>
    ); 
}

export default PruebaNumeros;