import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
	Typography,
	FormGroup,
	FormControlLabel,
	Checkbox,
	Link
} from '@material-ui/core'
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
	checkbox: {
		color: blue[500],
		'&$checked': {
			color: blue[500]
		}
	},
	checked: {},
	container: {
		maxWidth: '35%',
		margin: '0 auto'
	},
	links: {
		'& > * + *': {
			marginLeft: theme.spacing(2)
		},
		color: blue[500]
	},
}))

const SidebarExplore = props => {
	const classes = useStyles()

	const {
		isWaterChecked,
		isUrbanChecked,
		isVegetationChecked,
		onVisibilityChange
	} = props

	function _onVisibilityChange(event, value) {
		onVisibilityChange(event.target)
	}

	return (
		<div className={classes.root}>
			<Typography variant="h3">LAND USE VISUALIZATION</Typography>
			<div className={classes.margin} />
			<Typography className={classes.links}>
				<Link href="/" color="inherit">
					Back
				</Link>
			</Typography>
			<div className={classes.contentMargin} />
			<div className={classes.container}>
				<FormGroup column>
					<FormControlLabel
						control={
							<Checkbox
								checked={isWaterChecked}
								onChange={_onVisibilityChange}
								name="water"
								classes={{ root: classes.checkbox, checked: classes.checked }}
								color="primary"
							/>
						}
						label="Water"
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={isUrbanChecked}
								onChange={_onVisibilityChange}
								name="urban"
								classes={{ root: classes.checkbox, checked: classes.checked }}
								color="primary"
							/>
						}
						label="Urban"
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={isVegetationChecked}
								onChange={_onVisibilityChange}
								name="vegetation"
								classes={{ root: classes.checkbox, checked: classes.checked }}
								color="primary"
							/>
						}
						label="Vegetation"
					/>
				</FormGroup>
			</div>
		</div>
	)
}

export default SidebarExplore
