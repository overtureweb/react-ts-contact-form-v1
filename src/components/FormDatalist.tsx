import React from "react";
import {ErrorMessage, FormikValues, useField} from "formik";
import classNames from "classnames";

interface FormSelectProps extends FormikValues {
	listData: any[];
	label: string;
	name: string;
	type: string;
}

const FormDatalist: React.FC<FormSelectProps> = ({label, type, listData, ...props}) => {
	const [field, meta] = useField(props.name);
	const datalistOptions: JSX.Element[] | any = listData.map((listItem, i) =>
		<option
			key={`listItem-${i}`}
			value={listItem}/>);
	return (
		<>
			<label htmlFor={field.name} className="form-label">{label}</label>
			<input id={field.name}
			       list={`${field.name}-list`}
			       type={type}
			       {...field}
			       className={classNames("form-control form-control-lg", {"is-invalid": meta.error && meta.touched})}/>
			<ErrorMessage component="div" name={field.name} className="invalid-feedback"/>
			<datalist id={`${field.name}-list`}>
				{datalistOptions}
			</datalist>
		</>
	);
}

export default FormDatalist;