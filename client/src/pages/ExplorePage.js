import React, { Component } from "react";
import "../App.css";

import mapboxgl from "mapbox-gl";
import MapGL, { Source, Layer } from "@urbica/react-map-gl";

import YearSlider from "../components/YearSlider";
import SidebarExplore from "../components/SidebarExplore";

const coords = {
    kota_setar: {
        latitude: 6.13,
        longitude: 100.33,
    },
    kota_tinggi: {
        latitude: 1.74,
        longitude: 103.88,
    },
};

// MapBox access token
const accessToken =
    "pk.eyJ1IjoiamFzb253dmgiLCJhIjoiY2s3cmF1dWVqMDJ5YzNsa3h6eHNwZ25zeiJ9.y913k9ZD3TOPLtSSD-IViw";

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
            },
            location: "",
            startYear: 2016,
            selectedYear: 2018,
            endYear: 2020,
            geoData: null,
            water: {
                isChecked: false,
                visibility: 0,
            },
            urban: {
                isChecked: true,
                visibility: 0.8,
            },
            vegetation: {
                isChecked: true,
                visibility: 0.8,
            },
        };
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    }

    // on moving viewport
    onViewportChange = (viewport) => this.setState({ viewport });

    // mount
    async componentWillMount() {
        // get location params
        const location = this.props.match.params.location;
        this.setState({ location });

        // get viewport
        const viewport = {
            latitude: coords[location].latitude,
            longitude: coords[location].longitude,
            zoom: this.state.viewport.zoom,
            bearing: this.state.viewport.bearing,
            pitch: this.state.viewport.pitch,
        };
        await this.setState({ viewport });

        // get initial data
        await this.getGeodata(location, this.state.selectedYear);
    }

    // handle year slider
    handleYearChange = (selectedYear) => {
        this.setState({ selectedYear });

        console.log(this.state.location, this.state.selectedYear);

        const geoData = this.getGeodata(this.state.location, selectedYear);
        this.setState({ geoData });
    };

    // handle visibility
    handleVisibilityChange = (layer) => {
        const vis = layer.checked === true ? 0.8 : 0;

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
        let data = await res.json();

        let geoData;
        console.log("data", data.data[0]);

        // map our data, retrieve features
        if (data.data[0] != null) {
            geoData = data.data.map((geo) => ({
                type: "FeatureCollection",
                features: geo.features,
            }));
            // get main element
            geoData = geoData[0];
        } else {
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
        this.setState({ geoData });
    }

    render() {
        // defining states
        const {
            viewport,
            startYear,
            selectedYear,
            endYear,
            location,
            geoData,
            water,
            urban,
            vegetation,
        } = this.state;

        const c_lat = coords[location].latitude;
        const c_lng = coords[location].longitude;

        var sw = new mapboxgl.LngLat(c_lng - 0.6, c_lat - 0.5);
        var ne = new mapboxgl.LngLat(c_lng + 0.6, c_lat + 0.5);
        var llb = new mapboxgl.LngLatBounds(sw, ne);

        return (
            <div className="top">
                <div className="intro">
                    <SidebarExplore
                        startYear={startYear}
                        selectedYear={selectedYear}
                        endYear={endYear}
                        onYearChange={this.handleYearChange}
                        onVisibilityChange={this.handleVisibilityChange}
                        isWaterChecked={water.isChecked}
                        isUrbanChecked={urban.isChecked}
                        isVegetationChecked={vegetation.isChecked}
                    />
                </div>
                <div className="map">
                    <div style={{ height: "100%", position: "relative" }}>
                        {/* mapping library */}
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
                            {/* retrieve source from data */}
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
                                        "blue",
                                        2,
                                        "green",
                                        3,
                                        "purple",
                                        "#000",
                                    ],
                                    "fill-opacity": [
                                        "match",
                                        ["get", "label"],
                                        1,
                                        this.state.water.visibility,
                                        2,
                                        this.state.vegetation.visibility,
                                        3,
                                        this.state.urban.visibility,
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
