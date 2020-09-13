# HenryApp_grupo1.

- Se crea Repo en GitHub
- Se instala React en el front y todos los demas paquetes en el back (passport, express, sequelize, etc.)
- Se arma una estructura de carpetas


*RECORDAR crear el archivo .env debajo de api para poder conectarse a la base de datos.

Se cambia el nombre de la base de datos por "desarrollo"
Crear la BD en Postgress manualmente:
1.- CREATE DATABASE desarrollo;
2.- \c desarrollo; //nos conectamos a la BD


09/09/2020 - Usaremos Hooks completo.
useState --> para tener un estado interno dentro de una función. Es una función que devuelve un array con 2 elementos [estado, setEstado]
useEffect --> se ejecuta cada vez que hay una modificación en el estado. Cada vez que se haga un cambio en el componente. Como segundo parámetro,
recibirá mis dependencias, por lo gral es un array con estas dependencias.

useEffect( () => {
  document.title = name;
}, [name])
      |
      |_ dependencias. Sólo se va a ejecutar cuando cambie el "name".

* React-Form-Hooks --> para hacer los formularios para registrarse.

* Reducer en archivos separados.
* Crear carpetas para guardar los componentes de acuerdo a su funcionalidad.


10/09/2020

*Se crea el front para la página de HenryApp. Se utiliza https://marvelapp.com/ para hacerlo.
*Por otra parte, vamos a utilizar https://freefrontend.com/css-fire-animation/ para darle animación al cohete.

12/09/2020
*Se cambió la dirección de mail:
mail:HenryAppteam1@gmail.com
PASSWORD= Henry123App

*Passport: para la implementación ir a hhtp://npmjs.com/package/passport

Para ingresar a Elephant DB:
universoverde.henry@gmail.com 
Password: HenryAppG01


* 11/09/2020 se sube las rutas de cohortes put/post/get junto al form de crear cohortes
y modificar, con las  funciones. Se crea actions y reducer de este.
se conecta al dashboard el componente crear cohortes

* 12/09/2020 -se crea ruta put para asignar cohortes a un estudiante,
-se crea ruta put para asignar grupos a un estudiante,
-se crea ruta delete de cohortes
-Se conecta al dashboard funcion de ver todos los estudiantes y todos los cohortes
-el componente modificar cohorte tiene la opcion de eliminar
-se crea componentes dque muestran todos los estudiantes (falta darle estilo adecuado)
-se crea componente todos los cohortes(falta darle estilo adecuado)


