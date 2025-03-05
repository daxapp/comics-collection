import { useState } from 'react';
import * as Yup from 'yup';
import {Form, Field, Formik, ErrorMessage as FormikErrorMessage} from 'formik'
import './findChar.scss'
import useMarvelService from '../../services/MarvelService';
import { Link } from 'react-router-dom';



const FindChar = () => {
    const [nameChar, setNameChar] = useState(null);
    const [isNotCorrectName, setIsNotCorrectName] = useState(false)
    const {loading, clearError, getCharacterByName} = useMarvelService();

    const request = (name) => {
        getCharacterByName(name)
            .then(onLoaded)
            .catch(isCorrect)
    }

    const onLoaded = (char) => {
        clearError();
        setIsNotCorrectName(false)

        setNameChar(char);
    }

    const isCorrect = () => {
        setIsNotCorrectName(true)
    }


    const notFoundMessage = isNotCorrectName ? <p className='form__message form__error'>The character was not found. Check the name and try again</p> : null;

    const viewCharFound = !isNotCorrectName && !loading && nameChar ? 
        <div className='form__wrap'>
            <p className='form__message form__succses'>There is! Visit {nameChar.name} page</p>
            <Link to={`/character/${nameChar.id}`}>
                <button className="button button__secondary">
                    <div className="inner">TO PAGE</div>
                </button>
            </Link>

        </div> : null;

    return (
        <Formik
            initialValues={{
                nameChar: ''
            }}
            validationSchema={Yup.object({
                nameChar: Yup.string()
                             .required('This field is required')
            })}
            onSubmit={values => {request(values.nameChar)}}>
            <Form className='form'>
                <label 
                    htmlFor="nameChar"
                    className='form__label'  
                    >Or find a character by name:</label>
                <Field
                    type="text" 
                    name='nameChar'
                    className='form__input'
                    placeholder='Enter name'/>
                <button 
                    className='button button__main form__button'
                    type='submit'
                    disabled={loading}><div className="inner">FIND</div></button>
                {notFoundMessage}
                {viewCharFound}
                <FormikErrorMessage className='form__message form__error' name="nameChar" component='p' ></FormikErrorMessage>
            </Form>
        </Formik>
    )
}

export default FindChar;