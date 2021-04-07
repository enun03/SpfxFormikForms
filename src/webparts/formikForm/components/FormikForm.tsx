import * as React from "react";
import styles from "./FormikForm.module.scss";
import { IFormikFormProps } from "./IFormikFormProps";
import { Container, Row, Col } from "react-grid-system";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton } from 'office-ui-fabric-react';

export default class FormikForm extends React.Component<IFormikFormProps, any> {
  constructor(props) {
    super(props);

    this.state = {
      values: {
        email: "",
        password: "",
      }
    }
  }

  public ValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });

  public render(): React.ReactElement<IFormikFormProps> {
    return (
      <div>
        <h3>My Form</h3>
        <Formik
          initialValues = {this.state.values}

          validationSchema = {this.ValidationSchema}

          onSubmit = {(values, { setSubmitting, setErrors /* setValues and other goodies */ }) => {
            console.log(values);
            this.setState({values});
            setSubmitting(false);
          }}

          render = {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <div>
              <Container>
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col sm={6}>
                      <TextField
                        type="email"
                        name="email"
                        label="Email"
                        value={values.email}
                        onChanged={(newValue) => (values.email = newValue)}
                        errorMessage={errors.email}
                        required
                      />
                    </Col>
                    <Col sm={6}>
                      <TextField 
                        label="Password" 
                        type="password" 
                        name="password"
                        onChanged={(newValue) => (values.password = newValue)}
                        errorMessage={errors.password}
                        canRevealPassword
                        required
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12}>
                      <PrimaryButton 
                        text="Submit" 
                        type="submit" 
                        disabled={isSubmitting}
                        style={{marginTop: '1rem'}}
                      />
                    </Col>
                  </Row>
                </form>
              </Container>
            </div>
          )}
        />
      </div>
    );
  }
}
