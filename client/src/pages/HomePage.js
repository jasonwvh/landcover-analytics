import React, { Component } from "react";
import "../App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { Link } from '@material-ui/core'
import MapGL, { Marker } from "@urbica/react-map-gl";
import mapboxgl from "mapbox-gl";
import SidebarHome from "../components/SidebarHome";

// MapBox access token
const accessToken =
    "pk.eyJ1IjoiamFzb253dmgiLCJhIjoiY2s3cmF1dWVqMDJ5YzNsa3h6eHNwZ25zeiJ9.y913k9ZD3TOPLtSSD-IViw";

class HomePage extends Component {
    // constructor and defining states
    constructor(props) {
        super(props);

        this.state = {
            viewport: {
                latitude: 4,
                longitude: 100,
                zoom: 6,
                bearing: 0,
                pitch: 0,
            },
        };
    }

    // on moving viewport
    _onViewportChange = (viewport) => this.setState({ viewport });

    // Mount
    componentDidMount() {}

    render() {
        // defining states
        const { viewport } = this.state;

        // mapbox restraints
        var sw = new mapboxgl.LngLat(98, 0);
        var ne = new mapboxgl.LngLat(122, 10);
        var llb = new mapboxgl.LngLatBounds(sw, ne);

        return (
            <div className="top">
                <div className="intro">
                    <SidebarHome />
                </div>
                <div className="map">
                    <div style={{ height: "100%", position: "relative" }}>
                        {/* mapping library */}
                        <MapGL
                            style={{ height: "100vh", width: "100%" }}
                            mapStyle="mapbox://styles/mapbox/light-v9"
                            accessToken={accessToken}
                            onViewportChange={this._onViewportChange}
                            maxBounds={llb}
                            maxZoom={10}
                            minZoom={2}
                            {...viewport}
                        >
                            {/* Marker kota setar */}
                            <Marker
                                latitude={6.13}
                                longitude={100.35}
                                onClick={this.onMarkerClick}
                            >
                                <Link href="/explore/kota_setar"><div style={{padding: '10px', color: '#fff', cursor: 'pointer', background: '#1978c8', borderRadius: '6px'}}>Kota Setar</div></Link>
                            </Marker>
                            {/* Marker kota tinggi */}
                            <Marker
                                latitude={1.74}
                                longitude={103.87}
                                onClick={this.onMarkerClick}
                            >
                            
                                <Link href="/explore/kota_tinggi"><div style={{padding: '10px', color: '#fff', cursor: 'pointer', background: '#1978c8', borderRadius: '6px'}}>Kota Tinggi</div></Link>
                                
                            </Marker>
                        </MapGL>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;
