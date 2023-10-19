const Input = ({
  label,
  value,
  placeholder = "",
  name = "",
  id = "",
  type = "text",
  error = "",
  onChange,
}) => {
  return (
    <div className="mb-2">
      <label
        className="mb-1 block text-sm font-[500] leading-[21px] text-[#222222]"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className=" w-full rounded px-2 py-2 text-sm leading-tight text-[#525252] outline-none ring-0 focus:border-blue-500 border-[1.5px] border-gray-400"
        placeholder={placeholder}
      />
      {error && <p className="text-[12px] text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
