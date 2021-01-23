import React from "react";
import {FormikValues, useField} from "formik";
import classNames from "classnames";
import {v4 as uuidv4} from 'uuid';

const FormCheckboxGroup: React.FC<FormikValues> = ({label, type, name}) => {
	const [field, meta] = useField({name, type, value: label});
	const id = uuidv4();
	return (
		<>
			<input className={classNames("form-check-input d-none", {"is-invalid": meta.error && meta.touched})}
			       type={type}
			       id={id}
			       {...field}
			/>
			<label className="d-flex justify-content-center align-items-center form-check-label form-check-group__label" htmlFor={id}>
				<span>{field.value}</span>
			</label>
		</>
	)
}

export default FormCheckboxGroup;
