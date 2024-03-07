const express = require('express')
const router = express.Router()
const AnalysisRegex = require('../models/schemas');


router.get('/AnalysisRegex', async (req, res) => {
   try {
     const regexPatterns = await AnalysisRegex.find();
     console.log('Fetched regex patterns:', regexPatterns);
     res.json(regexPatterns);
   } catch (error) {
     console.error('Error fetching regex patterns:', error);
     res.status(500).json({ error: 'Internal Server Error' });
   }
 });



module.exports = router