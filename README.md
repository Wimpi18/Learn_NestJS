# **1. Introducción a NestJS**
## **Crear un Nuevo Proyecto**
### `nest new proyect-name` <br>
A partir del anterior comando se nos genera 5 archivos relevantes:
- **Controller.-** Un controlador con una sola ruta.
- **Spec controller.-** Las pruebas unitarias para el controlador.
- **Module.-** El módulo raiz de la aplicación, encapsula servicios, controladores y otros para poder utilizarlos en otros módulos. Es parecido pero no igual al package de Java.
- **Service.-** Un servicio básico con un único método.
- **Main.-** El archivo de entrada de la aplicación que utiliza la función central *NestFactory* para crear una instancia de aplicación Nest. Incluye una función *async* llamada *bootstrap* que arrancará nuestra aplicación.

## **¿Qué es un Decorador?**
Es una función que agrega metadatos o funcionalidad extra a una clase, propiedad o método. Existen los decoradores de clases, métodos y propiedades.

## **Arrancar Nuestra Aplicación**
Para arrancar una sola ver: `npm run start` <br>
Para recompilar y recargar automaticamente tras cada cambio guardado: `npm run start:dev`

## **¿Qué es Async y Await?** <br>
**Async.-** El término asíncrono se refiere a una situación en la que dos o más eventos no ocurren al mismo tiempo. La palabra clave *async* se añade a las funciones para que devuelvan una promesa en lugar de un valor directamente.<br>
**Await.-** No funciona fuera de una función *async*<br>

## **Códigos de Estado HTTP**
Los códigos de estado de respuesta HTTP indican si se ha completado satisfactoriamente una solicitud HTTP específica. Las respuestas se agrupan en cinco clases:
1. **Respuestas informativas (100–199)**
   - ***100 - Continue :*** Esta respuesta provisional indica que todo hasta ahora está bien y que el cliente debe continuar con la solicitud o ignorarla si ya está terminada.
   - ***101 - Switching protocol :*** Indica que el servidor acepta el cambio de protocolo propuesto por el agente de usuario.
2. **Respuestas satisfactorias (200–299)**
    - ***200 - OK :*** Como la solicitud se ha realizado correctamente, el resultado se transmite en forma de página web como respuesta. <br>
    - ***201 - Created :*** La solicitud ha tenido éxito y se ha creado un nuevo recurso como resultado de ello. Se envía después de un *PUT* <br>
    - ***202 - Accepted :*** La solicitud se ha recibido, pero aún no se ha actuado. Está pensado para los casos en que otro proceso o servidor maneja la solicitud, o para el procesamiento por lotes <br>
    - ***203 - Non-Authoritative information :*** La petición se ha completado con éxito, pero su contenido no se ha obtenido de la fuente originalmente solicitada, sino que se recoge de una copia local o de un tercero. <br>
    - ***204 - No content :*** La petición se ha completado con éxito pero su respuesta no tiene ningún contenido. <br>
    - ***205 - Reset content :*** La petición se ha completado con éxito, pero su respuesta no tiene contenidos y además, el agente de usuario tiene que inicializar la página desde la que se realizó la petición. <br>
    - ***206 - Partial content :*** La petición servirá parcialmente el contenido solicitado. <br>
3. **Redirecciones (300–399)**
   - ***301 - Redirección permanente :*** Es un mensaje automático cuando nos mudamos de URL. <br>
   - ***302 - Found :*** El servidor recibe una solicitud de un documento y devuelve la respuesta de que el documento ha sido encontrado. <br>
   - ***303 - See other :*** Se suele utilizar como una dirección temporal, es decir, la dirección antigua sigue siendo válida. <br>
   - ***307 - Redirección temporal :*** La diferencia principal con la redirección 303 es que el navegador debe seguir el mismo método que en la solicitud original *(POST -> POST)*. <br>
4. **Errores de los clientes (400–499)**
   - ***404 - Not found :*** El navegador nos indica que la URL ya no existe. <br>
   - ***410 - Gone :*** Este código señala que el documento ya no está disponible y que ha sido eliminado de forma permanente. <br>
5. **Errores de los servidores (500–599)**
   - ***500 - Error intento del servidor :*** Este error no especificado proviene del servidor y se muestra tanto al usuario, al navegador como incluso al bot de los buscadores. <br>
   - ***503 - Objeto no encontrado :*** Se mostrará si el servidor no está disponible temporalmente. En ocasiones el servidor se cae debido a extremas sobrecargas del dominio. <br>

## **Métodos HTTP**
**POST.-** <br>
**GET.-** <br>
**PUT.-** <br>
**PATCH.-** <br>
**DELETE.-** <br>

# **2. TypeORM**
## **Concepto**
Es una ORM que puede correr en NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms y puede ser usada con TypeScript and JavaScript (ES5, ES6, ES7, ES8). TypeORM soporta los patrones Active Record y Data Mapper.
## **¿Qué es ORM?**
*Object Relational Mapped* es una pieza que nos permite interactuar con nuestra BDD mediante POO sin necesidad de conocer SQL.
## **Características**
- Entidades y columnas
- Tipos de columnas específicas de la BDD
- Repositorios y repositorios personalizados
- Relaciones
- Admite múltiples patrones de herencia
- Cascades
- Índices
- Transacciones
- Migraciones
- Soporta MySQL / MariaDB / Postgres / CockroachDB / SQLite / Microsoft SQL Server / Oracle / SAP Hana / sql.js.
- Soporta MongoDB NoSQL database.
## **Entidades y Columnas**
**Entidad.-** Representa una tabla en una BDD, se puede cargar/insertar/actualizar/eliminar y realizar otras operaciones con ellas. <br>
**Columna.-** Representa los atributos de la entidad, el decorador ***@Column()*** puede llevar entre paréntesis diversas propiedades del atributo como su dominio o tipo. <br>
[Opciones de columna]([https://](https://typeorm.io/entities#column-options))
## **Data Source**
El DataSource de TypeORM mantiene la configuración de conexión a la base de datos y establece la conexión inicial a la base de datos.

***initialize.-*** Para establecer la conexión inicial / pool de conexiones.<br>
***destroy.-*** La desconexión (cierre de todas las conexiones del pool).

```typescript
import "reflect-metadata"
import { DataSource } from "typeorm"
import { Photo } from "./entity/Photo"

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "admin",
    database: "test",
    entities: [Photo],
    synchronize: true,
    logging: false,
})

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))
```
## **BaseEntity**
Le agrega/extienes métodos adicionales a nuestras clases Entity, teniendo acceso de forma abstracta para interactuar directamente con la base de datos.
## **[Ejemplo de TypeORM en Typescript]([https://](https://github.com/typeorm/typescript-example/tree/master/src))**


# **3. Autorización y Autenticación**
## **¿Qué es JWT?**
Es una abreviatura de JSON Web Token, lo cula nos devuelve un String encriptado que funciona como llave.
## **Enviroments**
## **Authentication Requirements**
```powershell
    $ npm install --save-dev @types/passport-local
    $ npm install passport-jwt
    $ npm install --save @nestjs/jwt
``` 
## **Implementando Estrategias Passport**
```powershell
    $ nest g module auth
    $ nest g service auth
``` 
## **Bcrypt**
## **Tipos de Tokens**
## **Passport**
## **Payload**

# **4. Tema**

# **. Typescript**

# **. Comandos Nest**
- Para crear de manera automática controladores, servicios, etc: `nest g <creación>` <br>