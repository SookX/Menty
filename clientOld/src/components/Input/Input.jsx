import './input.less'

const Input = ({ label = null, placeholder = null, value, setValue, type = "text", children }) => {
    return (
        <div className="input">
            <label className="p2 bold">{label}</label>
            {
                type === "select" ?
                <div className='select-container'>
                    <select
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className='input-field'
                    >
                        {children}
                    </select>
                    <svg xmlns="http://www.w3.org/2000/svg" width="748" height="398" viewBox="0 0 748 398" fill="none" className='select-icon'>
                        <path d="M24 24L374 374L724 24" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                :
                type === "textarea" ?
                <textarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={placeholder}
                    className='input-field'
                />
                :
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={placeholder}
                    className='input-field'
                    type={type}
                />
            }
        </div>
    )
}

export default Input