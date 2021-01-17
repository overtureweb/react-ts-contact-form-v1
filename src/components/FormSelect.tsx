import React from "react";
import {v4 as uuidv4} from "uuid";
import classNames from "classnames";
import {ErrorMessage, FormikValues, getIn} from "formik";

interface FormSelectProps extends FormikValues{
	selectMenuValues: string[];
}

const FormSelect: React.FC<FormSelectProps> = ({form: formik, field, label, selectMenuValues}) =>
	<div className="mb-3 col">
		<label className="form-label" htmlFor="state">{label}</label>
		<select id={field.name}
		        {...formik.getFieldProps(field.name)}
		        className={classNames("form-select form-select-lg", {"is-invalid": getIn(formik.errors, field.name) && getIn(formik.touched, field.name)})}>
			<option/>
			{(selectMenuValues).map((value) => <option key={uuidv4()}>{value}</option>)}
		</select>
		<ErrorMessage component="div" name={field.name} className="invalid-feedback"/>
	</div>

export default FormSelect;
