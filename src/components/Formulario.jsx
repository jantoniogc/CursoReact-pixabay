import React, { useState } from 'react';
import Error from './Error';
import PropTypes from 'prop-types';


const Formulario = ({setBusqueda}) => {
  const [termino, setTermino] = useState('');
  const [error, setError] = useState(false);

  const buscarImagenes = (e) => {
    e.preventDefault();
    if (termino.trim() === '') {
      setError(true);
      return;
    }
    setError(false);
    setBusqueda(termino);
  }

  return (
    <form
      onSubmit={buscarImagenes}>
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Bucar una imagen, ejemplo: futbol, cafe ..."
            onChange={e => setTermino(e.target.value)}>
          </input>
        </div>
        <div className="form-group col-md-4">
          <input
            type="submit"
            className="btn btn-lg btn-danger btn-block">
          </input>
        </div>
      </div>
      {(error) ? <Error mensaje="Agrega un termino de busqueda"></Error> : null}
    </form>
  );
}

Formulario.propTypes = {
  setBusqueda: PropTypes.func.isRequired
}

export default Formulario;