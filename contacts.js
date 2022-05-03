const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");


async function updateContacts(contacts) {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

async function listContacts() {
    try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);    
    return contacts;
    } catch (error) {
       console.log(error) 
    }  
};

async function getContactById(contactId) {
    try {
        const contacts = await listContacts();
    const result = contacts.find(item => item.id == contactId);
    if (!result) {
        return "Contact not found";
        }   
    console.log(result)    
    return result;
    } catch (error) {
        console.log(error) 
    }    
};
// getContactById(5)
async function removeContact(contactId) {
    try {
        const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id == contactId);
    if(idx === -1){
        return "Contact not found";
    }
    const [result] = contacts.splice(idx, 1);
     await updateContacts(contacts);
    return result;
    } catch (error) {
        console.log(error) 
    }
    
};

async function addContact(name, email, phone) {
    try {
        const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
    } catch (error) {
        console.log(error) 
    }    
};


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};