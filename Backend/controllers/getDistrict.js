const { District } = require('../models/MapModel');
// 1. Endpoint to get Districts (usually small enough to send all)
const getDistricts = async (req, res) => {
    try {
        const data = await District.find({});
        res.status(200).json({ type: "FeatureCollection", features: data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getDistricts }


