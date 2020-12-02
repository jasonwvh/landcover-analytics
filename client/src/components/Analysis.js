import React, { Component } from 'react'
import { Container, Paper, Typography, Divider } from '@material-ui/core'
import {
	LineChart,
	AreaChart,
	Line,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer
} from 'recharts'
import { blue, purple, green, amber } from '@material-ui/core/colors'

import Papa from 'papaparse'
import csvKS from '../data/kota_setar.csv'
import csvKT from '../data/kota_tinggi.csv'

/*
const data = [
	{ name: '1990', Water: 1000, BuiltUp: 5000, Vegetation: 8000, BareSoil: 6000},
	{ name: '1995', Water: 950, BuiltUp: 5500, Vegetation: 7450, BareSoil: 6100 },
	{ name: '2000', Water: 940, BuiltUp: 5900, Vegetation: 6960, BareSoil: 6200 },
	{ name: '2005', Water: 920, BuiltUp: 6500, Vegetation: 6380, BareSoil: 6400 },
	{ name: '2010', Water: 920, BuiltUp: 6600, Vegetation: 5980, BareSoil: 6500 },
	{ name: '2015', Water: 900, BuiltUp: 7000, Vegetation: 5500, BareSoil: 6600 },
	{ name: '2020', Water: 890, BuiltUp: 7800, Vegetation: 4510, BareSoil: 6800 }
]
*/
// CONSTANT labels for lulc
const labels = ['Water', 'Urban', 'Vegetation'];

class Analysis extends Component {
	constructor(props) {
		super(props);
		this.state = {
			kota_setar: [],
			kota_tinggi: [],
		};
		this.updateKS = this.updateKS.bind(this);
		this.updateKT = this.updateKT.bind(this);
	}

	// Update Kota Setar data
	updateKS(res) {
		const data = res.data;
		this.setState({ kota_setar: data })
	}

	// Update Kota Tinggi data
	updateKT(res) {
		const data = res.data;
		this.setState({ kota_tinggi: data })
	}

	// Get our data from csv files
	componentWillMount() {
		Papa.parse(csvKS, {
			download:true,
			header: true,
			complete: this.updateKS
		})

		Papa.parse(csvKT, {
			download:true,
			header: true,
			complete: this.updateKT
		})
	}

	render() {
		// define states
		const { kota_setar, kota_tinggi } = this.state;

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
							variant="body1"
							align="justify"
							style={{ paddingBottom: '20px' }}
							paragraph
						>
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
								<LineChart
									data={kota_setar}
									margin={{ top: 0, right: 20, left: 20, bottom: 20 }}
								>
									<XAxis label={{ value: 'Year', position:'bottom'}} dataKey="name" />
									<YAxis label={{ value: 'Area (km2)', angle: -90, position: 'left'}}/>
									<CartesianGrid strokeDasharray="3 3" />
									<Tooltip />
									<Legend verticalAlign="top" height={36}/>
									<Line
										type="monotone"
										dataKey={labels[0]}
										stroke={blue[500]}
										activeDot={{ r: 8 }}
									/>
									<Line type="monotone" dataKey={labels[1]} stroke={purple[500]} />
									<Line type="monotone" dataKey={labels[2]} stroke={green[500]} />
								</LineChart>
							</ResponsiveContainer>
						</div>
					</Container>
					{/* Another text body **TO CHANGE */}
					<Container maxWidth="md" paragraph>
						<Typography
							variant="body1"
							align="justify"
							style={{ paddingBottom: '20px' }}
							paragraph
						>
							Donec in justo nisl. Nulla facilisi. Fusce consectetur metus in sapien
							lobortis fermentum. Praesent et augue vitae nulla elementum rutrum.
							Integer rhoncus lectus eu nisi tempor, a rutrum orci varius. Vestibulum
							rutrum enim a fermentum fringilla. Pellentesque lacinia posuere dolor,
							eget ultrices sem auctor eget. Duis mauris enim, hendrerit sed
							ullamcorper quis, pretium et magna. Etiam tincidunt tincidunt turpis ac
							vulputate. Sed ut mauris enim. Pellentesque condimentum nulla in lacus
							laoreet, ac pretium nibh lobortis. Duis auctor velit ut pretium egestas.
							Vivamus commodo luctus facilisis. Pellentesque porttitor, leo quis
							consequat egestas, magna nibh vehicula est, quis semper risus arcu non
							purus.
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
									data={kota_tinggi}
									stackOffset="expand"
									margin={{ top: 0, right: 20, left: 20, bottom: 20 }}
								>
									<XAxis label={{ value: 'Year', position:'bottom'}} dataKey="name" />
									<YAxis label={{ value: 'Area (%)', angle: -90, position: 'left'}} tickFormatter={toPercent} />
									<CartesianGrid strokeDasharray="3 3" />
									<Tooltip />
									<Legend verticalAlign="top" height={36}/>
									<Area
										type="monotone"
										dataKey={labels[0]}
										stackId='1'
										stroke={blue[500]}
										fill={blue[400]}
										activeDot={{ r: 8 }}
									/>
									<Area type="monotone" dataKey={labels[1]} stackId='1' stroke={purple[500]} fill={purple[400]} />
									<Area type="monotone" dataKey={labels[2]} stackId='1' stroke={green[500]} fill={green[400]} />
								</AreaChart>
							</ResponsiveContainer>
						</div>
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
								EARTH NEEDS YOUR HELP
							</Typography>
							{/* Body */}
							<Typography
								variant="body1"
								align="justify"
								color="inherit"
								style={{ paddingBottom: '20px' }}
								paragraph
							>
								In rutrum tempor augue, tempus gravida risus ultrices sed. Proin quis
								aliquet lacus. Vestibulum ante ipsum primis in faucibus orci luctus et
								ultrices posuere cubilia Curae; Aenean fermentum tortor dapibus purus
								auctor blandit. Nam nec arcu a felis venenatis vehicula sit amet tempus
								sapien. Curabitur vestibulum magna sem, nec pellentesque enim dictum
								vitae. Morbi a dolor a sem semper dignissim.
							</Typography>
						</Container>
					</div>
				</Paper>
				<Divider />
			</React.Fragment>
		)
	}
}

export default Analysis
