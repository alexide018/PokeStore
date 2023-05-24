# Next.js PokeStore App
Para correr localmente, se necesita la base de datos.
```
docker-compose up -d
```

* El -d significa __detached__

* MongoDB URL Local:
```
mongodb://localhost:27017/pokestoredb
```

## Configurar las variables de entorno
Renombrar el archivo __.env.templete__ a __.env__