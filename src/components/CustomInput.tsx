import { FC, InputHTMLAttributes, RefObject } from "react";

type CustomInputProps = {
    label?: string;
    errorMsg?: string;
    inputRef?: RefObject<HTMLInputElement | null>;
    ref?: RefObject<HTMLDivElement | null>;
} & InputHTMLAttributes<HTMLInputElement>;

const CustomInput: FC<CustomInputProps> = ({ label, errorMsg, inputRef, ref, ...inputProps }) => (
        <div ref={ref}>
            <label>
                {label}
                <input {...inputProps} ref={inputRef}  />
            </label>
            {!!errorMsg && <span>{errorMsg}</span>}
        </div>
    );

export default CustomInput;