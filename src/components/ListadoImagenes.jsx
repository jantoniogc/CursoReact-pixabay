import React from 'react';
import Imagen from './Imagen';
import PropTypes from 'prop-types';

const ListadoImagenes = ({ imagenes }) => {
  return (
    <div className="col-12 p-5 row">
      {imagenes.map(img => (
        <Imagen
          key={img.id}
          imagen={img}
        ></Imagen>
      ))}
    </div>
  );
}

ListadoImagenes.propTypes= {
  imagenes: PropTypes.array.isRequired
}

export default ListadoImagenes;