import React from 'react';
import './style.css';
import { Formik, Form, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';

const MyTextField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  return (
    <>
      <label>
        {label}
        <input
          className={`${meta.touched && meta.error && 'is-invalid'}`}
          {...field}
          {...props}
        />
      </label>
      <ErrorMessage component="div" name={field.name} className="error" />
    </>
  );
};

function App() {
  const validate = Yup.object({
    name: Yup.string()
      .max(15, 'Name cannot be longer than 15 characters')
      .required(),
    email: Yup.string().email('Invalid Email').required(),
    age: Yup.number()
      .max(100, 'Age cannot exceed 100')
      .positive()
      .integer()
      .required(),
    designation: Yup.string().required(),
    company: Yup.string().required(),
  });

  return (
    <div className="App">
      <Formik
        initialValues={{
          name: '',
          email: '',
          age: '',
          designation: '',
          company: '',
        }}
        validationSchema={validate}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {() => (
          <Form className="form-container">
            <MyTextField name="name" type="text" label="Name" />
            <MyTextField name="email" type="text" label="Email" />
            <MyTextField name="age" type="number" label="Age" />
            <MyTextField name="designation" type="text" label="Designation" />
            <MyTextField name="company" type="text" label="Company" />
            <div>
              <button type="submit">Submit</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;
