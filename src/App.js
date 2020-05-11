import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  const [busqueda, setBusqueda] = useState('');
  const [imagenes, setImagenes] = useState([])
  const [paginaactual, setPaginaactual] = useState(1);
  const [totalpaginas, setTotalpaginas] = useState(1);

  useEffect(() => {


    const consultaAPI = async () => {
      if (busqueda === '') {
        return;
      }
      const imagenesPorPagina = 30;
      const key = "16486565-a1dc50fd9674036d3dd166074";
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      setImagenes(resultado.hits);
      setTotalpaginas(Math.ceil(resultado.totalHits/imagenesPorPagina));
      // Mover la página hacia arriba
      const jumbotron = document.querySelector('.jumbotron')
      jumbotron.scrollIntoView({behavior: 'smooth'})
    }
    consultaAPI();
  }, [busqueda, paginaactual])

  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual -1;
    if (nuevaPaginaActual === 0) { return;}
    setPaginaactual(nuevaPaginaActual);
  }

  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;
    if (nuevaPaginaActual > totalpaginas) { return;}
    setPaginaactual(nuevaPaginaActual);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Formulario setBusqueda={setBusqueda}></Formulario>
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes imagenes={imagenes}></ListadoImagenes>
        {(paginaactual === 1) ? null : (
          <button className="bbtn btn-info mr-1" onClick={paginaAnterior}>&laquo; Anterior</button>
        )}
        {(paginaactual === totalpaginas) ? null : (
          <button className="bbtn btn-info" onClick={paginaSiguiente}>Siguiente &raquo;</button>
        )}
        
      </div>
    </div>
  );
}

export default App;
