import { useEffect } from "react";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import { getProcessorsThunk, createPhoneThunk } from "./../../store/slices/phonesSlice";
import styles from './PhoneForm.module.sass';

function PhoneForm({processors, getProcessors, createPhone}) {
  const initialValues = {
    model: '',
    brand: '',
    yearOfManufacture: '',
    ramSize: '',
    screenDiagonal: '',
    isNfc: false,
    processorId: processors[0]?.id ?? '',
  };

  const handleSubmit = (values, formikBag) => {
    createPhone(values)
    formikBag.resetForm();
  };

  useEffect(() => {
    getProcessors();
  }, []);

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {formikProps => (
          <Form className={styles.form}>
            <label>
            <span>Model:</span>
            <Field className={styles.input} name="model" type="text" placeholder="model..." autoFocus />
          </label>
          <label>
            <span>Brand:</span>
            <Field className={styles.input} name="brand" type="text" placeholder="brand..." />
          </label>
          <label>
            <span>Year:</span>
            <Field className={styles.input} name="yearOfManufacture" type="date" />
          </label>
          <label>
            <span>Ram size:</span>
            <Field className={styles.input} name="ramSize" type="number" placeholder="8" />
          </label>
          <label>
            <span>Screen diagonal:</span>
            <Field className={styles.input} name="screenDiagonal" type="number" step="0.1" placeholder="5.6" />
          </label>
          <label>
            <span>NFC:</span>
            <Field className={styles.checkbox} name="isNfc" type="checkbox"/>
          </label>
          <label>
            <span>Processor:</span>
            <select className={styles.select} name="processorId" value={formikProps.values.processorId} onChange={formikProps.handleChange}>
              {processors.map(pr => <option key={pr.id} value={pr.id}>{pr.model}</option>)}
            </select>
          </label>
          <button className={styles.addBtn} type="submit">Add phone</button>
          </Form>
        )}
      </Formik>
    </>
  )
}

const mapStateToProps = ({phonesData: {processors}}) => ({processors});

const mapDispatchToProps = dispatch => ({
  getProcessors: () => dispatch(getProcessorsThunk()),
  createPhone: (values) => dispatch(createPhoneThunk(values)),
})

export default connect(mapStateToProps, mapDispatchToProps) (PhoneForm);