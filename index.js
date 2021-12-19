const express =  require('express');
const path =  require('path');

const app = express();

app.use(express.static(__dirname));

app.get('/',(req,res) => { 
    //res.send('<h1> hello heroku</h1>');
    res.sendFile(path.join(__dirname,'index.html'));
});


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`running as ${process.env.NODE_ENV||'?'}, on port ${PORT}`) );