export default function InputBox({type, name, value, onChange, placeholder, title}) {
    return (
        <div>
            <label htmlFor={name} className="">
                {title}
            </label>
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    )
}




// ;<div className="form-floating mb-3">
//     <div>
//         <label htmlFor="automobileVin" className="form-label">
//             Automobile VIN:
//         </label>
//     </div>
//     <input
//         required
//         className="form-control"
//         name="vin"
//         id="automobileVin"
//         type="text"
//         value={formData.vin}
//         onChange={handleInputChange}
//     />
// </div>
