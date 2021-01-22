import React from "react";
import {FormikValues, useField} from "formik";

const FormRadioGroup: React.FC<FormikValues> = ({label, ...props}) => {
	const [field] = useField({name: props.name, type: "radio", value: label});
	return (
		<>
			<input className="form-check-input"
			       type="radio"
			       id={field.value}
			       {...props}
			       {...field}
			/>
			<label className="form-check-label" htmlFor={field.value}>
				{field.value}
			</label>
		</>
	)
}

export default FormRadioGroup;