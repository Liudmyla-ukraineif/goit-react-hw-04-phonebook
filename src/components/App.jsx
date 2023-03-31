import { useState, useEffect } from "react";
import ContactForm from "./ContactForm/form";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import { nanoid } from "nanoid";

const initalContacts = [
  {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
  {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
  {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
  {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
];

export default function App() {
  const [contacts, setContacts] = useState(JSON.parse(window.localStorage.getItem('contacts')) ?? initalContacts);
  const [filter, setFilter] = useState('');

  useEffect(()=>{
    //* зберегти в LocalStorage
    return window.localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])
  
  const handleSubmitForm = ( data ) => {
    const isDuplicate = contacts.some((contact) => contact.name === data.name) 
    if (isDuplicate) {
      alert(`${data.name} is already in contacts`)
    } else {
      const newContact = {
      id: nanoid(10), ...data
      };

      setContacts(()=>[newContact, ...contacts ])
    }
  }
  
  const handleChangeFilter = ({target}) => {    
    setFilter( target.value )
  }

  const deleteContact = (id) => {
    const filteredContacts = contacts.filter((contact) => contact.id !== id)
    setContacts( filteredContacts )
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm getSubmit={handleSubmitForm} />

      <h2>Contacts</h2>
      <Filter onChangeFilter={handleChangeFilter} value={filter} />
      <ContactList contacts={contacts} filter={filter} deleteContact={deleteContact} />
    </div>      
  )
}


