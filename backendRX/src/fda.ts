const express = require('express');
const axios=require('axios');
const cors = require('cors');

const app = express();
app.use(cors());


app.get('/api/generic-name', async (req, res) => {
    const brandName = req.query.brand_name;
    console.log('Received brand name: ', brandName);
    const url = `https://api.fda.gov/drug/drugsfda.json?search=products.brand_name:"${brandName}"`;
  
    try {
      const response = await axios.get(url);

      const products=response.data.results ? response.data.results[0]?.products: [];
      console.log('Raw API Response:', JSON.stringify(response.data,null,2));
     
      if(!products||products.length===0){
        return res.status(404).json({error:'no products found'});
      }

      const genericNames=products.flatMap((product) => {
        const genericNamesArray=product.openfda?.generic_name|| [];
        products.forEach((product)=>{
          console.log('Product openFDA field:',JSON.stringify(product.openfda,null,2));
        });
      return Array.isArray(genericNamesArray) ? genericNamesArray:[];
      }).filter((name,index,self)=>name !==null && self.indexOf(name)===index);
      
      console.log('Generic Names:',genericNames);

      res.json(genericNames);
    } catch (error) {
      //console.error(error.message);
      res.status(500).json({ error: 'Error fetching generic names from openFDA.' });
    }
  });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});