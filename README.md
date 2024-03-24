# Segunda Práctica Integradora

Voy a ir punto por punto mostrando lo solicitado:

### 1) Creación de un modelo User que cuente con los siguientes campos: first_name, last_name, email, age, password, cart y role (default user). Para el Sigup utilicé passport local y para el Login passport JWT.

### 2) Desarrollar una estrategia current para extraer la cookie que contiene el token y poder acceder a la ruta /current.




#### Capturas desde el Navegador

a - SignUp para registrarse:
![App Screenshot](https://www.entropiadigital.com.ar/IMG/Captura%20de%20pantalla%202024-03-24%20183810.png)

b - Una vez registrado con éxito redirige al login:

![App Screenshot](https://www.entropiadigital.com.ar/IMG/Captura%20de%20pantalla%202024-03-24%20183830.png)

c - Login realizado con éxito:

![App Screenshot](https://www.entropiadigital.com.ar/IMG/Captura%20de%20pantalla%202024-03-24%20183841.png)

d - Vista en el navegador de current:

![App Screenshot](https://www.entropiadigital.com.ar/IMG/Captura%20de%20pantalla%202024-03-24%20183905.png)

e - Por consola imprimo el objeto del usuario creado. Puede observarse la contraseña hasheada, el cartId creado y el role por defecto user:

![App Screenshot](https://www.entropiadigital.com.ar/IMG/Captura%20de%20pantalla%202024-03-24%20184017.png)

f - También por consola imprimo el token y cómo se consulta el mismo desde las cookies para acceder a la ruta /current:

![App Screenshot](https://www.entropiadigital.com.ar/IMG/Captura%20de%20pantalla%202024-03-24%20184043.png)

g - Por último vemos como el usuario se creo con éxito en la base de datos:

![App Screenshot](https://www.entropiadigital.com.ar/IMG/Captura%20de%20pantalla%202024-03-24%20184142.png)




### 2) Capturas desde Postman.

a - SignUp para registrarse:

![App Screenshot](https://www.entropiadigital.com.ar/IMG/Captura%20de%20pantalla%202024-03-24%20184233.png)

b - Login:

![App Screenshot](https://www.entropiadigital.com.ar/IMG/Captura%20de%20pantalla%202024-03-24%20184258.png)

c - Ruta /current:

![App Screenshot](https://www.entropiadigital.com.ar/IMG/Captura%20de%20pantalla%202024-03-24%20184314.png)

d - Podemos ver la cookie con el token de este segundo usuario creado con Postman:

![App Screenshot](https://www.entropiadigital.com.ar/IMG/Captura%20de%20pantalla%202024-03-24%20190044.png)

e - Vemos como también se crea con éxito en la base de datos:

![App Screenshot](https://www.entropiadigital.com.ar/IMG/Captura%20de%20pantalla%202024-03-24%20184337.png)





