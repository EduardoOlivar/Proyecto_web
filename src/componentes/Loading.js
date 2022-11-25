import React from 'react';
import {Spinner} from 'reactstrap';
import '../hojas-de-estilo/Pregunta.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Loading() {
    return (
        <div className='loading'>
            <div className='loadingH'>
                <Spinner color='black'/>
            </div>
            
        </div>
    );
}

export default Loading;