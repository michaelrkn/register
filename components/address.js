import { useState, useEffect } from 'react'

export default function Address(props) {
  const type = props.type.toLowerCase()
  const [city, setCity] = useState("")

  useEffect(() => {
    if (props.zip) {
      if (process.env.NODE_ENV === "production") {
        fetch("https://maps.googleapis.com/maps/api/geocode/json?key=" + process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY + "&address=" + props.zip)
        .then(response => response.json())
        .then(json => json.results[0].address_components[1].long_name)
        .then(city => setCity(city))
      } else {
        setCity("Anytown")
      }
    }
  }, [props.zip])

  return (
    <div>
      <div className="row">
        <div className="col">
          <label htmlFor={`"${type}Address"`}>{props.type} Address</label>
          <input id={`"${type}Address"`} name={`"${type}Address"`} type="text" />
        </div>
        <div className="col-2">
          <label htmlFor={`"${type}Unit"`}>Unit #</label>
          <input id={`"${type}Unit"`} name={`"${type}Unit"`} type="text" />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label htmlFor={`"${type}City"`}>City</label>
          <input id={`"${type}City"`} name={`"${type}City"`} type="text" defaultValue={city} />
        </div>
        <div className="col-4">
          <label htmlFor={`"${type}State"`}>State</label>
          <select id={`"${type}State"`} name={`"${type}State"`} defaultValue={props.state}>
            <option></option>
            <option value="Alabama">Alabama</option>
            <option value="Alaska">Alaska</option>
            <option value="Arizona">Arizona</option>
            <option value="Arkansas">Arkansas</option>
            <option value="California">California</option>
            <option value="Colorado">Colorado</option>
            <option value="Connecticut">Connecticut</option>
            <option value="Delaware">Delaware</option>
            <option value="District Of Columbia">District Of Columbia</option>
            <option value="Florida">Florida</option>
            <option value="Georgia">Georgia</option>
            <option value="Hawaii">Hawaii</option>
            <option value="Idaho">Idaho</option>
            <option value="Illinois">Illinois</option>
            <option value="Indiana">Indiana</option>
            <option value="Iowa">Iowa</option>
            <option value="Kansas">Kansas</option>
            <option value="Kentucky">Kentucky</option>
            <option value="Louisiana">Louisiana</option>
            <option value="Maine">Maine</option>
            <option value="Maryland">Maryland</option>
            <option value="Massachusetts">Massachusetts</option>
            <option value="Michigan">Michigan</option>
            <option value="Minnesota">Minnesota</option>
            <option value="Mississippi">Mississippi</option>
            <option value="Missouri">Missouri</option>
            <option value="Montana">Montana</option>
            <option value="Nebraska">Nebraska</option>
            <option value="Nevada">Nevada</option>
            <option value="New Hampshire">New Hampshire</option>
            <option value="New Jersey">New Jersey</option>
            <option value="New Mexico">New Mexico</option>
            <option value="New York">New York</option>
            <option value="North Carolina">North Carolina</option>
            <option value="North Dakota">North Dakota</option>
            <option value="Ohio">Ohio</option>
            <option value="Oklahoma">Oklahoma</option>
            <option value="Oregon">Oregon</option>
            <option value="Pennsylvania">Pennsylvania</option>
            <option value="Rhode Island">Rhode Island</option>
            <option value="South Carolina">South Carolina</option>
            <option value="South Dakota">South Dakota</option>
            <option value="Tennessee">Tennessee</option>
            <option value="Texas">Texas</option>
            <option value="Utah">Utah</option>
            <option value="Vermont">Vermont</option>
            <option value="Virginia">Virginia</option>
            <option value="Washington">Washington</option>
            <option value="Washington, D.C">Washington, D.C.</option>
            <option value="West Virginia">West Virginia</option>
            <option value="Wisconsin">Wisconsin</option>
            <option value="Wyoming">Wyoming</option>
          </select>
        </div>
        <div className="col-3">
          <label htmlFor={`"${type}Zip"`}>Zip</label>
          <input id={`"${type}Zip"`} name={`"${type}Zip"`} type="tel" defaultValue={props.zip} />
        </div>
      </div>
    </div>
  )
}