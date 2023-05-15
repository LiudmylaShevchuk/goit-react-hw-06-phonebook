import PropTypes from 'prop-types';
import { Contacts, ContactItem, Name, Number, Btn} from './ContactList.styled';

export const ContactList = ({ contacts, deleteContact }) => { 
    return (
        <>
            <Contacts>{contacts.map(({ id, name, number }) => { 
                return (
                    <ContactItem key={id}>
                        <Name>{name}</Name>
                        <Number>{number}</Number>
                        <Btn type="button" onClick={ () => deleteContact(id)}>Delete</Btn>
                    </ContactItem>
                );
            })}
            </Contacts>
        </>
    )
};

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
    deleteContact: PropTypes.string.isRequired,
};