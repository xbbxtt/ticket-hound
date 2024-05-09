export default function InputBox({
    type,
    name,
    value,
    onChange,
    placeholder,
    title,
}) {
    const options = {
        type: type,
        name: name,
        value: value,
        onChange: onChange,
        placeholder: placeholder,
        title: title,
    }
    if (type === 'date' && name !== 'birthday') {
        const date = new Date().toISOString().split('T')[0]
        options['min'] = date
    }
    return (
        <div className="row">
            <label htmlFor={name} className="form-label mb-2">
                {title}
            </label>
            <div className="input-group mb-3">
                <input className="form-control mb-2" {...options} />
            </div>
        </div>
    )
}
