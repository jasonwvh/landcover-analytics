import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Link, TextField, MenuItem } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

// locations of images
const locations = [
    {
        value: "Kota_Setar",
    },
    {
        value: "Kota_Kinabalu",
    },
];

// years of images
const years = [
    {
        value: "2008",
    },
    {
        value: "2010",
    },
    {
        value: "2012",
    },
    {
        value: "2014",
    },
    {
        value: "2016",
    },
    {
        value: "2018",
    },
    {
        value: "2020",
    },
];

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
    menu: {
        minWidth: "24vw",
        margin: "6 auto",
    },
    label: {
        fontSize: "20px",
        color: blue[500],
    },
    outlinedInput: {
        color: "#fff",
        "&$focused $notchedOutline": {
            borderColor: "#fff",
        },
    },
    textField: {
        width: "16ch",
    },
    focused: {},
    notchedOutline: {
        borderWidth: "1px",
        borderColor: blue[500],
    },
    links: {
        "& > * + *": {
            marginLeft: theme.spacing(2),
        },
        color: blue[500],
    },
}));

// main function
const SidebarCompare = (props) => {
    // use style
    const classes = useStyles();

    // use props
    const { location, year1, year2, onChangeYear, onChangeLocation } = props;

    // handler function for field change
    function _onChangeYear(event, value) {
        onChangeYear(event.target);
    }

    // handler function for field change
    function _onChangeLocation(event, value) {
        onChangeLocation(event.target);
    }

    return (
        <div className={classes.root}>
            {/* Title */}
            <Typography variant="h3">LAND USE VISUALIZATION</Typography>
            <div className={classes.margin} />
            {/* Links */}
            <Typography className={classes.links}>
                {/* Link to Home */}
                <Link href="/" color="inherit">
                    Home
                </Link>
                {/* Link to Compare */}
                <Link
                    href="/compare"
                    color="inherit"
                    variant="h5"
                    underline="always"
                >
                    Compare
                </Link>
            </Typography>
            {/* Separator */}
            <div className={classes.contentMargin} />
            {/* Location Selection */}
            <div className={classes.menu}>
                {/* First image */}
                <form noValidate autoComplete="off">
                    <TextField
                        select
                        minWidth={30}
                        name="location"
                        variant="outlined"
                        label="Location"
                        value={location}
                        onChange={_onChangeLocation}
                        className={classes.textField}
                        InputLabelProps={{
                            classes: {
                                root: classes.label,
                                focused: classes.focused,
                            },
                        }}
                        InputProps={{
                            classes: {
                                root: classes.outlinedInput,
                                focused: classes.focused,
                                notchedOutline: classes.notchedOutline,
                            },
                        }}
                    >
                        {locations.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.value}
                            </MenuItem>
                        ))}
                    </TextField>
                </form>
                {/* Separator */}
                <div className={classes.contentMargin} />
                {/* Year Selection */}
                <div className={classes.menu}>
                    {/* First image */}
                    <form noValidate autoComplete="off">
                        <TextField
                            select
                            minWidth={30}
                            name="year1"
                            variant="outlined"
                            label="First image"
                            value={year1}
                            onChange={_onChangeYear}
                            className={classes.textField}
                            InputLabelProps={{
                                classes: {
                                    root: classes.label,
                                    focused: classes.focused,
                                },
                            }}
                            InputProps={{
                                classes: {
                                    root: classes.outlinedInput,
                                    focused: classes.focused,
                                    notchedOutline: classes.notchedOutline,
                                },
                            }}
                        >
                            {years.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.value}
                                </MenuItem>
                            ))}
                        </TextField>
                        {/* Separator */}
                        <div className={classes.margin} />
                        {/* Second image */}
                        <TextField
                            select
                            name="year2"
                            variant="outlined"
                            label="Second image"
                            value={year2}
                            onChange={_onChangeYear}
                            className={classes.textField}
                            InputLabelProps={{
                                classes: {
                                    root: classes.label,
                                    focused: classes.focused,
                                },
                            }}
                            InputProps={{
                                classes: {
                                    root: classes.outlinedInput,
                                    focused: classes.focused,
                                    notchedOutline: classes.notchedOutline,
                                },
                            }}
                        >
                            {years.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.value}
                                </MenuItem>
                            ))}
                        </TextField>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SidebarCompare;
