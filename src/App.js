import React, {Component} from 'react'
import './App.css'
import "./reset.css"
import Nav from './Components/Nav/Nav';
import Employee from './Components/Employee/Employee';
import axios from "axios";
import io from "socket.io-client";
import LinearProgress from "@material-ui/core/LinearProgress";
import Swal from 'sweetalert2';
import pictures from "./Pictures/pictures";

const socket = io.connect()

export default class App extends Component{
  constructor(){
    super();
    this.state={
      employeeThought: {},
      waitingForResponse: false,
      currentlyInUse: false,
      currentlyInUseWaiting: false,
      serverError: false
    }
    socket.on("in-use", () => {
      this.setState({currentlyInUse: true})
    })
    socket.on("open", (thought) => {
      if(thought !== "error"){
        this.setState({currentlyInUse: false, employeeThought: {...thought, picture: pictures[thought.name]}})
      } else {
        this.setState({currentlyInUse: false})
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: "It looks like there was a problem with the machine. I'm sure everything is fine. Try the button again!"
        })
      }
    })
  }

  componentDidMount(){
    Swal.fire(
      'The Cabilistic Necromancer',
      'A mind reading machine developed by the engineers here at PDQ! Currently it is calibrated to read the minds of PDQ employees. It reads their name, current beer, thought, and daydream. If a loading bar is seen underneath the read a mind button, the machine is currently in use. Wait until it disappears to press the button, give it a try!'
    )
  }

  readMind(){
    if(!this.state.currentlyInUse){
      axios.get("/api/readMind").catch(err => {
        console.log(err)
      })
    } else {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: "It looks like the machine is currently in use. Try the button again when the loading icon disappears!"
      })
    }
  }
  
  render(){
    return(
      <div className="App">
        <Nav />
        <div className="content">
          <button onClick={() => this.readMind()}>Read a mind</button>
          <div className={this.state.currentlyInUse ? "waiting-progress-bar" : "not-visible"}>
            <LinearProgress />
          </div>
          <div className={this.state.employeeThought.name ? "employee-info" : "not-visible"}>
            <Employee employeeThought={this.state.employeeThought} />
          </div>
        </div>
      </div>
    )
  }
}
