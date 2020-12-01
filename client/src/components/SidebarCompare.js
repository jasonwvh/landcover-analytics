import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Link, TextField, MenuItem } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'

const years = [
	{
		value: '2013'
	},
	{
		value: '2016'
	},
	{
		value: '2019'
	}
]

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
	menu: {
		minWidth: '24vw',
		margin: '6 auto'
	},
	label: {
		fontSize: '16px',
		color: blue[500]
	},

	outlinedInput: {
		color: '#fff',
		'&$focused $notchedOutline': {
			borderColor: '#fff'
		}
	},

	focused: {},
	notchedOutline: {
		borderWidth: '1px',
		borderColor: blue[500]
	},

	links: {
		'& > * + *': {
			marginLeft: theme.spacing(2)
		},
		color: blue[500]
	}
}))

const SidebarCompare = props => {
	const classes = useStyles()

	const { img1, img2, onChangeField } = props

	function _onChangeField(event, value) {
		onChangeField(event.target)
	}

	return (
		<div className={classes.root}>
			<Typography variant="h3">LAND USE VISUALIZATION</Typography>
			<div className={classes.margin} />
			<Typography className={classes.links}>
				<Link href="/" color="inherit">
					Home
				</Link>
				<Link href="/compare" color="inherit" variant="h5" underline="always">
					Compare
				</Link>
			</Typography>
			<div className={classes.contentMargin} />
			<div className={classes.menu}>
				<form noValidate autoComplete="off">
					<TextField
						select
						name="img1"
						variant="outlined"
						label="First image"
						value={img1.label}
						onChange={_onChangeField}
						InputLabelProps={{
							classes: {
								root: classes.label,
								focused: classes.focused
							}
						}}
						InputProps={{
							classes: {
								root: classes.outlinedInput,
								focused: classes.focused,
								notchedOutline: classes.notchedOutline
							}
						}}
					>
						{years.map(option => (
							<MenuItem key={option.value} value={option.value}>
								{option.value}
							</MenuItem>
						))}
					</TextField>
					<div className={classes.margin} />
					<TextField
						select
						name="img2"
						variant="outlined"
						label="Second image"
						value={img2.label}
						onChange={_onChangeField}
						InputLabelProps={{
							classes: {
								root: classes.label,
								focused: classes.focused
							}
						}}
						InputProps={{
							classes: {
								root: classes.outlinedInput,
								focused: classes.focused,
								notchedOutline: classes.notchedOutline
							}
						}}
					>
						{years.map(option => (
							<MenuItem key={option.value} value={option.value}>
								{option.value}
							</MenuItem>
						))}
					</TextField>
				</form>
			</div>
		</div>
	)
}

export default SidebarCompare
