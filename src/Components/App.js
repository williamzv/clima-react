import React, { Component } from 'react';
import Header from './Header';
import Formulario from './Formulario';
import Error from './Error';
import Clima from './Clima';


class App extends Component {
  state = {
    error: false,
    consulta: {},
    resultado: {}
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevState.consulta !== this.state.consulta) {
      this.consultarAPI();
    }
  };
  
  consultarAPI = () => {
    const {ciudad, pais} = this.state.consulta;
    if (!ciudad || !pais) {
      return;
    }
    // Query con Fetch API
    const appID = '06dc933a0f6d55f2b7c9c632c17f3d54';
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;

    // Ejecutar el Query con Fetch API
    fetch(url)
      .then( resp => {
        return resp.json();
      })
      .then( data => {
        this.setState({resultado: data});
      })
      .catch(console.error);
  };

  datosConsulta = (respuesta) => {
    if (respuesta.ciudad === '' || respuesta.pais === '') {
      this.setState({error: true, consulta: respuesta});
    } else {
      this.setState({error: false, consulta: respuesta});
    }
  };

  render() {
    const {error} = this.state;
    const {cod} = this.state.resultado;

    let resultado ;
    if(error) {
      resultado = <Error mensaje="Ambos campos son obligatorios" />
    } else if (cod === "404") {
      resultado = <Error mensaje="Ciudad No Encontrada" />
    } else {
      resultado = <Clima resultado={this.state.resultado} />
    }
    return (
      <div className="App">
        <Header titulo="Clima React"/>
        <Formulario datosConsulta={this.datosConsulta} />
        {resultado}
      </div>
    );
  }
}

export default App;
