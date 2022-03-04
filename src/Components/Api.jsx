import React from 'react'

class Api extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    }
  }

  componentDidMount() {
    fetch('https://gbfs.citibikenyc.com/gbfs/en/station_infordsadsadmation.json', { mode: 'no-cors' })
      .then(
        (res) => res.json(),
      )
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items,
          })
        },
        // Nota: es importante manejar errores aquí y no en
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          })
        },
      )
  }

  render() {
    const { error, isLoaded, items } = this.state

    if (error) {
      return (
        <div>
          Error:
          {error.message}
        </div>
      )
    } if (!isLoaded) {
      return <div>Loading...</div>
    }
    return (
      <div>{items}</div>

    )
  }
}

export default Api
