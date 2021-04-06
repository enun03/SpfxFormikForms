import * as React from 'react';
import styles from './FormikForm.module.scss';
import { IFormikFormProps } from './IFormikFormProps';
import { Container, Row, Col } from 'react-grid-system';
import { withFormik } from 'formik';
import * as Yup from 'yup';

const ValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .required('No password provided.') 
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
});

// Our inner form component which receives our form's state and updater methods as props
const InnerForm = ({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => 

  <div>
    <Container>
      <form onSubmit={handleSubmit}>
        <Row>
          <Col sm={6}>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={values.email}
            />
            {touched.email && errors.email && <div>{errors.email}</div>}
          </Col>
          <Col sm={6}>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={values.password}
            />
            {touched.password && errors.password && <div>{errors.password}</div>}
          </Col>
        </Row>

        <Row>
          <Col sm={12}>
            <button type="submit" disabled={isSubmitting}>Submit</button>
          </Col>
        </Row>      
        
      </form>
    </Container>
  </div>
 
// Wrap our form with the using withFormik HoC
const MyForm = withFormik({
  // Transform outer props into form values
  mapPropsToValues: props => ({ email: '', password: '' }),
  // Add a custom validation function (this can be async too!)
  // validate: (values, props) => {
  //   let errors: any = {}
  //   if (!values.email) {
  //    errors.email = 'Required'
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //    errors.email = 'Invalid email address'
  //   }
  //   return errors
  // },
  validationSchema: ValidationSchema,
  // Submission handler
  handleSubmit: (values, { props, setSubmitting, setErrors, /* setValues, setStatus, and other goodies */ }) => {
    console.log('Form Submitted:', values);
    setSubmitting(false);
  }
})(InnerForm)



export default class FormikForm extends React.Component<IFormikFormProps, any> {
  constructor(props) {
    super(props);
  }

  public render(): React.ReactElement<IFormikFormProps> {
    return(
      <div>
        <h1>My Form</h1>
        <MyForm />
      </div >
    );
  }
}
