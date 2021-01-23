import React, { Component } from 'react'
import { Container, Paper, Typography, Divider } from '@material-ui/core'
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer
} from 'recharts'
import { lightBlue, deepOrange, lightGreen, amber, grey } from '@material-ui/core/colors'

import Papa from 'papaparse'
import csvKS from '../data/kota_setar.csv'
import csvKK from '../data/kota_kinabalu.csv'

// constant labels for lulc
const labels = ['Water', 'Urban', 'Agriculture', 'Forest', 'Others'];

class Analysis extends Component {
	constructor(props) {
		super(props);
		this.state = {
			kota_setar: [],
			kota_kinabalu: [],
		};
		this.updateKS = this.updateKS.bind(this);
		this.updateKT = this.updateKT.bind(this);
	}

	// Update Kota Setar data
	updateKS(res) {
		const data = res.data;
		this.setState({ kota_setar: data })
	}

	// Update Kota Kinabalu data
	updateKT(res) {
		const data = res.data;
		this.setState({ kota_kinabalu: data })
	}

	// Get our data from csv files
	componentWillMount() {
		Papa.parse(csvKS, {
			download:true,
			header: true,
			complete: this.updateKS
		})

		Papa.parse(csvKK, {
			download:true,
			header: true,
			complete: this.updateKT
		})
	}

	render() {
		// define states
		const { kota_setar, kota_kinabalu } = this.state;

		// convert to percent
		const toPercent = (decimal, fixed = 0) => `${(decimal*100).toFixed(fixed)}%`;
		  
		return (
			<React.Fragment>
				<Container width="100vw">
					{/* Title */}
					<Typography variant="h3" align="center" paragraph>
						Analysis
					</Typography>
					<Container maxWidth="md" paragraph>
						{/* Text body **TO CHANGE */}
						<Typography
							variant="h4"
							align="center"
							style={{ paddingBottom: '20px' }}
							paragraph
						>
							Kota Setar
						</Typography>

						<div
							style={{
								maxWidth: '720px',
								minWidth: '320px',
								height: '360px',
								margin: '0 auto',
								paddingBottom: '20px',
							}}
						>
							{/* Chart */}
							<ResponsiveContainer>
								<AreaChart
									data={kota_setar}
									stackOffset="expand"
									margin={{ top: 0, right: 20, left: 20, bottom: 20 }}
								>
									<XAxis label={{ value: 'Year', position:'bottom'}} dataKey="Year" />
									<YAxis label={{ value: 'Area (%)', angle: -90, position: 'left'}} tickFormatter={toPercent} />
									<CartesianGrid strokeDasharray="3 3" />
									<Tooltip />
									<Legend verticalAlign="top" height={36}/>
									<Area
										type="monotone" dataKey={labels[0]} stackId='1' stroke={lightBlue[500]} fill={lightBlue[400]} />
									<Area type="monotone" dataKey={labels[1]} stackId='1' stroke={deepOrange[500]} fill={deepOrange[400]} />
									<Area type="monotone" dataKey={labels[2]} stackId='1' stroke={amber[500]} fill={amber[400]} />
									<Area type="monotone" dataKey={labels[3]} stackId='1' stroke={lightGreen[500]} fill={lightGreen[400]} />
									<Area type="monotone" dataKey={labels[4]} stackId='1' stroke={grey[500]} fill={grey[400]} />
								</AreaChart>
							</ResponsiveContainer>
						</div>
						<Typography
							variant="body1"
							align="justify"
							style={{ paddingBottom: '20px' }}
							paragraph
						>
							From 2010 to 2020, urban area in Kota Setar has increased by 1.43% while Forest area has decreased by 9.22%
							Water bodies area increased by 32.26% and Agriculture areas decreased by 9.83%
						
						</Typography>
					</Container>
					{/* Another text body **TO CHANGE */}
					<Container maxWidth="md" paragraph>
						<Typography
							variant="h4"
							align="center"
							style={{ paddingBottom: '20px' }}
							paragraph
						>
							Kota Kinabalu
						</Typography>
						<div
							style={{
								maxWidth: '720px',
								minWidth: '320px',
								height: '360px',
								margin: '0 auto',
								paddingBottom: '20px',
							}}
						>
							{/* Another chart */}
							<ResponsiveContainer>
								<AreaChart
									data={kota_kinabalu}
									stackOffset="expand"
									margin={{ top: 0, right: 20, left: 20, bottom: 20 }}
								>
									<XAxis label={{ value: 'Year', position:'bottom'}} dataKey="Year" />
									<YAxis label={{ value: 'Area (%)', angle: -90, position: 'left'}} tickFormatter={toPercent} />
									<CartesianGrid strokeDasharray="3 3" />
									<Tooltip />
									<Legend verticalAlign="top" height={36}/>
									<Area type="monotone" dataKey={labels[0]} stackId='1' stroke={lightBlue[500]} fill={lightBlue[400]} />
									<Area type="monotone" dataKey={labels[1]} stackId='1' stroke={deepOrange[500]} fill={deepOrange[400]} />
									<Area type="monotone" dataKey={labels[2]} stackId='1' stroke={amber[500]} fill={amber[400]} />
									<Area type="monotone" dataKey={labels[3]} stackId='1' stroke={lightGreen[500]} fill={lightGreen[400]} />
									<Area type="monotone" dataKey={labels[4]} stackId='1' stroke={grey[500]} fill={grey[400]} />
								</AreaChart>
							</ResponsiveContainer>
						</div>
						<Typography
							variant="body1"
							align="justify"
							style={{ paddingBottom: '20px' }}
							paragraph
						>
						From 2010 to 2020, urban area in Kota Kinabalu has increased by 23.06% while Forest area has decreased by 3.55%
						Water bodies area decreased by 26.72% and Agriculture areas increased by 28.03%

						</Typography>
					</Container>
				</Container>
				<Divider />
				{/* Cool background thing */}
				<Paper
					disableGutters
					style={{
						position: 'relative',
						height: '100vh',
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						backgroundImage: 'url(https://source.unsplash.com/collection/894/)'
					}}
				>
					<div
						style={{
							margin: '0 auto',
							minWidth: '80vw',
							maxWidth: '480px',
							height: '100%',
							color: '#fff',
							backgroundColor: 'rgba(0,0,0,0.80)'
						}}
					>
						{/* Yet another text body */}
						<Container maxWidth="md" style={{ paddingBottom: '20px' }} paragraph>
							{/* Title */}
							<Typography
								variant="h2"
								align="center"
								color="inherit"
								style={{ paddingTop: '30px', paddingBottom: '20px' }}
								paragraph
							>
								EARTH NEEDS OUR HELP
							</Typography>
							{/* Body */}
							<Typography
								variant="body1"
								align="justify"
								color="inherit"
								style={{ paddingBottom: '20px' }}
								paragraph
							>
								Deforestation has a huge impact in the livelihood of millions of people. Some 13.2 million people across the world have a job in the forest sector and another 41 million have a job that is related to the sector. Many animals also rely on forests. Eighty percent of the world's land-based species, such as elephants and rhinos, live in forests. Forests also play a critical role in mitigating climate change because they act as a carbon sink—soaking up carbon dioxide that would otherwise be free in the atmosphere and contribute to ongoing changes in climate patterns. 
							</Typography>
							<Typography
								variant="body1"
								align="justify"
								color="inherit"
								style={{ paddingBottom: '20px' }}
								paragraph
							>
								But forests around the world are under threat, jeopardizing these benefits. The threats manifest themselves in the form of deforestation and forest degradation. The main cause of deforestation is agriculture (poorly planned infrastructure is emerging as a big threat too) and the main cause of forest degradation is illegal logging. In 2019, the tropics lost close to 30 soccer fields' worth of trees every single minute.
							</Typography>
							<Typography
								variant="body1"
								align="justify"
								color="inherit"
								style={{ paddingBottom: '20px' }}
								paragraph
							>
								Deforestation is a particular concern in tropical rain forests because these forests are home to much of the world’s biodiversity. For example, in the Amazon around 17% of the forest has been lost in the last 50 years, mostly due to forest conversion for cattle ranching. Deforestation in this region is particularly rampant near more populated areas, roads and rivers, but even remote areas have been encroached upon when valuable mahogany, gold, and oil are discovered.
							</Typography>
							<Typography
								variant="body1"
								align="justify"
								color="inherit"
								style={{ paddingBottom: '20px' }}
								paragraph
							>
								[Source: worldwildlife.org]
							</Typography>
						</Container>
					</div>
				</Paper>
				<Divider />
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

export default Analysis
