import React from "react";
import classNames from "classnames";
import {ErrorMessage, FormikValues, useField} from "formik";

interface FormSelectProps extends FormikValues {
	selectMenuValues: any[];
	label: string;
	name: string;
}

const FormSelect: React.FC<FormSelectProps> = ({label, selectMenuValues, ...props}) => {
	const [field, meta] = useField(props.name)
	return (
		<>
			<label className="form-label" htmlFor={field.name}>{label}</label>
			<select id={field.name}
			        {...field}
			        className={classNames("form-select form-select-lg", {"is-invalid": meta.error && meta.touched})}>
				<option/>
				{(selectMenuValues).map((value, i) => <option key={`${field.name}-${i}`}>{value}</option>)}
			</select>
			<ErrorMessage component="div" name={field.name} className="invalid-feedback"/>
		</>
	)
}

export default FormSelect;
