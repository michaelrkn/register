export function zipToState(zipInput) {
  const zip = parseInt(zipInput, 10)
  if (isNaN(zip)) {
    return undefined
  } else {
    if (zip >= 35000 && zip <= 36999) {
      return "Alabama"
    } else if (zip >= 99500 && zip <= 99999) {
      return "Alaska"
    } else if (zip >= 85000 && zip <= 86999) {
      return "Arizona"
    } else if (zip >= 71600 && zip <= 72999) {
      return "Arkansas"
    } else if (zip >= 90000 && zip <= 96699) {
      return "California"
    } else if (zip >= 80000 && zip <= 81999) {
      return "Colorado"
    } else if ((zip >= 6000 && zip <= 6389) || (zip >= 6391 && zip <= 6999)) {
      return "Connecticut"
    } else if (zip >= 19700 && zip <= 19999) {
      return "Delaware"
    } else if (zip >= 32000 && zip <= 34999) {
      return "Florida"
    } else if ( (zip >= 30000 && zip <= 31999) || (zip >= 39800 && zip <= 39999) ) {
      return "Georgia"
    } else if (zip >= 96700 && zip <= 96999) {
      return "Hawaii"
    } else if (zip >= 83200 && zip <= 83999) {
      return "Idaho"
    } else if (zip >= 60000 && zip <= 62999) {
      return "Illinois"
    } else if (zip >= 46000 && zip <= 47999) {
      return "Indiana"
    } else if (zip >= 50000 && zip <= 52999) {
      return "Iowa"
    } else if (zip >= 66000 && zip <= 67999) {
      return "Kansas"
    } else if (zip >= 40000 && zip <= 42999) {
      return "Kentucky"
    } else if (zip >= 70000 && zip <= 71599) {
      return "Louisiana"
    } else if (zip >= 3900 && zip <= 4999) {
      return "Maine"
    } else if (zip >= 20600 && zip <= 21999) {
      return "Maryland"
    } else if ( (zip >= 1000 && zip <= 2799) || (zip == 5501) || (zip == 5544 ) ) {
      return "Massachusetts"
    } else if (zip >= 48000 && zip <= 49999) {
      return "Michigan"
    } else if (zip >= 55000 && zip <= 56899) {
      return "Minnesota"
    } else if (zip >= 38600 && zip <= 39999) {
      return "Mississippi"
    } else if (zip >= 63000 && zip <= 65999) {
      return "Missouri"
    } else if (zip >= 59000 && zip <= 59999) {
      return "Montana"
    } else if (zip >= 27000 && zip <= 28999) {
      return "North Carolina"
    } else if (zip >= 58000 && zip <= 58999) {
      return "North Dakota"
    } else if (zip >= 68000 && zip <= 69999) {
      return "Nebraska"
    } else if (zip >= 88900 && zip <= 89999) {
      return "Nevada"
    } else if (zip >= 3000 && zip <= 3899) {
      return "New Hampshire"
    } else if (zip >= 7000 && zip <= 8999) {
      return "New Jersey"
    } else if (zip >= 87000 && zip <= 88499) {
      return "New Mexico"
    } else if ( (zip >= 10000 && zip <= 14999) || (zip == 6390) || (zip == 501) || (zip == 544) ) {
      return "New York"
    } else if (zip >= 43000 && zip <= 45999) {
      return "Ohio"
    } else if ((zip >= 73000 && zip <= 73199) || (zip >= 73400 && zip <= 74999) ) {
      return "Oklahoma"
    } else if (zip >= 97000 && zip <= 97999) {
      return "Oregon"
    } else if (zip >= 15000 && zip <= 19699) {
      return "Pennsylvania"
    } else if (zip >= 300 && zip <= 999) {
      return "Puerto Rico"
    } else if (zip >= 2800 && zip <= 2999) {
      return "Rhode Island"
    } else if (zip >= 29000 && zip <= 29999) {
      return "South Carolina"
    } else if (zip >= 57000 && zip <= 57999) {
      return "South Dakota"
    } else if (zip >= 37000 && zip <= 38599) {
      return "Tennessee"
    } else if ( (zip >= 75000 && zip <= 79999) || (zip >= 73301 && zip <= 73399) ||  (zip >= 88500 && zip <= 88599) ) {
      return "Texas"
    } else if (zip >= 84000 && zip <= 84999) {
      return "Utah"
    } else if (zip >= 5000 && zip <= 5999) {
      return "Vermont"
    } else if ( (zip >= 20100 && zip <= 20199) || (zip >= 22000 && zip <= 24699) || (zip == 20598) ) {
      return "Virginia"
    } else if ( (zip >= 20000 && zip <= 20099) || (zip >= 20200 && zip <= 20599) || (zip >= 56900 && zip <= 56999) ) {
      return "Washington, D.C."
    } else if (zip >= 98000 && zip <= 99499) {
      return "Washington"
    } else if (zip >= 24700 && zip <= 26999) {
      return "West Virginia"
    } else if (zip >= 53000 && zip <= 54999) {
      return "Wisconsin"
    } else if (zip >= 82000 && zip <= 83199) {
      return "Wyoming"
    } else {
      return undefined
    }
  }
}