import css from './ContactFind.module.css'
import { nanoid } from "nanoid";
import { useSelector, useDispatch } from 'react-redux';
import { getValueFilter } from '../../redux/selectors';
import { setFilter } from '../../redux/filterSlice';

export const ContactFind = () => {
    const dispatch = useDispatch();
    const find = useSelector(getValueFilter);
    const inputId = nanoid();
    return (
      <>
        <label className={css.find_label} htmlFor={inputId}>
          Find contacts by name
        </label>
        <input
          id={inputId}
          className={css.find_input}
          type="text"
          name="find"
          value={find}
          placeholder="Find name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={e => {
            dispatch(setFilter(e.target.value));
          }}
        />
      </>
    );
};
