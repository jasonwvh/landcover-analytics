import React, { Component } from 'react'
import { Typography, Container, Divider } from '@material-ui/core'

export default class About extends Component {
	render() {
		return (
			<React.Fragment>
				{/* Some info about the project */}
				<Container minWidth="xl" style={{paddingTop:'20px'}}>
					<Container maxWidth='md'>
						<Typography variant="h3" align='center' paragraph>About the Data</Typography>
						<Typography variant="h4" align='center' paragraph>Methodology</Typography>
						<Typography variant="body1" align='justify' paragraph>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et felis
							et justo elementum consectetur a sit amet lorem. Sed vel pulvinar erat,
							sed consequat mi. Sed quam magna, faucibus tincidunt cursus et,
							consectetur ac ligula. Maecenas congue placerat enim, sed consequat
							ligula gravida a. Praesent sollicitudin nisi aliquam sem elementum
							euismod. Nullam semper velit et elit sodales gravida. Mauris sed rutrum
							leo. Nulla facilisi. Maecenas volutpat finibus massa, interdum rhoncus
							sapien hendrerit at. Sed et ipsum eu augue viverra auctor. Quisque congue
							hendrerit orci, vitae feugiat nunc convallis eget. Pellentesque a odio
							nisl. In arcu erat, scelerisque tempus maximus vel, tristique ut risus.
							Pellentesque rhoncus enim sed magna venenatis, at blandit risus lacinia.
							Etiam eu urna nisl. Pellentesque felis arcu, tempus quis tortor ut,
							porttitor maximus lorem. 
						</Typography>
						<Typography variant="body1" align='justify' paragraph>
                        Donec in justo nisl. Nulla facilisi. Fusce
							consectetur metus in sapien lobortis fermentum. Praesent et augue vitae
							nulla elementum rutrum. Integer rhoncus lectus eu nisi tempor, a rutrum
							orci varius. Vestibulum rutrum enim a fermentum fringilla. Pellentesque
							lacinia posuere dolor, eget ultrices sem auctor eget. Duis mauris enim,
							hendrerit sed ullamcorper quis, pretium et magna. Etiam tincidunt
							tincidunt turpis ac vulputate. Sed ut mauris enim. Pellentesque
							condimentum nulla in lacus laoreet, ac pretium nibh lobortis. Duis auctor
							velit ut pretium egestas. Vivamus commodo luctus facilisis. Pellentesque
							porttitor, leo quis consequat egestas, magna nibh vehicula est, quis
							semper risus arcu non purus. 
                        </Typography>
						<Typography variant="body1" align='justify' paragraph>
                        In rutrum tempor augue, tempus gravida risus
							ultrices sed. Proin quis aliquet lacus. Vestibulum ante ipsum primis in
							faucibus orci luctus et ultrices posuere cubilia Curae; Aenean fermentum
							tortor dapibus purus auctor blandit. Nam nec arcu a felis venenatis
							vehicula sit amet tempus sapien. Curabitur vestibulum magna sem, nec
							pellentesque enim dictum vitae. Morbi a dolor a sem semper dignissim.
                        </Typography>
						<Typography variant="h3" align='center' paragraph>Creation</Typography>
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
