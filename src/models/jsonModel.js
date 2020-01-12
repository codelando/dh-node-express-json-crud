const fs = require('fs');
const path = require('path');

class JsonModel {
    constructor(name) {
        this.name = name;
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
            return ++lastItem.id;
        }

        return 1;
    }
    
    /** Trae todos los documentos */
    all() { return this.readJsonFile() }

    /** Trae un documento por su valor de clave primaria */
    find(value) {
        let items = this.readJsonFile();
        return items.find((item) => item.id == value)
    }

    /** Guarda el documento en la colección */
    save(item) {
        let items = this.readJsonFile();
        item.id = this.generatePk();
        items.push(item);

        this.writeJsonFile(items);

        return item.id;
    }

    /** Actualiza el documento en la colección */
    update(item) {
        let items = this.readJsonFile();
        
        let updatedItems = items.map((currentItem) => {
            if (currentItem.id == item.id) {
                return currentItem = item;
            }
            return currentItem;
        });
        
        this.writeJsonFile(updatedItems);

        return item.id;
    }
}

module.exports = JsonModel;