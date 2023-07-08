import { nanoid } from "nanoid";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import css from './ContactForm.module.css'
import { addContacts } from "redux/contactsSlice";
import { getContacts } from "redux/selectors";

const nameInputId = nanoid();
const numberInputId = nanoid();

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const listContacts = useSelector(getContacts);

  // Отвечает за обновление состояния
  const handleChange = evt => {
    switch (evt.target.name) {
      case 'name': setName(evt.target.value);
        break;
      case 'number': setNumber(evt.target.value);
        break;
      default: return;
    }
  };

  // Вызывается при отправке формы
  const handleSubmit = evt => {
    evt.preventDefault();
    const data = {
      name: name,
      number: number,
    };
    if (listContacts.some(item => item.name === data.name)) {
      alert('This contact has already been added.');
      return;
    }
    dispatch(addContacts(data));
    setName('');
    setNumber('');
  };
  
  return (
    <form className={css.contactForm} onSubmit={handleSubmit}>
      <label htmlFor={nameInputId} className={css.labelForm}>Name</label>
      <input
        id={nameInputId}
        className={css.labelInput}
        type="text"
        name="name"
        value={name}
        placeholder="Enter name"
        // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={handleChange}
      />
      <label htmlFor={numberInputId} className={css.labelForm}>Number</label>
      <input
        id={numberInputId}
        className={css.labelInput}
        type="tel"
        name="number"
        value={number}
        placeholder="Enter phone number"
        // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={handleChange}
      />
      <button className={css.btnForm} type="submit">Add contact</button>
    </form>
  );
};