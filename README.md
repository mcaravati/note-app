# Note-App
A simple CLI note app to discover Node.JS.

## Requirements
This program requires the following modules:
 - [yargs](https://www.npmjs.com/package/yargs)
 - fs
 
## Usage
```bash
$ node index.js --help
  index.js [command]
  
  Commands:
    index.js add     Adds a new note
    index.js remove  Removes a note
    index.js list    List all the stored notes
    index.js read    Displays entirely a note
  
  Options:
    --help     Show help                                                 [boolean]
    --version  Show version number                                       [boolean]
```
- Adding a note
```bash
$ node index.js add --title="A note title" --body="A note body"
  [+] Adding a new note ...
  [+] Note added !
```
- Removing a note
```bash
$ node index.js remove --title="A note title"
  [-] Removing note ...
  [+] Note removed !
```
- Listing all notes
```bash
$ node index.js list
  [*] Notes:
  - Groceries
  - Apple pie recipe
```
- Reading a note
```bash
$ node index.js read --title="Groceries"
  
  # Groceries
  - Apples
  - Flour
  - Eggs
```

## Attributions
Icon made by Freepik from [FlatIcon](https://www.flaticon.com)