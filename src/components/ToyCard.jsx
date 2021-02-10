import React, { Component } from 'react';

class ToyCard extends Component {

  render() {
    const { id, image, likes, name } = this.props
    return (
      <div className="card" key={id}>
        <h2>{name}</h2>
        <img src={image} alt={name} className="toy-avatar" />
        <p>{likes} Likes </p>
        <button className="like-btn" onClick={()=>this.props.handleLike(id, likes)}>Like {'<3'}</button>
        <button className="del-btn" onClick={()=>this.props.handleDelete(id)}>Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
