const yargs = require("yargs");
const file_system = require("fs");
const {output_file} = require("./config/config.json");

function init() {
    function generate_file() {
        const prepared_data = JSON.stringify({ notes: [] });
        file_system.writeFileSync(output_file, prepared_data);
        console.log(`[*] "${output_file}" generated, do not take care of the previous error`);
    }

    const data = file_system.readFileSync(output_file);
    try {
        const file_content = JSON.parse(data);
        if(!('notes' in file_content)) {
            generate_file();
        }
    } catch(error) {
        console.error(error);
        generate_file();
    }
}

init();

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
                const note_exists = (notes.notes.find(note => note.title === arguments.title) !== undefined);
                if(!note_exists) {
                    notes.notes.push(note);
                    const prepared_note = JSON.stringify(notes);
                    file_system.writeFile(output_file, prepared_note, () => {
                        console.log("[+] Note added !");
                    });
                } else {
                    console.error(`[-] Error: A note with the name "${arguments.title}" already exists`);
                }
            } else {
                console.error(`[-] An error occurred while reading the file: ${error}`);
            }
        })
        console.log(`[*] Output: ${note}`);
    }
});

yargs.command({
    command: 'remove',
    describe: 'Removes a note',
    builder: {
        title: {
            describe: 'The title of the note that you want to remove',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (arguments) => {
        console.error('[-] Removing note ...');
        file_system.readFile(output_file, (error, data) => {
            if(!error) {
                const notes = JSON.parse(data);
                const searched_note = notes.notes.find(note => note.title === arguments.title);
                if(searched_note) {
                    const note_index = notes.notes.indexOf(searched_note);
                    notes.notes.splice(note_index, 1);
                    const prepared_data = JSON.stringify(notes);
                    file_system.writeFile(output_file, prepared_data, () => {
                        console.log('[+] Note removed !');
                    });
                } else {
                    console.error(`[-] Error: The note "${arguments.title}" does not exist`);
                }
            } else {
                console.error(`[-] An error occurred while reading the file: ${error}`)
            }
        });
    }
});

yargs.command({
    command: 'list',
    describe: 'List all the stored notes',
    handler: () => {
        file_system.readFile(output_file, (error, data) => {
            if(!error) {
                const notes = JSON.parse(data).notes;
                if(notes.length > 0) {
                    console.log('[*] Notes:')
                    notes.forEach(note => console.log(`- ${note.title}`));
                } else {
                    console.error('[-] There is no notes to list');
                }
            }
        })
    }
});

yargs.command({
    command: 'read',
    describe: 'Displays entirely a note',
    builder: {
        title: {
            describe: 'The name of the note to display',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (arguments) => {
        file_system.readFile(output_file, (error, data) => {
            if(!error) {
                const notes = JSON.parse(data).notes;
                const note_to_display = notes.find(note => note.title === arguments.title);
                console.log(`\n# ${note_to_display.title}\n${note_to_display.body}\n`);
            } else {
                console.error(`[-] An error occurred while reading the file: ${error}`);
            }
        });
    }
});

yargs.argv
