import mongoose from "mongoose";


/**
 * 0=Disoneccted
 * 1=Connected
 * 2=Connecting
 * 3=Disconnecting
 */

const mongoConnection = {
    isConnected: 0
}

export const connect = async () => {
    if (mongoConnection.isConnected) {
        console.log('Ya estaba conectado')
        return
    }

    if (mongoose.connections.length > 0) {
        mongoConnection.isConnected = mongoose.connections[0].readyState;


        if (mongoConnection.isConnected) {
            console.log('Usando conexión existente')
            return
        }

        await mongoose.disconnect()
    }
    await mongoose.connect(process.env.MONGO_URL || '')
    mongoConnection.isConnected = 1;
    console.log('Conectado a:', process.env.MONGO_URL)

}


export const disconnect = async () => {
    if (mongoConnection.isConnected === 0) return;

    if (process.env.NODE_ENV==='development') return;
    await mongoose.disconnect()
    console.log('Desconectando de MongoDB')
}