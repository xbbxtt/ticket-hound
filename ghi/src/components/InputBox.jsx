export default function InputBox({
    type,
    name,
    value,
    onChange,
    placeholder,
    title,
}) {
    return (
        <div className="row">
            <label htmlFor={name} className="form-label mb-2">
                {title}
            </label>
            <div className="input-group mb-3">
                <input
                    className="form-control mb-2"
                    id={name}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            </div>
        </div>
    )
}
