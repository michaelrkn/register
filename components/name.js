export default function Name(props) {
  if (props) {
    const type = props.type
  }
  return (
    <div>
      <div className="row">
        <div className="col-2">
          <label htmlFor={"title" + type}>{type} Title</label>
          <select id={"title" + type} name={"title" + type} required>
            <option></option>
            <option value="Mr.">Mr.</option>
            <option value="Ms.">Ms.</option>
            <option value="Mrs.">Mrs.</option>
            <option value="Miss”">Miss</option>
          </select>
        </div>
        <div className="col">
          <label htmlFor={"firstName" + type}>{type} First Name</label>
          <input id={"firstName" + type} name={"firstName" + type} type="text" required />
        </div>
        <div className="col">
          <label htmlFor={"lastName" + type}>{type} Last Name</label>
          <input id={"lastName" + type} name={"lastName" + type} type="text" required />
        </div>
        <div className="col-3">
          <label htmlFor={"suffix" + type}>{type} Suffix</label>
          <select id={"suffix" + type} name={"suffix" + type}>
            <option></option>
            <option value="Jr.">Jr.</option>
            <option value="Sr.">Sr.</option>
            <option value="II”">II</option>
            <option value="III">III</option>
            <option value="IV">IV</option>
          </select>
        </div>
      </div>
    </div>
  )
}