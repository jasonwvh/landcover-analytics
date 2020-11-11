import React, { Component } from 'react'
import './App.css';

import MapGL, { Source, Layer } from '@urbica/react-map-gl'

const accessToken = 'pk.eyJ1IjoiamFzb253dmgiLCJhIjoiY2s3cmF1dWVqMDJ5YzNsa3h6eHNwZ25zeiJ9.y913k9ZD3TOPLtSSD-IViw'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      viewport: {
				latitude: 6.13,
				longitude: 100.33,
				zoom: 10,
				bearing: 0,
				pitch: 0
      },
      year: 2020,
      water_visibility: 0.8,
      geoData: null,
    }
  }
  _onViewportChange = viewport => this.setState({ viewport })

  componentDidMount() {
    this.getGeodata(2020);
  }

  handleYearChange = event => {
    this.setState({ year: event.target.value })

    let geoData = this.getGeodata(event.target.value)
    this.setState({geoData})

    console.log(event.target.value)
  }

  handleWaterVisibility = event => {
    if (this.state.water_visibility > 0.5) this.setState({water_visibility: 0})
    if (this.state.water_visibility < 0.5) this.setState({water_visibility: 0.8})
  }
  
  async getGeodata(year) {
    const res = await fetch('http://localhost:5000/api/' + year);
    const data = await res.json();
    console.log("data", data.data);

    let geoData = data.data.map(geo => ({
        type: 'FeatureCollection',
        features: geo.features
      }
    ));

    geoData = geoData[0];

    console.log("geo", geoData);
    this.setState({ geoData })
  };


  render() {
    const {viewport, year, geoData} = this.state;

    return (
      <div className="App">
          <MapGL
							style={{ height: '50vh', width: '50%' }}
							mapStyle="mapbox://styles/mapbox/dark-v9"
							accessToken={accessToken}
							onViewportChange={this._onViewportChange}
							{...viewport}
						>
            <Source id="data" type="geojson" data={geoData}></Source>
            <Layer
								id="data"
								type="fill"
                source="data"
								paint={{
                  'fill-color': [
                    'match',
                    ['get', 'label'],
                    1,
                    'blue',
                    2,
                    'green',
                    3,
                    'purple',
                    '#000'
                  ],
                  'fill-opacity': [
                    'match',
                    ['get', 'label'],
                    1,
                    this.state.water_visibility,
                    2,
                    0.5,
                    3,
                    0.8,
                    0
                  ]
                }
            }
							/>
            </MapGL>
        <input id="slider" type="range" min="2016" max="2020" value={year} onChange={this.handleYearChange} step="2"></input>
        <button onClick={this.handleWaterVisibility}>on/off water</button>
      </div>
    );
  }
}

export default App;
