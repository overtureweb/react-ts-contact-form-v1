import React from "react";
import classNames from "classnames";
import {ErrorMessage, FormikValues, useField} from "formik";
import {v4 as uuidv4} from "uuid";

const stateAbbreviations: string[] = [
	'AL', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA',
	'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA',
	'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC',
	'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
	'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

const FormStatePicker: React.FC<FormikValues> = ({name}) => {
	const [field, meta] = useField(name)
	return (
		<>
			<label className="form-label" htmlFor={field.name}>State</label>
			<select id={field.name}
			        {...field}
			        className={classNames("form-select form-select-lg", {"is-invalid": meta.error && meta.touched})}>
				<option/>
				{stateAbbreviations.map(state => <option key={uuidv4()}>{state}</option>)}
			</select>
			<ErrorMessage component="div" name={field.name} className="invalid-feedback"/>
		</>
	)
}

export default FormStatePicker;
