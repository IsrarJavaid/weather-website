const path=require('path')
const express= require('express')
const hbs= require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')


const app= express()

const port=process.env.PORT || 3000

//define paths for express config
const pathToDirectory=path.join(__dirname, '../public')
const viewspath=path.join(__dirname, '../templates/views')
const partialspath=path.join(__dirname, '../templates/partials')


// setup handlers engine and views
app.set('view engine','hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)

//setup static directory to serve
app.use(express.static(pathToDirectory))

app.get('',(req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'M Israr Javaid'
    }) 
})
app.get(('/about'),(req, res)=>{
    res.render('about',{
        title:'About',
        name: 'M Israr Javaid'
    })
})
app.get('/help',(req, res)=>{
    res.render('help',{
        title:'Help',
        name: 'M Israr Javaid'
    })
})

app.get(('/weather'), (req,res)=>{
    if(!req.query.address){
        return  res.send({
         error : 'You must provide an address' 
        })
    }
   geocode(req.query.address, (error, {location,longitude,latitude}={})=>{
       if(error){
           return res.send({error})
       }
       forecast(latitude, longitude, (error, forecastData) =>{
        if(error){
            return res.send({error})
        }
        res.send({
            location,
            forecast: forecastData,
            address: req.query.address 
        })
       })

   })
   
   
})
app.get('/help/*',(req, res)=>{
    res.render('404', {
        title:'404',
        name: 'M Israr Javaid',
        errormessage:'Help article not found'
    })
})

app.get('*', (req, res)=>{
    res.render('404',{
        title:'404',
        name: 'M Israr Javaid',
        errormessage:'Page ot found'
    })
})

app.listen(port, ()=>{
    console.log('Server is running on ' + port)
})