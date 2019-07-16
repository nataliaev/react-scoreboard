import React, { Component } from "react";
import Player from "./Player";
import "./Scoreboard.css";
import AddPlayer from "./AddPlayer";

export default class Scoreboard extends Component {
  state = {players : [
                  {id: 1, name: "Arien", score: 2}, 
                  {id: 2, name: "David", score: 5},
                  {id: 3, name: "Mimi", score: 4}]}

  renderPlayer = player => {
    return <Player 
      id={player.id}
      name={player.name} 
      score={player.score} 
      key={player.id}
      incrementScore={this.incrementScoreOfPlayer}
      deleteItemFromState={this.deleteThisItem}
    />
  }

  deleteThisItem = thisId => {
    this.setState({
      players : this.state.players.filter(player => player.id !== thisId)})
  }

  incrementScoreOfPlayer = theId => {
    const updatedPlayers = this.state.players
    .map(player => {
      if (player.id === theId) {
        player.score++
      }
      return player
    })
    this.setState({
      players : updatedPlayers
    })
  }
  
  addPlayer = (name) => {
    this.setState({
      players: this.state.players
      .concat({id: Math.round(Math.random()*100000), name, score: 0})
    })
  }

  render() {
    const players = [...this.state.players].sort((a, b) => b.score - a.score);
    
    return ( 
      <div className="scoreboard">
        <h1>Scoreboard</h1>
        <ul>
          {players.map(this.renderPlayer)}
          <AddPlayer addPlayer={this.addPlayer}/>
        </ul>
      </div>
    )
  }
}