const fs = require('fs');
const path = require('path');

class JsonModel {
    constructor(name) {
        this.name = name;
        this.pk = 'id';
        this.dataDir = '../data/';
        this.dataPath = path.resolve(__dirname, this.dataDir , this.name + '.json');
    }

    /** Lee el archivo JSON */
    readJsonFile() {
        let fileContents = fs.readFileSync(this.dataPath, 'utf-8');
        if (fileContents) {
            return JSON.parse(fileContents);
        }
        return [];
    }

    /** Escribe el archivo JSON */
    writeJsonFile(data) {
        let jsonData = JSON.stringify(data, null, ' ');
        fs.writeFileSync(this.dataPath, jsonData);
    }

    /** Genera el próximo valor para la clave primaria */
    generatePk() {
        let items = this.readJsonFile();
        let lastItem = items.pop();
        
        if(lastItem) {
            return ++lastItem[this.pk];
        }

        return 1;
    }
    
    /** Trae todos los documentos */
    all() { return this.readJsonFile() }

    /** Trae un documento por su valor de clave primaria */
    find(value) {
        let items = this.readJsonFile();
        return items.find((item) => item[this.pk] == value)
    }

    /** Guarda el documento en la colección */
    save(item) {
        let items = this.readJsonFile();
        item[this.pk] = this.generatePk();
        items.push(item);

        this.writeJsonFile(items);

        return item[this.pk];
    }
}

module.exports = JsonModel;