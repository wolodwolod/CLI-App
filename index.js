const argv = require("yargs").argv;

const {
    listContacts,
    getContactById,
    removeContact,
    addContact } = require("./contacts");

  
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
          const contactList = await listContacts();
          console.log(contactList);
      break;

    case "get":
      const contactById = await getContactById(id);
          console.log(contactById);
      break;

    case "add":
      const addedContact = await addContact(name, email, phone);
          console.log(addedContact);
      break;

    case "remove":
      const removedContact = await removeContact(id);
          console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);