import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Typography,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Link,
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

// styling our sidebar
const useStyles = makeStyles((theme) => ({
    root: {
        padding: "12px",
        margin: "0 auto",
    },
    margin: {
        height: theme.spacing(3),
    },
    contentMargin: {
        height: theme.spacing(9),
    },
    checkbox: {
        color: blue[500],
        "&$checked": {
            color: blue[500],
        },
    },
    checked: {},
    container: {
        maxWidth: "35%",
        margin: "0 auto",
    },
    links: {
        "& > * + *": {
            marginLeft: theme.spacing(2),
        },
        color: blue[500],
    },
}));

// main function
const SidebarExplore = (props) => {
	// use style
    const classes = useStyles();

	// use props
    const {
        isWaterChecked,
        isUrbanChecked,
        isForestChecked,
        isAgricultureChecked,
        onVisibilityChange,
    } = props;

	// handler function for visibility
    function _onVisibilityChange(event, value) {
        onVisibilityChange(event.target);
    }

    return (
        <div className={classes.root}>
			{/* Title */}
            <Typography variant="h3">LAND USE VISUALIZATION</Typography>
            <div className={classes.margin} />
			{/* Link to return */}
            <Typography className={classes.links}>
                <Link href="/" color="inherit">
                    Back
                </Link>
            </Typography>
			{/* Separator */}
            <div className={classes.contentMargin} />
			{/* FormGroup for layers visibility*/}
            <div className={classes.container}>
                <FormGroup column>
					{/* Water */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isWaterChecked}
                                onChange={_onVisibilityChange}
                                name="water"
                                classes={{
                                    root: classes.checkbox,
                                    checked: classes.checked,
                                }}
                                color="primary"
                            />
                        }
                        label="Water"
                    />
					{/* Urban */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isUrbanChecked}
                                onChange={_onVisibilityChange}
                                name="urban"
                                classes={{
                                    root: classes.checkbox,
                                    checked: classes.checked,
                                }}
                                color="primary"
                            />
                        }
                        label="Urban"
                    />
					{/* Agriculture */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isAgricultureChecked}
                                onChange={_onVisibilityChange}
                                name="agriculture"
                                classes={{
                                    root: classes.checkbox,
                                    checked: classes.checked,
                                }}
                                color="primary"
                            />
                        }
                        label="Agriculture"
                    />
                    {/* Forest */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isForestChecked}
                                onChange={_onVisibilityChange}
                                name="forest"
                                classes={{
                                    root: classes.checkbox,
                                    checked: classes.checked,
                                }}
                                color="primary"
                            />
                        }
                        label="Forest"
                    />
                </FormGroup>
            </div>
        </div>
    );
};

export default SidebarExplore;
