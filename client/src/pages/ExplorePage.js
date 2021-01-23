import React, { Component } from "react";
import "../App.css";

import mapboxgl from "mapbox-gl";
import MapGL, { Source, Layer } from "@urbica/react-map-gl";

import YearSlider from "../components/YearSlider";
import SidebarExplore from "../components/SidebarExplore";

import { lightBlue, deepOrange, lightGreen, amber, grey } from '@material-ui/core/colors'

/* CONSTANTS */
const coords = {
    kota_setar: {
        latitude: 6.13,
        longitude: 100.33,
    },
    kota_kinabalu: {
        latitude: 6.03,
        longitude: 116.28,
    },
};                      // coordinates of the locations
const startYear = 2008; // start of slider
const endYear = 2020;   // end of slider
const accessToken = "pk.eyJ1IjoiamFzb253dmgiLCJhIjoiY2s3cmF1dWVqMDJ5YzNsa3h6eHNwZ25zeiJ9.y913k9ZD3TOPLtSSD-IViw"; // mapbox access token

class ExplorePage extends Component {
    // constructor and defining states
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                latitude: 0,
                longitude: 0,
                zoom: 11,
                bearing: 0,
                pitch: 0,
            }, // viewport state for interaction
            location: "", // location to pan to
            selectedYear: 2018, // current point of slider
            geoData: null, // data of our land covers
            water: {
                isChecked: false,
                visibility: 0,
            }, // for controlling checkboxes and visibility of layer
            urban: {
                isChecked: true,
                visibility: 0.8,
            }, // for controlling checkboxes and visibility of layer
            agriculture: {
                isChecked: true,
                visibility: 0.8,
            }, // for controlling checkboxes and visibility of layer
            forest: {
                isChecked: true,
                visibility: 0.8,
            }, // for controlling checkboxes and visibility of layer
            cloud: {
                isChecked: true,
                visibility: 0.8,
            }, // for controlling checkboxes and visibility of layer
        };
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    }

    // on moving viewport
    onViewportChange = (viewport) => this.setState({ viewport });

    // mount
    async componentWillMount() {
        // get and set location params from url
        const location = this.props.match.params.location;
        this.setState({ location });

        // get and set location coords
        const viewport = {
            latitude: coords[location].latitude,
            longitude: coords[location].longitude,
            zoom: this.state.viewport.zoom,
            bearing: this.state.viewport.bearing,
            pitch: this.state.viewport.pitch,
        };
        await this.setState({ viewport });

        // get and set initial data
        await this.getGeodata(location, this.state.selectedYear);
    }

    // handle year slider
    handleYearChange = async (selectedYear) => {
        await this.setState({ selectedYear });

        // get and set our geospatial data
        const geoData = await this.getGeodata(this.state.location, selectedYear);
        await this.setState({ geoData });
    };

    // handle visibility
    handleVisibilityChange = (layer) => {
        // if checked, set visibility alpha to 0.8, else 0
        const vis = layer.checked === true ? 0.8 : 0;

        // water, urban, or vegetation layer
        this.setState({
            [layer.name]: {
                isChecked: layer.checked,
                visibility: vis,
            },
        });
    };

    // function to get data from api
    async getGeodata(location, selectedYear) {
        // append parameters to api
        let res = await fetch(
            "http://localhost:5000/api/" + location + "/" + selectedYear
        );
        // format to json
        let data = await res.json();

        // define geoData
        let geoData;

        // if not undefined
        if (data.data[0] != null) {
            // map our data, retrieve features
            geoData = data.data.map((geo) => ({
                type: "FeatureCollection",
                features: geo.features,
            }));
            // get main element
            geoData = geoData[0];
        } else {
            // else default blank state
            geoData = {
                type: "Feature",
                geometry: {
                    type: "Polygon",
                    coordinates: [
                        [0, 0],
                        [1, 1],
                        [2, 2],
                    ],
                },
            };
        }

        // update state
        await this.setState({ geoData });
    }

    render() {
        // defining states
        const {
            viewport,
            selectedYear,
            location,
            geoData,
            water,
            urban,
            agriculture,
            forest,
            cloud,
        } = this.state;

        // define our max bounds
        const c_lat = coords[location].latitude;
        const c_lng = coords[location].longitude;
        var sw = new mapboxgl.LngLat(c_lng - 0.6, c_lat - 0.5);
        var ne = new mapboxgl.LngLat(c_lng + 0.6, c_lat + 0.5);
        var llb = new mapboxgl.LngLatBounds(sw, ne);

        return (
            <div className="top">
                <div className="intro">
                    {/* Sidebar with layer visibility checkboxes */}
                    <SidebarExplore
                        onVisibilityChange={this.handleVisibilityChange}
                        isWaterChecked={water.isChecked}
                        isUrbanChecked={urban.isChecked}
                        isAgricultureChecked={agriculture.isChecked}
                        isForestChecked={forest.isChecked}
                        isCloudChecked={cloud.isChecked}
                    />
                </div>
                <div className="map">
                    {/* mapping library */}
                    <div style={{ height: "100%", position: "relative" }}>
                        <MapGL
                            style={{ height: "100vh", width: "100%" }}
                            mapStyle="mapbox://styles/mapbox/dark-v9"
                            accessToken={accessToken}
                            onViewportChange={this.onViewportChange}
                            maxBounds={llb}
                            maxZoom={13}
                            minZoom={10}
                            {...viewport}
                        >
                            {/* retrieve source from geoData */}
                            <Source
                                id="geoData"
                                type="geojson"
                                data={geoData}
                            ></Source>

                            {/* layer with data-driven properties, paint color and visibility based on landcover (label) */}
                            <Layer
                                id="geoData"
                                type="fill"
                                source="geoData"
                                paint={{
                                    "fill-color": [
                                        "match",
                                        ["get", "label"],
                                        1,
                                        lightBlue[500],
                                        2,
                                        deepOrange[500],
                                        3,
                                        amber[500],
                                        4,
                                        lightGreen[500],
                                        5,
                                        lightBlue[50],
                                        grey[900],
                                    ],
                                    "fill-opacity": [
                                        "match",
                                        ["get", "label"],
                                        1,
                                        this.state.water.visibility,
                                        2,
                                        this.state.urban.visibility,
                                        3,
                                        this.state.agriculture.visibility,
                                        4,
                                        this.state.forest.visibility,
                                        5,
                                        this.state.cloud.visibility,
                                        0,
                                    ],
                                }}
                            />
                        </MapGL>
                        {/* slider for changing year */}
                        <YearSlider
                            startYear={startYear}
                            selectedYear={selectedYear}
                            endYear={endYear}
                            onYearChange={this.handleYearChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default ExplorePage;
