import React from 'react';

class Fish extends React.Component {
  render() {
    const { details } = this.props;

    return (
      <li className="menu-fish">
        <img src={details.image} alt={details.name} />
        <h3 className="fish-name">
          {details.name}
          <span className="price">{details.price}</span>
        </h3>
        <p>{details.desc}</p>
        <button>Add To order</button>
      </li>
    )
  }
}

export default Fish;
