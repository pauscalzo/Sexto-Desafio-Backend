# Desafío 6 Back End

Voy a ir punto por punto mostrando lo solicitado:

### 1) Utilización de Passport Local para Login y Signup utilizando bcrypt para el hasheo de contraseñas.




#### Capturas desde el Navegador

a - SignUp para registrarse:
![App Screenshot](https://www.entropiadigital.com.ar/IMG/Captura%20de%20pantalla%202024-03-15%20115041.png)

b - Una vez registrado con éxito redirige al login:

![App Screenshot](https://www.entropiadigital.com.ar/IMG/Captura%20de%20pantalla%202024-03-15%20115100.png)

c - Una vez realizado con éxito el login se redirige a productos:

![App Screenshot](https://www.entropiadigital.com.ar/IMG/Captura%20de%20pantalla%202024-03-15%20115111.png)

d - En la base de datos vemos el nuevo usuario con la contraseña encriptada:

![App Screenshot](https://www.entropiadigital.com.ar/IMG/Captura%20de%20pantalla%202024-03-15%20115205.png)




### 2) Utilización de Passport Github.

a - En el signup clickeamos el boton para registrarnos con Github:

![App Screenshot](https://www.entropiadigital.com.ar/IMG/Captura%20de%20pantalla%202024-03-15%20115041.png)

b - Nos redirige a Github y completamos los datos:

![App Screenshot](https://www.entropiadigital.com.ar/IMG/Captura%20de%20pantalla%202024-03-15%20115301.png)

c - se registra con éxito y se redirige a productos:

![App Screenshot](https://www.entropiadigital.com.ar/IMG/Captura%20de%20pantalla%202024-03-15%20115334.png)

d - Podemos ver 2 users ahora en la base de datos (uno registrado con passport local y otro con pasport github):

![App Screenshot](https://www.entropiadigital.com.ar/IMG/Captura%20de%20pantalla%202024-03-15%20115347.png)

e - Podemos ver la sesión abierta del usuario de Github. (del anterior ya había cerrado la sesión):

![App Screenshot](https://www.entropiadigital.com.ar/IMG/Captura%20de%20pantalla%202024-03-15%20115357.png)





