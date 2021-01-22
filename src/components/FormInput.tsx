import React from "react";
import {ErrorMessage, FormikValues, useField} from "formik";
import classNames from "classnames";

const FormInput: React.FC<FormikValues> = ({label, type, ...props}) => {
	const [field, meta] = useField(props.name);
	return (
		<>
			<label htmlFor={field.name} className="form-label">{label}</label>
			<input id={field.name}
			       type={type}
			       {...field}
			       className={classNames("form-control form-control-lg", {"is-invalid": meta.error && meta.touched})}/>
			<ErrorMessage component="div" name={field.name} className="invalid-feedback"/>
		</>
	);
}

export default FormInput;