import React from "react";
import "./App.css";

import Header from "./components/Header";
import ToyForm from "./components/ToyForm";
import ToyContainer from "./components/ToyContainer";

class App extends React.Component {
  state = {
    display: false,
    toys: [],
  };

  componentDidMount() {
    fetch("http://localhost:3000/toys")
      .then((res) => res.json())
      .then((toys) => {
        this.setState({
          toys,
        });
      });
  }

  handleClick = () => {
    let newBoolean = !this.state.display;
    this.setState({
      display: newBoolean,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newToyName = e.target[0].value;
    const newToyImage = e.target[1].value;
    e.target.reset()
    const data = {
      name: newToyName,
      image: newToyImage,
      likes: 0,
    };

    fetch("http://localhost:3000/toys", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        const newToy = [...this.state.toys, data];
        this.setState({
          toys: newToy,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  handleDelete = (id) => {
    fetch("http://localhost:3000/toys/" + id, {
      method: "DELETE",
    })
      .then((res) => res.text()) // or res.json()
      .then((res) => {
        const updatedToys = this.state.toys.filter((toy) => toy.id !== id);
        this.setState({
          toys: updatedToys,
        });
      });
  };

  handleLike = (id, likeCount) => {
    console.log(id);
    const data = {
      likes: likeCount + 1,
    };
    fetch("http://localhost:3000/toys/" + id, {
      method: "PATCH", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        const id = data.id;
        const updatedToys = this.state.toys.map((toy) => {
          if (toy.id === id) {
            return {
              ...toy,
              likes: toy.likes + 1,
            };
          } else {
            return toy;
          }
        });
        this.setState({
          toys: updatedToys,
        });
      });
  };

  render() {
    return (
      <>
        <Header />
        {this.state.display ? (
          <ToyForm handleSubmit={this.handleSubmit} />
        ) : null}
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer
          toys={this.state.toys}
          handleDelete={this.handleDelete}
          handleLike={this.handleLike}
        />
      </>
    );
  }
}

export default App;
