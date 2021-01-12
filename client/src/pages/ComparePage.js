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
			location: "Kota_Setar",
			year1: 2018,
			year2: 2020,
            img1: require("../data/Kota_Setar_2018.PNG").default,
            img2: require("../data/Kota_Setar_2020.PNG").default,
        };
        this._handleChangeYear = this._handleChangeYear.bind(this);
    }

    // change images when user selects from drop-down menu
    _handleChangeYear = (field) => {
        this.setState({
            [field.name]: field.value
		});
		this._updateImage();
    };

    // change images when user selects from drop-down menu
    _handleChangeLocation = (field) => {
        this.setState({ location: field.value },
		);
		this._updateImage();
	};
	
	_updateImage() {
		const location = this.state.location;
		const year1 = this.state.year1;
		const year2 = this.state.year2;
		this.setState({
			img1: require("../data/" + location + "_" + year1 + ".PNG").default,
			img2: require("../data/" + location + "_" + year2 + ".PNG").default,
		}) 
	}

    componentDidMount() {}

    // render our page
    render() {
        const { location, year1, year2, img1, img2 } = this.state;

        return (
            <div className="top">
                <div className="intro">
                    {/* Sidebar with image selection */}
                    <SidebarCompare
						location={location}
						year1={year1}
                        year2={year2}
						onChangeYear={this._handleChangeYear}
						onChangeLocation={this._handleChangeLocation}
                    />
                </div>
                <div className="map">
                    <div style={{ height: "100%", position: "relative" }}>
                        <div
                            style={{
                                //maxWidth: '702px',
                                height: "100vh",
                                width: "100%",
                                //minWidth: '57.5px',
                                //maxWidth: '840px',
                                margin: "0 auto",
                            }}
                        >
                            {/* Main body */}
                            <div
                                style={{
                                    verticalAlign: "bottom",
                                    height: "100vh",
                                    width: "100%",
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
