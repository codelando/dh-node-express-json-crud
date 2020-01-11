# CRUD de productos basado en JSON hecho con Node

## Pasos

**Iniciando el proyecto**
1. Creamos el directorio e iniciamos el proyecto de node `npm init`.
2. Instalamos las librerías que vamos a estar utilizando, de momento Express y EJS `npm i express ejs`.
3. Creamos la carpeta **src** donde irá nuestro código.
4. Creamos el archivo **app.js** dentro de **src**, dentro requerimos Express e inicializamos un servidor con el método **listen()**.

Corremos la aplicación y verificamos que el servidor corra correctamente.

**[Opcional] Creamos los scripts para correr la aplicación**
1. Instalamos **nodemon** como dependencia de desarrollo `npm i nodemon --save-dev`
2. Agregamos el script de inicio normal `"run": "node src/app.js"`
3. Agregamos el script de inicio para desarrollo `"rundev": "npx nodemon src/app.js -e js,ejs"`
Como vamos a trabajar con JSON y no queremos que nodemon reinicie la aplicación cada vez que los modifiquemos, le decimos que sólo mire las extensiones js y ejs.

**[Opcional] Preparamos el proyecto para utilizar GIT**
1. Inicializamos el repositorio
2. Creamos el archivo **.gitignore** e incluimos el directorio de **node_modules/**

**Estructura MVC y vistas iniciales**
1. Creamos nuestra carpeta de vistas **src/views** con un archivo **index.ejs** que servirá de página principal.
2. Configuramos Express para que utilice **EJS** como motor de plantillas y para que tome nuestra carpeta **src/views** como fuente de plantillas.
3. Creamos una ruta que carge nuestra página principal con el método **render()**.

Corremos la aplicación y verificamos que el servidor levante las vistas de EJS correctamente.

[Fin del commit 1]