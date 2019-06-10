import React, {Component} from 'react'
import './Nav.css'


export default class Nav extends Component{
    constructor(){
        super();
        this.state={
            
        }
    }
    
    render(){
        return(
            <div className="nav-bar">
                <div className="image-container">
                    <img src="https://www.pdq.com/wp-content/uploads/2017/10/header-dark.png" alt="Logo"/>
                </div>
                <p>Cabilistic Necromancer</p>
            </div>
        )
    }
}