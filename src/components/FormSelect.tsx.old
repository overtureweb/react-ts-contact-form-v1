import React from "react";
import classNames from "classnames";
import {ErrorMessage, FormikValues, getIn} from "formik";

interface FormSelectProps extends FormikValues {
	selectMenuValues: string[];
}

const FormSelect: React.FC<FormSelectProps> = ({form: formik, field, label, selectMenuValues}) =>
	<div className="mb-3">
		<label className="form-label" htmlFor={field.name}>{label}</label>
		<select id={field.name}
		        {...formik.getFieldProps(field.name)}
		        className={classNames("form-select form-select-lg", {"is-invalid": getIn(formik.errors, field.name) && getIn(formik.touched, field.name)})}>
			<option/>
			{(selectMenuValues).map((value, i) => <option key={`${field.name}-${i}`}>{value}</option>)}
		</select>
		<ErrorMessage component="div" name={field.name} className="invalid-feedback"/>
	</div>

export default FormSelect;
