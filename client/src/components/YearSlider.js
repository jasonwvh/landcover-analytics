import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Slider, Tooltip } from "@material-ui/core";
import { grey, blue } from "@material-ui/core/colors";

// Styling our tooltip
const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: grey[50],
        color: grey[900],
        boxShadow: theme.shadows[1],
        fontSize: 15,
    },
    arrow: {
        color: grey[50],
    },
}))(Tooltip);

// Styling our tooltip
function ValueLabelComponent(props) {
    const { children, open, value } = props;

    return (
        <LightTooltip
            open={open}
            enterTouchDelay={0}
            placement="top"
            title={value}
            arrow
        >
            {children}
        </LightTooltip>
    );
}

// Styling our tooltip
ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
};

// Styling our slider
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 8,
        maxWidth: "65%",
        padding: "36px",
        margin: "36px auto",
        color: "#fff",
    },
    margin: {
        width: theme.spacing(3),
    },
}));

// Styling our slider
const CustomSlider = withStyles({
    root: {
        color: blue[500],
        height: 4,
    },
    thumb: {
        height: 36,
        width: 36,
        backgroundColor: "#fff",
        border: "2px solid currentColor",
        marginTop: -12,
        marginLeft: -24,
        "&:focus, &:hover, &$active": {
            boxShadow: "inherit",
        },
    },
    active: {},
    valueLabel: {
        left: "calc(-50% + 4px)",
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);

// Main functions
const YearSlider = (props) => {
    const { onYearChange, startYear, selectedYear, endYear, step } = props;
    const classes = useStyles();

	// handler function for year change
    function _onYearChange(event, value) {
        onYearChange(value);
    }

	// main slider
    return (
        <div className={classes.root}>
            <div className={classes.margin} />
            <CustomSlider
                aria-label="custom thumb label"
                ValueLabelComponent={ValueLabelComponent}
                valueLabelDisplay="on"
                min={startYear}
                max={endYear}
                value={selectedYear}
                step={step}
                onChange={_onYearChange}
            />
            <div className={classes.margin} />
        </div>
    );
};

export default YearSlider;
