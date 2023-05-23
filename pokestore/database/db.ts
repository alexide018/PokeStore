// Manejo de conexion de la base de datos

import mongoose from "mongoose";

/**
 * 0 = disconnected
 * 1 = connnected
 * 2 = connecting
 * 3 = disconnecting
 */

// Conexion comienza en 0 por defecto
const mongooConnection = {
    isConnected: 0
}

// Establecer conexion 
// 'async' le dice a la funcion que las peticiones no se realizan en el mismo momento
// y llegan a tardarse 
export const connect = async() => {
    
    // Si ya esta conectado -> termina
    if ( mongooConnection.isConnected ) {
        console.log('Ya estabamos conectados');
        console.log(mongooConnection.isConnected)
        return;
    }

    // Si existe una conexion se ocupa esa conexion
    if ( mongoose.connections.length > 0 ) {

        mongooConnection.isConnected = mongoose.connections[0].readyState;

        if ( mongooConnection.isConnected === 1 ) {
            console.log('Usando conexion anterior');
            return;
        }

        // 'await' permite hacer que se espere la funcion a ejecutar la linea y despues la ejecuta
        // Si esta conectado lo desconecta
        await mongoose.disconnect();
    }

    // conexion a base de datos local 'process.env.MONGO_URL' = URL
    await mongoose.connect(process.env.MONGO_URL || '');

    // Cambia estado a conectado (1)
    mongooConnection.isConnected = 1;
    console.log('Conectado a MongoDB:', process.env.MONGO_URL)

}

// Funcion que permite desconectarce
export const disconnect = async() => {

    // Si esta en desarrollo se termina proceso
    if ( process.env.NODE_ENV === 'development' ) return;
    
    // Si esta desconectado se termina el proceso
    if ( mongooConnection.isConnected == 0 ) return;

    // Desconexion de la BD
    await mongoose.disconnect();
    console.log('Desconectado de MongoDB')

}