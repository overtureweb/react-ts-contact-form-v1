import React from "react";
import classNames from "classnames";
import {ErrorMessage, FormikValues, getIn} from "formik";

const FormInput: React.FC<FormikValues> = ({form: formik, field, label, type}) =>
	<div className="mb-3">
		<label htmlFor={field.name} className="form-label">{label}</label>
		<input id={field.name}
		       type={type}
		       {...formik.getFieldProps(field.name)}
		       className={classNames("form-control form-control-lg", {"is-invalid": getIn(formik.errors, field.name) && getIn(formik.touched, field.name)})}/>
		<ErrorMessage component="div" name={field.name} className="invalid-feedback"/>
	</div>

export default FormInput;
