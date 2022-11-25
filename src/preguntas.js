import { InlineMath, BlockMath } from 'react-katex';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatosPreguntas from './datosPreguntas.json';



const preguntas = [
   {
    titulo: "¿Cuál de las siguientes cantidades corresponde al 5 % del precio de un artículo?",
    opciones: [
        {textoRespuesta: "El precio del artículo dividido por 100, y luego multiplicado por 5. ", isCorrect: true},
        {textoRespuesta: "El precio del artículo multiplicado por cinco décimos.", isCorrect: false},
        {textoRespuesta: "Un quinto del precio del artículo.", isCorrect: false},
        {textoRespuesta: "El precio del artículo dividido por 5, y luego multiplicado por 100.", isCorrect: false},
    ],
    numeroPregunta:"1",
    videoRespuesta:"https://www.youtube.com/embed/OxgnJ-IgxA0?start=1547"
 
   }, 
   {
    titulo: "Un número aumentado en su 30% es igual a 910.",
    opciones: [
        {textoRespuesta: "273", isCorrect: false},
        {textoRespuesta: "637", isCorrect: false},
        {textoRespuesta: "700", isCorrect: true},
        {textoRespuesta: "1.183", isCorrect: false},
    ],
    numeroPregunta:"2",
    videoRespuesta:"https://www.youtube.com/embed/OxgnJ-IgxA0?start=1682"
 
   }, 
   {
    titulo: <span>¿Cuál es el resultado de: <InlineMath math={"\\sqrt{2} - \\sqrt{8} + \\sqrt{18}" }/> ?</span> ,
    opciones: [
        {textoRespuesta: <InlineMath math={'\\sqrt{2}'} />, isCorrect: false}, 
        {textoRespuesta: <InlineMath math={"2\\sqrt{2}"}/>, isCorrect: true},
        {textoRespuesta: <InlineMath math={"\\sqrt{12}"}/>, isCorrect: false},
        {textoRespuesta: <InlineMath math={"6\\sqrt{2}"}/>, isCorrect: false},
    ],
    numeroPregunta:"3",
    videoRespuesta:"https://www.youtube.com/embed/OxgnJ-IgxA0?start=1895"
   
   }, 
   {
    titulo: <span>Si <InlineMath math={"\\log_m\\lparen\\frac {8} {125}\\rparen\\ = -3"}/>, ¿cuál es el valor de m? </span>,
    opciones: [
        {textoRespuesta: <InlineMath math={"-\\frac {2} {5}"}/>, isCorrect: false},
        {textoRespuesta: <InlineMath math={"{\\lparen\\frac {8} {125}\\rparen}^{-3}"}/>, isCorrect: false},
        {textoRespuesta: <InlineMath math={"\\frac {2} {5}"}/>, isCorrect: false},
        {textoRespuesta: <InlineMath math={"\\frac {5} {2}"}/>, isCorrect: true},
    ],
    numeroPregunta:"4",
    videoRespuesta:"https://www.youtube.com/embed/OxgnJ-IgxA0?start=2031"
    

   },
   {
    titulo: <span>Las distancias de un planeta a dos satélites naturales son 380.000 km y
    420.000 km. 
    <br/>
    <br/>
    Considera que la velocidad de la luz es <InlineMath math={"c = 300.000.000\\frac {m} {s}"}/> y que 
    <br/>
    <br/>
    <span className='d-flex justify-content-center text-center'><InlineMath math={"c = \\frac {\\text{distancia}} {\\text{tiempo que demora la luz en recorrer dicha distancia}}."}/></span>
    <br/>
    <br/>
    
    ¿Cuál de los siguientes valores corresponde a la diferencia entre los
    tiempos, en <InlineMath math={"s"}/>, que demora la luz en llegar desde cada uno de los
    satélites al planeta? 
    </span> ,
    opciones: [
        {textoRespuesta: <InlineMath math={"3\\ \\cdotp\\ 10\\ \\cdotp\\ (42-38)"}/>, isCorrect: false},
        {textoRespuesta: <InlineMath math={"\\frac {1} {3}\\  \\cdotp\ 10^{-1}\\ \\cdotp (42-38)"}/>, isCorrect: true},
        {textoRespuesta: <InlineMath math={"3\\ \\cdotp\ 10^{12}\\ \\cdotp (42-38)"}/>, isCorrect: false},
        {textoRespuesta: <InlineMath math={"10^{4}\\ \\cdotp (42-38)"}/>, isCorrect: false},
    ],
    numeroPregunta:"5",
    videoRespuesta:"https://www.youtube.com/embed/OxgnJ-IgxA0?start=2394"
    

   },
];

export default preguntas;