import React from "react";
import {v4 as uuidv4} from "uuid";
import classNames from "classnames";
import {FormikValues} from "formik";

const stateAbbreviations: string[] = [
	'AL', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA',
	'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA',
	'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC',
	'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
	'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

const stateSelectOptions = stateAbbreviations.map(e => <option key={uuidv4()}>{e}</option>);

const StatePicker = ({formik}: FormikValues) =>
		<div className="mb-3 col">
			<label className="form-label" htmlFor="state">State</label>
			<select id="state"
			       {...formik.getFieldProps("state")}
			        className={classNames("form-select form-select-lg", {"is-invalid": formik.errors.state && formik.touched.state})}>
				<option/>
				{stateSelectOptions}
			</select>
			<div className="invalid-feedback">{formik.errors.email}</div>
		</div>

export default StatePicker;