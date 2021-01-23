import React, { Component } from 'react'
import { Typography, Container, Divider } from '@material-ui/core'

export default class About extends Component {
	render() {
		return (
			<React.Fragment>
				{/* Some info about the project */}
				<Container minWidth="xl" style={{paddingTop:'20px'}}>
					<Container maxWidth='md'>
						<Typography variant="h4" align='center' paragraph>Methodology</Typography>
						<Typography variant="body1" align='justify' paragraph>
						Satellite images are collected from the USGS' EarthExplorer website by selecting the image with the lowest cloud cover at a 2 years interval.
						</Typography>
						<Typography variant="body1" align='justify' paragraph>
                        The images are segmented into 'superpixels', which are a group of pixels that share similar characteristics. The segmented image is ran through a selected classification model to classify the image into distinct land use and land covers.
                        </Typography>
						<Typography variant="body1" align='justify' paragraph>
                        The classified images are vectorized and then displayed here
                        </Typography>
						<Typography variant="h4" align='center' paragraph>Creation</Typography>
						<Typography variant="body1" align='justify' paragraph>
						This project was created by Jason Wong Vun Hang for my Bachelor's Thesis under Prof. Dr. Lilly Suriani.
						</Typography>
					</Container>
				</Container>
				<Divider />
			</React.Fragment>
		)
	}
}
