const Geodata = require('../models/Geodata');

// get data from MongoDB
exports.getGeodata = async (req, res, next) => {
    try {
        // query the name based on year, **have to change in future**
        // const location = { location: req.params.location.toString() };
        // const year = { year: req.params.year.toString() };
        // const geodata = await Geodata.find(location, year);
        const geodata = await Geodata.find({ location: req.params.location, year: req.params.year.toString() });

        // return status if successfull
        return res.status(200).json({
            success: true,
            count: geodata.length,
            data: geodata
        })
        // catch error
    } catch (err) {
        console.log(err);
        res.status(500);
    }
};