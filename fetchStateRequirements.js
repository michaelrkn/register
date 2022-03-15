states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]
stateRequirements = { "AL": {}, "AK": {}, "AZ": {}, "AR": {}, "CA": {}, "CO": {}, "CT": {}, "DC": {}, "DE": {}, "FL": {}, "GA": {}, "HI": {}, "ID": {}, "IL": {}, "IN": {}, "IA": {}, "KS": {}, "KY": {}, "LA": {}, "ME": {}, "MD": {}, "MA": {}, "MI": {}, "MN": {}, "MS": {}, "MO": {}, "MT": {}, "NE": {}, "NV": {}, "NH": {}, "NJ": {}, "NM": {}, "NY": {}, "NC": {}, "ND": {}, "OH": {}, "OK": {}, "OR": {}, "PA": {}, "RI": {}, "SC": {}, "SD": {}, "TN": {}, "TX": {}, "UT": {}, "VT": {}, "VA": {}, "WA": {}, "WV": {}, "WI": {}, "WY": {}}
states.forEach(state => {
  fetch('https://register.rockthevote.com/api/v4/state_requirements.json?lang=en&home_state_id=' + state)
  .then(response => response.json())
  .then(requirements => {
    stateRequirements[state] = requirements
  })
})
console.log(stateRequirements)