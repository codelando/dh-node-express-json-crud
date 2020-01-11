# CRUD de productos basado en JSON hecho con Node

## Pasos

### Iniciando el proyecto
1. Creamos el directorio e iniciamos el proyecto de node `npm init`.
2. Instalamos las librerías que vamos a estar utilizando, de momento Express y EJS `npm i express ejs`.
3. Creamos la carpeta **src** donde irá nuestro código.
4. Creamos el archivo **app.js** dentro de **src**, dentro requerimos Express e inicializamos un servidor con el método **listen()**.

Corremos la aplicación y verificamos que el servidor corra correctamente.

### [Opcional] Creamos los scripts para correr la aplicación
1. Instalamos **nodemon** como dependencia de desarrollo `npm i nodemon --save-dev`
2. Agregamos el script de inicio normal `"run": "node src/app.js"`
3. Agregamos el script de inicio para desarrollo `"rundev": "npx nodemon src/app.js -e js,ejs"`
Como vamos a trabajar con JSON y no queremos que nodemon reinicie la aplicación cada vez que los modifiquemos, le decimos que sólo mire las extensiones js y ejs.

### [Opcional] Preparamos el proyecto para utilizar GIT
1. Inicializamos el repositorio
2. Creamos el archivo **.gitignore** e incluimos el directorio de **node_modules/**

### Configuración de Express y vistas iniciales
1. Creamos nuestra carpeta de vistas **src/views** con un archivo **index.ejs** que servirá de página principal.
2. Configuramos Express para que utilice **EJS** como motor de plantillas y para que tome nuestra carpeta **src/views** como fuente de plantillas.
3. Creamos una ruta que carge nuestra página principal con el método **render()**.

Verificamos que el servidor levante las vistas de EJS correctamente.

**--- Fin del commit 1 ---**

### Estructura MVC, rutas y controladores
1. Creamos nuestra carpeta de rutas **src/routes** y un archivo **static.js**, que servirá para todas las páginas estáticas
2. Creamos nuestra carpeta de controladores **src/controllers** y un archivo **staticController.js** que implementará la funcionalidad de las rutas anteriores.
3. Creamos el método **index** en nuestro controllador que renderizará la plantilla de la página principal.
5. Creamos la ruta que responda a la raiz de nuestro sitio **/** e implementamos el método anterior
6. Reemplazamos la ruta de nuestro archivo **app.js** por nuestro nuevo archivo de rutas.

Verificamos que el servidor siga levantando las vistas de EJS correctamente.

### Parciales y vistas adicionales
1. Creamos la carpeta de vistas parciales **views/partials** que utilizaremos para los componentes de las vistas.
2. Separamos el header y el footer en archivos parciales. 
3. Los implementamos en nuestra vista con la directiva **include** de EJS
4. Creamos vistas adicionales e implementamos la misma estructura. 
    - Rutas
    - Métodos del controlador
    - Parciales de EJS

Verificamos que el servidor responda a las nuevas rutas.

### Recursos estáticos
1. Creamos la carpeta **public** donde pondremos nuestros recursos estáticos.
2. Creamos la carpeta **public/css** y un archivo **main.css** donde escribiremos algunos estilos básicos para nuestro sitio.
3. Configuramos Express para que tome la carpeta **public** como fuente de contenido estático.
4. Implementamos la hoja de estilo en nuestro parcial **head.ejs**

Verificamos que el servidor haya tomado los estilos correctamente.

**--- Fin del commit 2 ---**
