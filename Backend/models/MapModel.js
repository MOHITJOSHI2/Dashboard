const mongoose = require('mongoose');

const GeoSchema = new mongoose.Schema({
    type: { type: String, default: "Feature" },
    properties: { type: Object }, // Stores OBJECTID, DISTRICT, etc.
    geometry: {
        type: {
            type: String,
            enum: ['Polygon', 'MultiPolygon'],
            required: true
        },
        coordinates: {
            type: Array,
            required: true
        }
    }
});

// CRITICAL: This line creates the spatial index
GeoSchema.index({ geometry: "2dsphere" });

const District = mongoose.model('District', GeoSchema, 'districts');
const Ward = mongoose.model('Ward', GeoSchema, 'wards');

module.exports = { District, Ward };