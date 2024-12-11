const express = require('express');
const axios=require('axios');
const cors = require('cors');

const app = express();
app.use(cors());


app.get('/api/generic-name', async (req, res) => {
    const brandName = req.query.brand_name;
    console.log('Received brand name: ', brandName);
    const url = `https://api.fda.gov/drug/drugsfda.json?search=openfda.brand_name:"${brandName}"`;
  
    try {
      const response = await axios.get(url);

      const results=response.data.results;
      if(!results||results.length===0){
        return res.status(404).json({error:'No products found'});
      }
      const genericNames=results.flatMap((result) => {
        const genericNamesArray=result.openfda?.generic_name|| [];
      return Array.isArray(genericNamesArray) ? genericNamesArray:[];
      });

      const uniqueGenericNames=[...new Set(genericNames)];

      console.log('Generic Names',uniqueGenericNames);

      if(uniqueGenericNames.length===0){
        return res.status(404).json({error:"No generic names"});
      }

      res.json(uniqueGenericNames);
    } catch (error) {
      //console.error(error.message);
      res.status(500).json({ error: 'Error fetching generic names from openFDA.' });
    }
  });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});