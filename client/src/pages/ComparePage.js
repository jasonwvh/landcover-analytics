import React, { Component } from 'react'
import SidebarCompare from '../components/SidebarCompare'

import ReactCompareImage from 'react-compare-image'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

import '../App.css'

class ComparePage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			img1: {
				label: '2013',
				src: '../data/2013.PNG'
			},
			img2: {
				label: '2016',
				src: '../data/2016.PNG'
			}
		}
		this._handleChangeField = this._handleChangeField.bind(this)
	}

	_handleChangeField = field => {
		console.log(field)
		this.setState({
			[field.name]: {
				label: field.value,
				src: '../data/' + field.value + '.PNG'
			}
		})
	}

	componentDidMount() {}

	render() {

		const {
			img1,
			img2
		} = this.state

		return (
			<div className="top">
				<div className="intro">
					<SidebarCompare 
					img1={img1}
					img2={img2}
					onChangeField={this._handleChangeField}
					/>
				</div>
				<div className="map">
					<div style={{ height: '100%', position: 'relative' }}>
						<div
							style={{
								//maxWidth: '702px',
								minWidth: '57.5px',
								maxWidth: '840px',
								margin: '0 auto'
							}}
						>
							<ReactCompareSlider
								itemOne={<ReactCompareSliderImage src="../data/2013.PNG" alt="Image one" />}
                                itemTwo={<ReactCompareSliderImage src="../data/2016.PNG" alt="Image two" />}
							/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default ComparePage
