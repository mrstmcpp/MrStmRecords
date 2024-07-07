
const TextInput = ({ placeholder, label , value , setValue }) => {
    return (
        <div className="flex flex-col">
            <label for={label} className="mb-2 font-semibold text-rev-color">
                {label}
            </label>
            <input
                type="text"
                placeholder={placeholder}
                id={label}
                className="border border-gray-400 rounded-full border-solid p-3 placeholder-slate-500 mb-2"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
            />
        </div>

    )
}

export default TextInput;