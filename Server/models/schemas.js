 /*file created to easily make data that would be inserted into the database */
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const analysisRegexSchema = new Schema({
   name: { type: String, required: true },
   pattern: { type: String, required: true },
   description: { type: String, required: true },
})


const AnalysisRegex = mongoose.model('analysisRegex', analysisRegexSchema);

module.exports = AnalysisRegex;