export const FieldError = ({ message }) =>
  message ? <p className="text-red-500 text-[12px] font-medium mt-1 mb-1">{message}</p> : null;