import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Link } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'


const useStyles = makeStyles(theme => ({
	root: {
		padding: '12px',
		margin: '0 auto'
	},
	margin: {
		height: theme.spacing(3)
	},
	contentMargin: {
		height: theme.spacing(9)
	},
	links: {
		'& > * + *': {
			marginLeft: theme.spacing(2)
		},
		color: blue[500]
	},
}))

const SidebarHome = props => {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<Typography variant="h3">LAND USE VISUALIZATION</Typography>
			<div className={classes.margin} />
			<Typography className={classes.links}>
				<Link href="/" color="inherit" variant='h5' underline="always">
					Home
				</Link>
				<Link href="/compare" color="inherit">
					Compare
				</Link>
			</Typography>
			<div className={classes.contentMargin} />
			<Typography variant="body1">Select an area to explore</Typography>
			<div className={classes.margin} />
			<Typography variant="body1">or</Typography>
			<div className={classes.margin} />
			<Typography variant="body1">Compare between two years</Typography>
		</div>
	)
}

export default SidebarHome