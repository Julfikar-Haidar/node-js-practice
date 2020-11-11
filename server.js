const express = require('express');
const contactRoute = require('./api/routes/contact')
const morgan = require('morgan')
const  bodyParser = require('body-parser')
const cors = require('cors')

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test');




const db = mongoose.connection

db.on('error', (err) => {
    console.log(err);
})
db.once('open', () => {
    console.log('Databese connection established');
})

const app = express();
app.use(morgan('dev'));
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000

app.use('/api/conatcts', contactRoute);


const Schema = mongoose.Schema
const demoSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    phone: {
        type: String,
        required:true
    }
})
 
const Demo = mongoose.model('Demo', demoSchema)

app.get('/demo', (req, res) => {
    const demo = new Demo({
        name: 'Tanjila',
        phone: '098467687999'
    })

    demo.save()
        .then(data => {
         res.json({data});
        })
    .catch(err => console.log(err))
});

app.get('/getdemo', (req, res) => {
    
    Demo.find()
        .then(data => {
         res.json(data);
        })
    .catch(err => console.log(err))
});

app.get('/', (req, res) => {
    res.send('Hey node js <h1> Wow</h1>');
});

// app.get('/api/conatcts', (req, res) => {
//      res.json(contacts);
// });

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

// const contacts = [
//     {id:1,name:'Julfikar',Address:'Dhaka'},
//     {id:1,name:'Julfikar',Address:'Dhaka'},
//     {id:1,name:'Julfikar',Address:'Dhaka'},
//     {id:1,name:'Julfikar',Address:'Dhaka'},
//     {id:1,name:'Julfikar',Address:'Dhaka'},
//     {id:1,name:'Julfikar',Address:'Dhaka'},
// ]