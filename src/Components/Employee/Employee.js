import React, { Component } from "react";
import "./Employee.css";

export default class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="card">
        <div className="card-header">
          <div className="avatar">
            <img src={this.props.employeeThought.picture} alt="Avatar"/>
          </div>
          <div className="header">
            <h3>{this.props.employeeThought.name}</h3>
            
          </div>
        </div>
        <div className="card-media">
          <img src={this.props.employeeThought.daydream} alt="Daydream" />
        </div>
        <div className="card-content">
          <p><strong>Current Beer: </strong>{this.props.employeeThought.currentBeer ? this.props.employeeThought.currentBeer : "None"}</p>
          <p><strong>Current Thought: </strong>{this.props.employeeThought.currentThought}</p>
        </div>
      </div>
    );
  }
}
