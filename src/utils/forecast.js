const request = require('request') 

const forecast=(latitude,longitude,callback)=> {
 const url= 'https://api.darksky.net/forecast/3e66f9678051ee54a7239e51afcb5334/' + latitude + ', ' + longitude 

 request({url, json:true}, (error,{body}) => {
    if(error){
        callback('Unable to connect', undefined)
    }else if(body.error){
        callback('Try again. Can not find location', undefined)
    }else{
        callback(undefined, body.daily.data[0].summary + ' This is the current temperature ' + body.currently.temperature +''+ ' & There is a '+ body.currently.precipProbability+'% chance of rain')
    }
 })

}




module.exports=forecast