//imports dependencies and files
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import FriendCard from "./components/FriendCard";
import Footer from "./components/Footer";
import marvel from "./marvel.json";
import "./App.css";

//sets state to 0 or empty
class App extends Component {
  state = {
    marvel,
    clickedMarvel: [],
    score: 0
  };

//when you click on a card ... the image is taken out of the array
  imageClick = event => {
    const currentMarvel = event.target.alt;
    const MarvelAlreadyClicked =
      this.state.clickedMarvel.indexOf(currentMarvel) > -1;

//if you click on a image that has already been selected, the game is reset and cards reordered
    if (MarvelAlreadyClicked) {
      this.setState({
        marvel: this.state.marvel.sort(function(a, b) {
          return 0.5 - Math.random();
        }),
        clickedMarvel: [],
        score: 0
      });
        alert("You lose. Play again?");

//if you click on an available marvel, your score is increased and cards reordered
    } else {
      this.setState(
        {
          marvel: this.state.marvel.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          clickedMarvel: this.state.clickedMarvel.concat(
            currentMarvel
          ),
          score: this.state.score + 1
        },
//if you get all 8 images correct you get a congrats message and the game resets        
        () => {
          if (this.state.score === 12) {
            alert("Yay! You Win!");
            this.setState({
              marvel: this.state.marvel.sort(function(a, b) {
                return 0.5 - Math.random();
              }),
              clickedMarvel: [],
              score: 0
            });
          }
        }
      );
    }
  };

//the order of components to be rendered: navbar, jumbotron, friendcard, footer 
  render() {
    return (
      <div>
        <Navbar 
          score={this.state.score}
        />
        <Jumbotron />
        <div className="wrapper">
          {this.state.marvel.map(marvel => (
            <FriendCard
              imageClick={this.imageClick}
              id={marvel.id}
              key={marvel.id}
              image={marvel.image}
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;