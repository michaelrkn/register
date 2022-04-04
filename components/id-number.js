import { useState, useEffect } from 'react'
import statesIdNumberChoices from '../public/states-id-number-choices'

export default function IdNumber(props) {
  const { state } = props
  const idNumberChoices = statesIdNumberChoices[state]

  const [idTypeIndex, setIdTypeIndex] = useState(undefined)
  const selectIdType = (event) => {
    setIdTypeIndex(event.target.value)
  }

  useEffect(() => {
    if (idNumberChoices.length === 1) {
      setIdTypeIndex(0)
    }
  }, [idNumberChoices])

  return (
    <div>
      <div className={idNumberChoices.length === 1 ? "hidden": "row"}>
        <div className="col">
          <label>Identification</label>
          {idNumberChoices.map((choice, index) =>
            <div key={index}>
              <label htmlFor={choice.id}>
                <input type="radio" id={choice.id} name="idType" value={index} onChange={selectIdType} required />
                {choice.description}
              </label>
            </div>)
          }
        </div>
      </div>
      <div className="row">
        <div className="col">
          {idTypeIndex !== undefined &&
            <div>
              <label htmlFor="idNumber">{idNumberChoices[idTypeIndex].title}</label>
              <input id="idNumber"
                     name="idNumber"
                     type="text"
                     required />
            </div>
          }
        </div>
      </div>
    </div>
  )
}