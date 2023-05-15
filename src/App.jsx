import React from 'react';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import {ContactList } from 'components/ContactList/ContactList';
import { Container, Title, Subtitle} from './App.styled';

const LS_KEY = 'contacts';

export class App extends React.Component { 
    state = {
        contacts: [
        {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
        {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
        {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
        {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
        ],
        filter: '',
    };

    componentDidMount() { 
        const dataNumbers = localStorage.getItem(LS_KEY);

        if (dataNumbers) { this.setState({ contacts: JSON.parse(dataNumbers) }); }

    }

    componentDidUpdate() { 
        localStorage.setItem(LS_KEY, JSON.stringify(this.state.contacts));
    }

    onSubmit = data => { 
        this.setState(({ contacts }) => contacts.find(contact => contact.name === data.name) ? alert(`${data.name} is already in contacts`) : { contacts: [data, ...contacts] });
    };

    onFilter = e => { 
        const { value } = e.currentTarget;
        this.setState({ filter: value});
    };

    deleteContact = contactId => { 
        this.setState(prevState => ({
            contacts: prevState.contacts.filter(contact => contact.id !== contactId),
        }));
    };

    render() { 
        const { contacts, filter } = this.state;
        
        const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));

        return (
            <Container>
                <Title>Phonebook</Title>
                <ContactForm onSubmit={ this.onSubmit} />
                <Subtitle>Contacts</Subtitle>
                <Filter value={filter} onFilter={ this.onFilter} />
                <ContactList deleteContact={this.deleteContact} contacts={ filteredContacts} />
            </Container>
        );
    }
}
