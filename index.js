const yargs = require("yargs");
const file_system = require("fs");
const {output_file} = require("./config/config.json");

yargs.version("1.0.0");

yargs.command({
    command: 'add',
    describe: 'Adds a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (arguments) => {
        console.log("[+] Adding a new note ...");
        const note = {key: undefined, title: arguments.title, body: arguments.body};
        file_system.readFile(output_file, (error, data) => {
            if (!error) {
                const notes = JSON.parse(data);
                notes.notes.push(note);
                const prepared_note = JSON.stringify(notes);
                file_system.writeFile(output_file, prepared_note, () => {
                    console.log("[+] Note added !");
                })
            } else {
                console.error(`[-] An error occurred while adding a note: ${error}`);
            }
        })
        console.log(`[*] Output: ${note}`);
    }
});

yargs.argv