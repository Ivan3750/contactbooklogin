import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact, fetchContacts } from "../redux/contactsSlice";
import { MdAccountCircle } from "react-icons/md";
import {selectFilter, selectItems} from "../redux/selectors"
const ContactList = () => {
  const { items, isLoading, error } = useSelector(selectItems);
  const filterValue = useSelector(selectFilter);
  console.log(items, filterValue)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filtered = items.filter(contact =>
    contact.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  if (isLoading) return <p>Loading contacts...</p>;
if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <ul className="space-y-3 mt-4">
      {filtered.map(({ id, name, number }) => (
        <li
          key={id}
          className="bg-white p-4 rounded-xl flex items-center justify-between transition border"
        >
          <div className="flex items-center space-x-3">
            <MdAccountCircle className="text-[40px] text-blue-500" />
            <div>
              <p className="text-lg font-semibold text-gray-800">{name}</p>
              <p className="text-sm text-gray-500">{number}</p>
            </div>
          </div>
          <button
            className="bg-red-500 hover:bg-red-600 transition text-white rounded-full px-4 py-1 text-sm font-medium"
            onClick={() => dispatch(deleteContact(id))}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
