const { Ward } = require('../models/MapModel');

// 2. Endpoint for Wards (Spatial Query - Fetch Quick!)
const getWards = async (req, res) => {
    try {
        const rawWards = await Ward.find({});

        // Transform the Mongoose documents into clean GeoJSON objects
        const cleanFeatures = rawWards.map(ward => ({
            type: "Feature",
            id: ward._id, // Leaflet likes an ID here
            geometry: ward.geometry,
            properties: {
                ...ward.properties,
                // Ensure no null values are breaking the logic
                density: ward.properties.density_final || 0
            }
        }));

        res.status(200).json({
            type: "FeatureCollection",
            features: cleanFeatures
        });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch GeoJSON" });
    }
};

module.exports = { getWards }