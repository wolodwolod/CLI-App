// console.log(__dirname);
// const yargs = require("yargs").argv;
// const { hideBin } = ("yargs/helpers");
const argv = require("yargs").argv;

const {
    listContacts,
    getContactById,
    removeContact,
    addContact } = require("./contacts");

    // getContactById("1")
// addContact("Mango", "mango@gmail.com", "322-22-23");
// listContacts()

// console.log(process.argv)



// TODO: рефакторить
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