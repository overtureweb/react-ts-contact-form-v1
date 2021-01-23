import React from "react";
import {FormikValues, useField} from "formik";
import classNames from "classnames";
import {v4 as uuidv4} from 'uuid';

const FormCheckbox: React.FC<FormikValues> = ({label, type, name}) => {
	const [field, meta] = useField({name, type, value: label});
	const id = uuidv4();
	return (
		<>
			<input className={classNames("form-check-input", {"is-invalid": meta.error && meta.touched})}
			       type={type}
			       id={id}
			       {...field}
			/>
			<label className="form-check-label" htmlFor={id}>
				{field.value}
			</label>
		</>
	)
}

export default FormCheckbox;
