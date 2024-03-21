
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const analysisRegexSchema = new Schema({
   name: { type: String, required: true },
   pattern: { type: String, required: true },
   description: { type: String, required: true },
})

const detectRegexSchema = new Schema({
   name: { type: String, required: true },
   pattern: { type: String, required: true },
   description: { type: String, required: true },
})

const AnalysisRegex = mongoose.model('analysisRegex', analysisRegexSchema);
const DetectRegex = mongoose.model('detectRegex', detectRegexSchema);

module.exports = AnalysisRegex;
module.exports = DetectRegex;