import React from 'react'

class Api extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      num: '',
      resultado: [],
      nombre : '',
      listItems : []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getDetail = this.getDetail.bind(this);
  }

  componentDidMount() {
    const {
      items, num, nombre
    } = this.state

    fetch('http://api.steampowered.com/ISteamApps/GetAppList/v2')
      .then(
        (res) => res.json(),
      )
      .then(
        (result) => {
          // console.log(result.applist.apps.length)
          //console.log(result.applist.apps)
          // console.log('test name',
          //   (result.applist.apps.filter(
          //   (item) => 
          //   item.name.toString().toLowerCase().indexOf(nombre.toString().toLowerCase()) > -1)
          //    || null))

          this.setState({
            isLoaded: true,
            items: result.applist.apps,

          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          })
        },
      )
  }

  // imagenes de Steam
  // https://cdn.cloudflare.steamstatic.com/steam/apps/757580/header.jpg 654970

  handleChange(event) {
    this.setState({
      nombre: event.target.value,
    
    })
  }

  handleSubmit(event) {

    event.preventDefault()
    this.getDetail()
    this.setState({
        resultado: (this.state.items.filter(
        (item) => 
        item.name.toString().toLowerCase().indexOf(this.state.nombre.toString().toLowerCase()) > -1)),

    })
   
  }

  getDetail(id){
    fetch(`https://store.steampowered.com/api/appdetails?appids=${id}`)
      .then(
        (res) => res.json(),
      )
      .then(
        (result) => {
          console.log('detalle: ',result)
          return result
        },
        (error) => {
          console.log('error Detalle: ',error)
        },
      )
  }

  render() {
    const {
      error, isLoaded, num, resultado,items,nombre
    } = this.state

    

    const src = (
      num !== '' && resultado &&  resultado.length == 1
        ? `https://cdn.cloudflare.steamstatic.com/steam/apps/${num}/header.jpg`
        : '')

     //console.log(resultado)
    //console.log('resultado:', resultado)

    const listItem = (
      resultado !== null
      ?  resultado.slice(0, 5).map((result) =>
      
      <>
        {console.log(this.getDetail(result.appid))}
        <div key={result.appid} class="card p-3" style={{width: 2 + 'rem'}}>
          <img class="card-img-top" src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${result.appid}/header.jpg`} alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title">{result.name}</h5>
             {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
            <a href={`https://store.steampowered.com/agecheck/app/${result.appid}/`} class="btn btn-primary">Tienda</a> 
          </div>
        </div>
        
      </>
      ) 
      : <li>sin resultados</li>
      )
    

      
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

      <>

      <nav class="navbar navbar-light bg-dark">
        <a class="navbar-brand text-light font-weight-bold" href="#">STEAM LIST</a>
    
          <form onSubmit={this.handleSubmit} class="form-inline my-2 my-lg-0">
            <input class="form-control" type="text" value={nombre} onChange={this.handleChange} />
            <button type="submit" value="Submit" class="btn btn-secondary my-2 my-sm-0">Buscar</button> 
          </form>
     
      </nav>
      
      <div class="card-group">
      {listItem}
      </div>
      </>
    )
  }
}

export default Api
