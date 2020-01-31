import React, { Component } from 'react';
import axios from 'axios';

  class App extends Component {
   
    constructor() {
      super();
      this.crearEmpleado = this.crearEmpleado.bind(this);
      this.escribirEstado = this.escribirEstado.bind(this);
      this.editar = this.editar.bind(this);
   //this.eliminar = this.eliminar.bind(this);
   this.state = {
          
          empleado:[],
          id:'',
          nombre:'',
          apellido:'',
          sueldo:'',
          envio:true
      };
    }

    componentDidMount() {
      this.getEmpleados();
    
   }

async getEmpleados() {
  try {
    const res = await axios.get('http://127.0.0.1/rest_api/obtenerdatos.php');
        this.setState({
            empleado:res.data
          })
        
     } catch (error) {
       console.error(error);
     }
    }

async crearEmpleado(e) {
   e.preventDefault();
   
  try {
    if(this.state.envio){
    const {nombre, apellido, sueldo} = this.state;
    const obj1 = {nombre:nombre, apellido:apellido, sueldo:sueldo };
    await axios.post('http://127.0.0.1/rest_api/creardatos.php',obj1);
    
     }else{
      const {id, nombre, apellido, sueldo} = this.state;
      const obj2 = {id:id, nombre:nombre, apellido:apellido, sueldo:sueldo };
      await axios.post('http://127.0.0.1/rest_api/editar.php',obj2);
     
     }
      
       } catch (error) {
        console.error(error);
      }
     this.setState({
       id:'',
       nombre:'',
       apellido:'',
       sueldo:'',
       envio:true,
     })
     this.getEmpleados();
    }

    escribirEstado(e) {
     const {name , value} = e.target;
     this.setState({
      [name]:value
       });
     }

   async eliminar(e,id) {
      e.preventDefault();
      const obj = {id:id}; 
      try {
     
        if(window.confirm("esta seguro de querer elinarlo")){
          await axios.post('http://127.0.0.1/rest_api/eliminar.php',obj); 
          this.getEmpleados();
        }
         
       } catch (error) {
        console.error(error);
      }
    }
    
async editar(e, id){
  e.preventDefault();
  const obj = {id:id}; 
  try {
    const res = await axios.post('http://127.0.0.1/rest_api/obteneruno.php',obj);
    this.setState({
      id:res.data[0].id,
      nombre:res.data[0].nombre,
      apellido:res.data[0].apellido,
      sueldo:res.data[0].sueldo,
      envio:false
    });    
    console.log(res);
        this.getEmpleados();
       } catch (error) {
        console.error(error);
      }
    }

   
 render(){
      return(

    <div className="container p-4">
      <nav className="navbar navbar-dark bg-dark mb-2">
  <span className="navbar-brand mb-0 h1">CRUD-REACT-PHP-MYSQL</span>
      </nav>
      <form onSubmit={this.crearEmpleado}>
        <input type="text"  name="nombre"   onChange={this.escribirEstado} 
        value={this.state.nombre} placeholder="nombre"/>

          <input type="text" name="apellido"  onChange={this.escribirEstado} 
          value={this.state.apellido} placeholder="apellido"/>

          <input type="number"  name="sueldo" onChange={this.escribirEstado}
          value={this.state.sueldo} placeholder="sueldo"/>
        <input type="submit" className="btn btn-success" value="Submit" />
      </form>   
       <div className="row p-3">
           
            {
             this.state.empleado.map(item=>{
               return (
                
                 <div className="card p-2 m-2" key={item.id}>
                  <img  width="60" src="logo192.png" alt="img"></img>
                   <div className="card-body">
                    <h6>{item.nombre}</h6>
                    <h6>{item.apellido}</h6>
                    <h6>{item.sueldo}</h6>
                 <button className="btb btn-danger mx-2"
                 onClick={(e)=>this.eliminar(e,item.id)}>delete</button>
                 <button className="btb btn-info"
                 onClick={(e)=>this.editar(e,item.id)}>edit</button>
                 </div>
                 
                 </div>
               )
            })
            }

              </div>
          </div>
         
      );
  
  }
};
export default App;