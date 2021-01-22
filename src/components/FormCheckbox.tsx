import React from "react";
import {FormikValues, useField} from "formik";
import classNames from "classnames";

const FormCheckbox: React.FC<FormikValues> = ({label, type, ...props}) => {
	const [field, meta] = useField({name: props.name, type: type, value: label});
	return (
		<>
			<input className={classNames("form-check-input", {"is-invalid": meta.error && meta.touched})}
			       type={type}
			       id={field.value}
			       {...field}
			       {...props}
			/>
			<label className="form-check-label" htmlFor={field.value}>
				{field.value}
			</label>
		</>
	)
}

export default FormCheckbox;
