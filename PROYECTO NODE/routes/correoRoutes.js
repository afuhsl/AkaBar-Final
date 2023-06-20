const express = require('express');
const app = express();

let envio = require('../controllers/correoController');

app.post('/envio', envio.envioCorreo);
app.post('/envioCita', envio.envioCita);

app.get("/fetch_alcohol", async (req,res) => {
    console.log("/fetch_alcohol llamado");
    const {date} = req.params;
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`;
    const options = {
      "method": "GET",
    };
   
    const response = await fetch(url,options)
    .then(res => res.json())
    .catch(e => {
      console.error({
        "mensaje":"Oh no",
        error: e,
      });
    });
    console.log("RESPONSE: ", response);
    res.json(response);
    });
  
    app.get("/fetch_alcohol/:Bebida", async (req,res) => {
      console.log("/fetch_alcohol llamado");
      const {Bebida} = req.params;
      const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${Bebida}`;
      const options = {
        "method": "GET",
      };
      
     
      const response = await fetch(url,options)
      .then(res => res.json())
      .catch(e => {
        console.error({
          "mensaje":"Oh no",
          error: e,
        });
      });
      console.log("RESPONSE: ", response);
     res.json(response)
      
    
    });


module.exports = app;