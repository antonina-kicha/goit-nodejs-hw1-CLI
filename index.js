const {
    listContacts,
    getContactById,
    removeContact,
    addContact
} = require('./contacts');

const { Command } = require("commander");
const program = new Command();
program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    console.log("action", action);
    switch (action) {
        case "list":
            const contactsList = await listContacts();
            console.table(contactsList);
            break;

        case "get":
            const contact = await getContactById(id);
            console.log(contact);
            break;

        case "add":
            const newContact = await addContact(name, email, phone);
            console.log(newContact);
            break;

        case "remove":
            const listContactsUpdate = await removeContact(id);
            console.table(listContactsUpdate);
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv);