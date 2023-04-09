const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require("nanoid");


const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath, "utf-8");
        const parsedData = JSON.parse(data);
        // console.table(parsedData);
        return parsedData;
    }
    catch (e) {
        console.log(e);
    }
};

async function getContactById(contactId) {
    try {
        const data = await listContacts();
        const contactById = data.find(contact => contact.id === contactId);
        return contactById;
    }
    catch (e) {
        console.log(e);
    }
}

async function removeContact(contactId) {
    try {
        const data = await listContacts();
        const filterData = data.filter(contact => contact.id !== contactId);
        await fs.writeFile(contactsPath, JSON.stringify(filterData), "utf8");
        return filterData;
    }
    catch (e) {
        console.log('error', e);
    }
}


async function addContact(name, email, phone) {
    const data = await listContacts();
    const newContact = {
        id: nanoid(), name, email, phone
    };
    data.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(data), "utf8");
    return newContact;
}


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}