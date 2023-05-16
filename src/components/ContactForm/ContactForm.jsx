import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from 'redux/selectors';
import { addContact } from 'redux/contactsSlice';
import { Formik } from 'formik';
import { object, string} from 'yup';
import { nanoid } from 'nanoid';
import { Container, Wrapper, Label, Input, ErrorMsg, Btn } from './ContactForm.styled';

const numberRegex =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;
const nameRegex = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const numberMessage = `Phone number must be digits and can contain spaces, dashes, parentheses and can start with +`;
const nameMessage = `Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan`;

let schema = object({
  name: string()
    .matches(nameRegex, {
      message: nameMessage,
      excludeEmptyString: true,
    })
    .required(),
  number: string()
    .matches(numberRegex, {
      message: numberMessage,
      excludeEmptyString: true,
    })
    .required(),
});

const initialValues = {
    id: '',
    name: '',
    number: '',
};

export const ContactForm = () => {
  const dispatch = useDispatch();
    const contacts = useSelector(getContacts);
    
    const onSubmit = (values, { resetForm }) => {
    const newContact = {
      id: 'id-' + nanoid(),
      name: values.name,
      number: values.number,
        };
        
    if (contacts.find(contact => contact.name === newContact.name)) {
      alert(`${newContact.name} is already in contacts`);
    }

        
    dispatch(addContact(newContact));
    resetForm();
    };
    
    return (
        <>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={schema}>
                <Container>
                    <Wrapper>
                        <Label htmlFor="name">Name:</Label>
                        <Input name="name" type="text" id="name" />
                        <ErrorMsg name="name" component="div" />
                    </Wrapper>
                    <Wrapper>
                        <Label htmlFor="number">Number:</Label>
                        <Input name="number" type="tel" id="number" />
                        <ErrorMsg name="number" component="div" />
                    </Wrapper>
                    <Btn type="submit">Add contact</Btn>
                </Container>
            </Formik>
        </>
    );
};

