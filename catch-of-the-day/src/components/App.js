import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes.js';

class App extends React.Component {
  constructor() {
    super();

    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);

    this.state = {
      fishes: {},
      order: {}
    };
  }

  addFish(fish) {
    const fishes = {...this.state.fishes};
    const timestamp = Date.now();

    fishes[`fish-${timestamp}`] = fish;
    this.setState({ fishes });
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    });
  }

  render() {
    const fishKeys = Object.keys(this.state.fishes);

    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {
              fishKeys.length ?
                fishKeys.map((fish) => {
                  return <Fish key={fish} details={this.state.fishes[fish]} />;
                })
              :
                <p>No fIsh</p>
            }
          </ul>
        </div>
        <Order />
        <Inventory loadSamples={this.loadSamples} addFish={this.addFish} />
      </div>
    )
  }
}

export default App;