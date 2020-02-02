# CRUD de productos basado en JSON hecho con Node

A continuación se describe el proceso de desarrollo de manera resumida.

Los cambios referentes a HTML o CSS no se mencionan ya que el foco está en el funcionamiento de la aplicación y el entendimiento de Node.

También se incluyen para mayor claridad las fuentes de datos que normalmente no estarían presentes en el repositorio.

## Pasos

La mayoría de los pasos o grupos de pasos se coinciden con los commits del repositorio, de manera que es posible traerlos uno a uno para ver la progresión de manera más evidente.

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

### Agregamos la entidad de productos
1. Repetimos los pasos anteriores para los **productos**
    - Archivo de rutas **routes/products.js**, de momento solo la ruta del listado **/**.
    - Archivo de controllador **controllers/productsController.js**, de momento sólo el método **index**.
    - Carpeta de vistas **views/products** con la vista del listado **index.ejs**.
    - Estilos básicos para la vista
    - **app.use()** en **src/app.js** con las rutas de productos.

**--- Fin del commit 3 ---**

### Colecciones de productos en formato JSON
1. Creamos la carpeta **src/data** donde pondremos nuestras colecciones en formato JSON.
2. Creamos el archivo **products.json** en la carpeta anterior, de momento con algunos productos agregados manualmente.
3. Creamos la carpeta **models** que guardará nuestros modelos, ellos interactuarán con las colecciones.
4. Creamos el modelo genérico para JSON **models/jsonModel.js**, en él tendremos dos métodos iniciales:
    - Lectura del archivo JSON
    - Traer todos los elementos
5. Actualizamos el controlador de productos para que utilize nuestro nuevo modelo y envíe los productos a la vista.
6. Actualizamos la vista para que muestre los productos de manera dinámica.

**--- Fin del commit 4 ---**

### Detalle de productos
1. Detalle de producto:
    - Modelo: método find()
    - Ruta: **/productos/:id** (GET)
    - Controlador: método **show()**
    - Vista: **products/detail.ejs**
    - Error: **products/404.ejs**
    
**--- Fin del commit 5 ---**

### Creación de productos
1. Como vamos a trabajar con formularios, necesitamos implementar dos middlewares de Express
    - express.urlencoded()
    - express.json()
2. Formulario de nuevo producto:
    - Ruta: **/productos/nuevo** (GET)
    - Controlador: método **create()**
    - Vista: **products/create.ejs**
3. Almacenamiento en la colección de productos
    - Modelo: método **generatePk()** y **save()**
    - Ruta: **/productos** (POST)
    - Controlador: método **store()**

**--- Fin del commit 6 ---**

### Edición de productos
1. Formulario de edición producto:
    - Ruta: **/productos/:id/editar** (GET)
    - Controlador: método **edit()**
    - Vista: **products/edit.ejs**
2. Almacenamiento en la colección de productos:
    - Modelo: método **update()**
    - Ruta: **/productos** (PUT)
    - Controlador: método **update()**
3. Como vamos a trabajar con métodos HTTP no soportados por el navegador (primero PUT y luego DELETE) necesitamos implementar un nuevo módulo:
    - `npm i method-override`
    - Lo requerimos en nuestro **src/app.js**
    - Lo implementamos como middleware de aplicación. `app.use(methodOverride('_method'));`
    - Lo implementamos en el formulario a través del query string del request `?_method=PUT`
4. Como gran parte del contenido del formulario se repite para creación y edicion, generamos un parcial para esa parte.

**--- Fin del commit 7 ---**

### Eliminación de productos
1. Eliminando en la colección de productos:
    - Modelo: método **destroy()**
    - Ruta: **/productos/:id** (DELETE)
    - Controlador: método **destroy()**
    - Vista: **products/detail.ejs**, formulario apuntando a la ruta correspondiente.

**--- Fin del commit 8 ---**

### Subida de archivos
1. Preparamos el formulario de productos para que pueda subir archivos:
    - Agregamos el campo de archivo `<input type="file" ... />`, en este caso cargaremos una imagen
    - Agregamos el atributo en codificación para el formulario **enctype="multipart/form-data"**
    - Creamos la carpeta donde guardaremos las imágenes **public/images/products/**
    - Agregamos una imagen por defecto para productos nuevos o sin imagen
2. Implementamos **multer** que nos servirá para procesar los archivos enviados:
    - `npm i multer`
    - Lo requerimos en nuestro archivo de rutas **src/routes/products.js**
    - Configuramos el almacenamiento en el disco rígido `const storage = multer.diskStorage({ ... });`
    - Ejecutamos multer `const upload = multer({ storage });`
    - Implementamos el middleware en las rutas que correspondan: **edit** y **update**
    - **Importante:** si trabajan en Mac o Linux, es posible que tengan que agregar permisos de escritura al directorio para poder subir archivos.
3. Sumamos el guardado de la imagen a los métodos **store** y **update**
    - En este caso el nombre de la imagen vendra en req.file.filename
    - Para considerar el caso en el que no nos llegue imagen, en el formulario de update sumamos un campo que guarde la imagen actual.
4. Sumamos la imagen al listado y detalle de productos.

**--- Fin del commit 9 ---**

### Entidad de usuarios
1. Implementamos la entidad de usuarios replicando la de productos
    - Rutas: **src/routes/user.js**
    - Controlador: **src/controllers/userController.js**
    - Vistas: **src/views/users/**
    - Directorio para imágenes: **public/images/users/**
    - Coleccion: **src/data/users.json**

**--- Fin del commit 10 ---**

### Login y perfil
1. Implementamos las vistas de registro (usamos el create que ya teníamos) y login
2. Implementamos las rutas correspondientes 
    - **/usuarios/login** (GET y POST)
    - **/usuarios/logout** (GET)
3. Implementamos en el modelo, el método que nos permitirá buscar usuarios por email (o cualquier otro campo)
4. Implementamos la encriptación de contraseñas
    - `npm i bcrypt`
    - Lo requerimos en el controlador de usuarios
    - Lo implementamos en el método **create**, `bcrypt.hashSync(...)`
    - Lo implementamos en el método **login**, `bcrypt.compareSync(...)`
5. Implementamos el uso de sesiones
    - `npm i express-session`
    - Lo requerimos en **src/app.js**
    - Lo inicializamos con la configuración mínima sugerida `{ secret..., resave..., saveUninitialized...}`
    - Creamos la sesión al hacer el login y guardamos los datos del usuario en ella.
    - Destruimos la sesión al hacer logout

**--- Fin del commit 11 ---**

### Middlewares de autenticación, rutas de huésped y rutas de usuario

1. Implementamos un middleware de autenticación
El middleware se encargará de verificar si existe un usuario en sesión y en ese caso hará disponible su información para las vistas.
    - Creamos la carpeta **src/middlewares**
    - Creamos el middleware **src/middlewares/auth**
    - Lo implementamos en **src/app.js**
    - Modificamos la barra de navegación para que muestre los enlaces que correspondan según el usuario esté logeado o no.
2. Implementamos dos middlewares para tener rutas de 
    - Creamos el middleware **src/middlewares/guestRoute**
        - Si un usuario accede a esta ruta, lo redirigimos
    - Creamos el middleware **src/middlewares/userRoute**
        - Si un huésped (alquien no logeado) accede a esta ruta, lo redirigimos
    - Los implementamos en **src/routes/users.js**

**--- Fin del commit 12 ---**

## Implementamos la funcionalidad de recordar al usuario

1. Implementamos el módulo de manejo de cookies
    - `npm i cookie-parser`
    - Lo requerimos en **src/app.js**
    - Lo inicializamos con **app.use(...)**
2. Implementamos la funcionalidad para recordar al usuario
    - Modelo
        - Implementamos el método para traer todos los registros por campo
    - Controlador
        - Utilizamos el modulo **crypto** para generar un token seguro
        - Creamos la cookie con el token si llega el campo **remember** durante el **login**
        - Destruimos la cookie y el documento durante el **logout**
    - Coleccion: **src/data/userTokens.json**
3. Modificamos nuestro middleware de autenticación para que detecte la cookie y loguee al usuario

**TODO:** Tal vez sería más prolijo a esta altura tener un controlador aparte para la autenticación. 

**--- Fin del commit 13 ---**
