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

