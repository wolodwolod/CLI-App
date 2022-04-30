const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");
// console.log(contactsPath)

async function listContacts() {
  const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    // console.log(contacts)
    return contacts;
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    if (!result) {
        return null;
    }
    // console.log(result);
    return result;
}
// getContactById("1")

async function removeContact(contactId) {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId);
    if(idx === -1){
        return null;
    }
    const [result] = contacts.splice(idx, 1);
     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
}
// removeContact("342ix1zjgo6X7yvfg6HvY");


async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}
// addContact("Mango", "mango@gmail.com", "322-22-22");
// listContacts()

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}