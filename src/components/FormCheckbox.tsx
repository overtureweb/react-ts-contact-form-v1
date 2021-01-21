import React from "react";
import {FormikValues, useField} from "formik";

// const FormCheckbox: React.FC<FormikValues> = ({form: formik, field, value, id}) =>
// <div className="form-check form-check-inline">
// 	<input {...formik.getFieldProps(field.name)} className="form-check-input" type="checkbox" value={value} id={id} />
// 	<label className="form-check-label" htmlFor={id}>
// 		{value}
// 	</label>
// </div>

const FormCheckbox: React.FC<FormikValues> = ({label, type, ...props}) => {
	const [field] = useField(props.name);
	return (
		<div className="form-check form-check-inline">
			<input {...field} {...props} className="form-check-input" type={type} value={label}
			       id={label}/>
			<label className="form-check-label" htmlFor={label}>
				{label}
			</label>
		</div>
	)
}

export default FormCheckbox;
