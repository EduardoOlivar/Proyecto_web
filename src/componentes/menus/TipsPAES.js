import React from "react";
import frases from "../../frases";

function TipsPAES() {
    const numeroAleatorio = Math.floor(Math.random() * frases.length) ;
    return(
    <div className="motivation-container">
    <p className="motivation-text">"{frases[numeroAleatorio]}"</p>
     </div>
    )
}

export default TipsPAES;
