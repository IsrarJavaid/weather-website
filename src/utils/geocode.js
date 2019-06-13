const request=require('request')
const geocode= (address, callback) =>{
    const url= "https://api.mapbox.com/geocoding/v5/mapbox.places/ " + address + " .json?access_token=pk.eyJ1IjoiaXNyYXJqYXZhaWQiLCJhIjoiY2p3cGM4N25tMHBkejQzbjZnbWQ0eG9jdSJ9.2PNj-Vr3DthRO1oKCB8PGQ"
    request( {url, json:true}, (error,{body})=>{
       if(error){
          callback('Unable to connect', undefined)
       }else if(body.features.length===0){
          callback('Try again. Can not find location', undefined)
        }else{
          callback(undefined,{
           
             latitude:body.features[0].center[1] ,
             longitude:body.features[0].center[0],
             location:body.features[0].place_name 
          })
      }
 
    })
 }
 module.exports=geocode