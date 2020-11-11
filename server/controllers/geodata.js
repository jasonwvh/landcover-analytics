const Geodata = require('../models/Geodata');

exports.getGeodata = async (req, res, next) => {
    try {
        const query = { name: "classified_" + req.params.year.toString() }
        const geodata = await Geodata.find(query);

        return res.status(200).json({
            success: true,
            count: geodata.length,
            data: geodata
        })
    } catch (err) {
        console.log(err);
        res.status(500);
    }
};