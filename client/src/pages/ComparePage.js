import React, { Component } from "react";
import SidebarCompare from "../components/SidebarCompare";

import ReactCompareImage from "react-compare-image";

import "../App.css";

// need to activate ESLint if not showing images

class ComparePage extends Component {
    constructor(props) {
        super(props);

        // States for controlling images
        this.state = {
            location: "Kota Setar",
            combi: "Natural",
			year1: 2008,
			year2: 2018,
            img1: require("../data/Kota Setar/Natural/2018.png").default,
            img2: require("../data/Kota Setar/Natural/2020.png").default,
        };
        this._handleChangeYear = this._handleChangeYear.bind(this);
        this._handleChangeCombi = this._handleChangeCombi.bind(this);
        this._handleChangeLocation = this._handleChangeLocation.bind(this);
    }

    // change images when user selects from drop-down menu
    _handleChangeYear = async (field) => {
        await this.setState({
            [field.name]: field.value
		});
		await this._updateImage();
    };

    // change images when user selects from drop-down menu
    _handleChangeLocation = async (field) => {
        await this.setState({ location: field.value });
		await this._updateImage();
    };
    
    // change images when user selects from drop-down menu
    _handleChangeCombi = async (field) => {
        await this.setState({ combi: field.value });
        await this._updateImage();
    };
	
	async _updateImage() {
        const { location, combi, year1, year2 } = this.state;
		await this.setState({
			img1: require("../data/" + location + "/" + combi + "/" + year1 + ".png").default,
			img2: require("../data/" + location + "/" + combi + "/" + year2 + ".png").default,
        });
    }

    componentDidMount() {}

    // render our page
    render() {
        const { location, combi, year1, year2, img1, img2 } = this.state;

        return (
            <div className="top">
                <div className="intro">
                    {/* Sidebar with image selection */}
                    <SidebarCompare
                        location={location}
                        combi={combi}
						year1={year1}
                        year2={year2}
                        onChangeYear={this._handleChangeYear}
                        onChangeCombi={this._handleChangeCombi}
						onChangeLocation={this._handleChangeLocation}
                    />
                </div>
                <div className="map">
                    <div style={{ position: "relative" }}>
                        <div
                            style={{
                                //maxWidth: '702px',
                                //minWidth: '57.5px',
                                //maxWidth: '840px',
                                margin: "0 auto",
                            }}
                        >
                            {/* Main body */}
                            <div
                                style={{
                                    verticalAlign: "bottom",
                                }}
                            >
                                {/* Title */}
                                <h1
                                    style={{
                                        color: "white",
                                        textAlign: "center",
                                    }}
                                >
                                    {" "}
                                    Comparison of {location} between {year1} and{" "}
                                    {year2}{" "}
                                </h1>
                                {/* Component for comparing 2 images */}
                                <div>
                                    <ReactCompareImage
                                        leftImage={img1}
                                        leftImageLabel={year1}
                                        rightImage={img2}
                                        rightImageLabel={year2}
                                        aspectRatio="wider"
                                        leftImageCss={{
                                            objectFit: "contain",
                                            objectPosition: "top",
                                        }}
                                        rightImageCss={{
                                            objectFit: "contain",
                                            objectPosition: "top",
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ComparePage;
