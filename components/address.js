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
          <label htmlFor={type + "Address"}>{props.type} Address</label>
          <input id={type + "Address"} name={type + "Address"} type="text" required />
        </div>
        <div className="col-2">
          <label htmlFor={type + "Unit"}>Unit #</label>
          <input id={type + "Unit"} name={type + "Unit"} type="text" />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label htmlFor={type + "City"}>City</label>
          <input id={type + "City"} name={type + "City"} type="text" defaultValue={city} required />
        </div>
        <div className="col-4">
          <label htmlFor={type + "State"}>State</label>
          <select id={type + "State"} name={type + "State"} defaultValue={props.state} required>
            <option></option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">Washington, D.C.</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>
        </div>
        <div className="col-3">
          <label htmlFor={type + "Zip"}>Zip</label>
          <input id={type + "Zip"} name={type + "Zip"} type="tel" maxLength="5" minLength="5" defaultValue={props.zip} required />
        </div>
      </div>
    </div>
  )
}