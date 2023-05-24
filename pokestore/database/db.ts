import mongoose from "mongoose";

const mongooConexion = {
    conectado: 0
}

const url = process.env.MONGO_URL;

export const conexion =async () => {
    
    if ( mongooConexion.conectado ) {
        console.log('Ya estabamos conectados');
        return;
    }

    if ( mongoose.connections.length > 0 ) {

        mongooConexion.conectado = mongoose.connections[0].readyState;

        if ( mongooConexion.conectado === 1 ) {
            console.log('Usando conexion anterior');
            return;
        }

        await mongoose.disconnect();

    }

    await mongoose.connect( url || '');

    mongooConexion.conectado = 1;
    console.log('Conectado a MongoDB', url)
}

export const desconexion = async () => {
    
    if ( process.env.NODE_ENV === 'development' ) return;

    if ( mongooConexion.conectado == 0 ) return;

    await mongoose.disconnect();
    console.log('Desconectado de MongoDB')
    
}