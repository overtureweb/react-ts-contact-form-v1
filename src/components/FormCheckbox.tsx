import React from "react";
import classNames from "classnames";
import {ErrorMessage, FormikValues, getIn} from "formik";

const FormCheckbox: React.FC<FormikValues> = ({form: formik, field, value, id}) =>
	// <div className="mb-3">
	// 	<label htmlFor={field.name} className="form-label">{label}</label>
	// 	<input id={field.name}
	// 	       type={type}
	// 	       {...formik.getFieldProps(field.name)}
	// 	       className={classNames("form-control form-control-lg", {"is-invalid": getIn(formik.errors, field.name) && getIn(formik.touched, field.name)})}/>
	// 	<ErrorMessage component="div" name={field.name} className="invalid-feedback"/>
	// </div>
<div className="form-check form-check-inline">
	<input {...formik.getFieldProps(field.name)} className="form-check-input" type="checkbox" value={value} id={id} />
	<label className="form-check-label" htmlFor={id}>
		{value}
	</label>
</div>

export default FormCheckbox;
