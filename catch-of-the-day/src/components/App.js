import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes.js';
import base from '../base';

class App extends React.Component {
  constructor() {
    super();

    this.addFish     = this.addFish.bind(this);
    this.updateFish  = this.updateFish.bind(this);
    this.removeFish  = this.removeFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder  = this.addToOrder.bind(this);

    this.state = {
      fishes: {},
      order: {}
    };
  }

  componentWillMount() {
    // This run right before the app renders
    let { storeId } = this.props.params;

    this.ref = base.syncState(`${storeId}/fishes`
      , {
      context: this,
      state: 'fishes'
    });

    // Check if there is a order in localStorage
    const localStorageRef = localStorage.getItem(`order-${storeId}`);

    if (localStorageRef) {
      // Update the App component's order state
      const jsonOrder = JSON.parse(localStorageRef);

      this.setState({
        order: jsonOrder
      })
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    const { storeId } = this.props.params;
    const stringOrder = JSON.stringify(nextState.order);

    localStorage.setItem(`order-${storeId}`, stringOrder);
  }

  addFish(fish) {
    const fishes = {...this.state.fishes};
    const timestamp = Date.now();

    fishes[`fish-${timestamp}`] = fish;
    this.setState({ fishes });
  }

  updateFish(key, updatedFish) {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({ fishes });
  }

  removeFish(key) {
    const fishes = {...this.state.fishes};
    // Have to set to null for firebase
    fishes[key] = null;
    this.setState({ fishes });
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    });
  }

  addToOrder(key) {
    // copy state
    const order = {...this.state.order};
    // update or add the new number of fish ordered
    order[key] = (order[key] + 1) || 1;
    // update state
    this.setState({ order });
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
                  return (
                    <Fish
                      key={fish}
                      index={fish}
                      details={this.state.fishes[fish]}
                      addToOrder={this.addToOrder} />
                  )
                })
              :
                <p>No fIsh</p>
            }
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          params={this.props.params} />
        <Inventory
          loadSamples={this.loadSamples}
          addFish={this.addFish}
          updateFish={this.updateFish}
          removeFish={this.removeFish}
          fishes={this.state.fishes} />
      </div>
    )
  }
}

export default App;