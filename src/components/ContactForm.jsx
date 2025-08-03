import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../redux/contactsSlice";
import { selectItems } from "../redux/selectors";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { items } = useSelector(selectItems)
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();

    const isExist = items.some(contact => contact.name.toLowerCase() === name.toLowerCase());
    if (isExist) {
      alert(`${name} вже є у контактах`);
      return;
    }

dispatch(addContact({ name, number: phone }));

    setName("");
    setPhone("");
  };

  return (
    <form className="flex flex-col gap-3 mt-4" onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Ім’я"
        required
        type="text"
        className="border border-gray-300 rounded-md p-2 "
      />
      <input
        value={phone}
        onChange={e => setPhone(e.target.value)}
        placeholder="Номер телефону"
        required
        type="tel"
        className="border border-gray-300 rounded-md p-2  "
      />
      <button
        type="submit"
        className="rounded-md bg-green-500 hover:bg-green-600 text-white py-2 transition"
      >
        Додати контакт
      </button>
    </form>
  );
};

export default ContactForm;
