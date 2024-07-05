
const PasswordInput = ({ placeholder, label }) => {
    return (
        <div className="flex flex-col w-full">
            <label for={label} className="mb-2 font-semibold">
                {label}
            </label>
            <input
                type="password"
                placeholder={placeholder}
                id={label}
                className="border border-gray-400 rounded border-solid p-3 placeholder-slate-500 mb-2"
            />
        </div>

    )
}

export default PasswordInput;