const app = require('./app')
const config =require('./src/config/config')
const port = config.PORT;

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});