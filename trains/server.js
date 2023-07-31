
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3500;

app.use('/trains', require('./routes/trains'));

app.listen(PORT, ()=>{
    console.log(`Server running on port no: ${PORT}`);
})