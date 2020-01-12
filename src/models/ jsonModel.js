const fs = require('fs');
const path = require('path');

class JsonModel {
    constructor(name) {
        this.name = name;
        this.dataDir = '../data/';
        this.dataPath = path.resolve(__dirname, this.dataDir , this.name + '.json');
    }

    /* Lee el archivo JSON */
    readJsonFile() {
        let fileContents = fs.readFileSync(this.dataPath, 'utf-8');
        if (fileContents) {
            return JSON.parse(fileContents);
        }
        return [];
    };
    
    /** Trae todos los documentos */
    all() { return this.readJsonFile() }
}

module.exports = JsonModel;