import React from 'react';
import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";
import Filter from "../components/Filter";



export const ContactsPage = () => {
  return (
      <section>
    <div className="border rounded-md w-[500px] h-[500px] mx-auto my-10 p-8">
      <h1 className="text-green-500 font-bold text-[25px] text-center">Записник контактів</h1>
      <ContactForm />
      <h2 className="text-green-500 font-semibold text-[20px] text-center mt-2">Контакти</h2>
    <Filter />
      <ContactList />
    </div>
    </section>
  );
};
export default ContactsPage