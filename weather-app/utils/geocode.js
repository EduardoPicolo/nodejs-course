const request = require('request')

const geocode = (address, callback) => {
   const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZWR1YXJkb3BpY29sbyIsImEiOiJjazhzemhla2swMDhxM25xeDFmNHpsNjNtIn0.mLuQsQKFt4A2-13BnJWSRw&limit=1`

   request({ url, json: true }, (error, response) => {
      if (error) {
         callback('Unable to connect to location services!')
      } else if (response.body.features.length === 0) {
         callback('Unable to find location. Try another search.')
      } else {
         const data = response.body.features[0]
         const [longitude, latitude] = data.center
         callback(null, {
            latitude,
            longitude,
            place_name: data.place_name,
         })
      }
   })
}

module.exports = geocode