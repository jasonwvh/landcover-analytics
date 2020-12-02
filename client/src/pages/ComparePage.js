import React, { Component } from 'react'
import SidebarCompare from '../components/SidebarCompare'

import ReactCompareImage from 'react-compare-image'

import '../App.css'

// need to activate ESLint if not showing images

class ComparePage extends Component {
	constructor(props) {
		super(props)

		// States for controlling images
		this.state = {
			img1: {
				label: '2013',
				src: require('../data/2013.PNG').default
			},
			img2: {
				label: '2016',
				src: require('../data/2016.PNG').default
			}
		}
		this._handleChangeField = this._handleChangeField.bind(this)
	}

	// change images when user selects from drop-down menu
	_handleChangeField = field => {
		this.setState({
			[field.name]: {
				label: field.value,
				src: require('../data/' + field.value + '.PNG').default
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
							<ReactCompareImage
								leftImage={img1.src}
								leftImageLabel={img1.label}
								rightImage={img2.src}
								rightImageLabel={img2.label}
								aspectRatio="wider"
								leftImageCss={{ objectFit: 'contain', objectPosition: 'top' }}
								rightImageCss={{ objectFit: 'contain', objectPosition: 'top' }}
							/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default ComparePage
