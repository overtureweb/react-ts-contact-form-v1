import React from "react";
import classNames from "classnames";
import {ErrorMessage, FormikValues, useField} from "formik";

const FormSelect: React.FC<FormikValues> = ({label, name, ...props}) => {
	const [field, meta] = useField(name)
	return (
		<>
			<label className="form-label" htmlFor={field.name}>{label}</label>
			<select id={field.name}
			        {...field}
			        {...props}
			        className={classNames("form-select form-select-lg", {"is-invalid": meta.error && meta.touched})}/>
			<ErrorMessage component="div" name={field.name} className="invalid-feedback"/>
		</>
	)
}

export default FormSelect;
