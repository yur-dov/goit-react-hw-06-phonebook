import React from 'react';
import {ContactForm} from './ContactForm/ContactForm';
import {FilterForm} from './FilterForm/FilterForm'
import {ContactList} from './ContactList/ContactList'
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, setFilter, getContact, getFilter } from '../redux/contactSlice';
import css from './App.module.css'

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContact);
  const filter = useSelector(getFilter);

  const addNewContact = object => {
    const contactName = contacts.map(contact => contact.name);
    if (contactName.includes(object.name)) {
      alert(`${object.name} is already in contacts.`);
    } else {
      dispatch(increment(object));
    }
  };

  const deleteContact = contactId => {
    dispatch(decrement(contactId));
  };

  const onFilterChange = event => {
    const value = event.currentTarget.value;
    dispatch(setFilter(value));
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>PhoneBook</h1>
      <div className={css.add_contact}>
        <h2 className={css.title_add}>Add Contact</h2>
        <ContactForm addNewContact={addNewContact} />
        <h2 className={css.title_search}>Search contact</h2>
        <FilterForm onChange={onFilterChange} />
      </div>
      <div className={css.contacts}>
         <h2 className={css.title_contact}>Contacts</h2>
        <ContactList contacts={getFilteredContacts()} deleteContact={deleteContact} />
      </div>
    </div>
  );
};
