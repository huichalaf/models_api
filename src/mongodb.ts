import mongoose, { Document, Schema } from 'mongoose';
//cargamos variables de entorno
import dotenv from 'dotenv';
dotenv.config();
//funcion para crear una conexion
export async function startConnection() {
    let db = await mongoose.connect('mongodb://localhost:27017/', {});
    console.log('Database is connected');
    return db;
}
const db = startConnection();
export default db;
//creamos el esquema de la base de datos, usuario
const UserSchema = new Schema({
    name: String,
    email: String,
    password: String
});
const UserModel = mongoose.model('User', UserSchema);
export async function createUser(name: string, email: string, password: string) {
    const user = new UserModel({ name, email, password });
    return await user.save();
}
export async function getUsers() {
    return await UserModel.find();
}
export async function getUser(email: string) {
    return await UserModel.findOne({ email });
}
export async function updateUser(id: string, name: string, email: string, password: string) {
    return await UserModel.findByIdAndUpdate(id, { name, email, password });
}
export async function deleteUser(id: string) {
    return await UserModel.findByIdAndDelete(id);
}
export async function auth(email: string, password: string) {
    return await UserModel.findOne({ email, password });
}
export async function auth_user(body: string){
    const user = body.split("&")[0].split("=")[1];
    const pass = body.split("&")[1].split("=")[1];
    const status = await auth(user, pass);
    if(status === null || status === undefined){
        return false;
    }
    return true;
}
//creamos el esquema de la base de datos, estadisticas de uso del usuario
const StatsSchema = new Schema({
    user: String,
    query: Number,
    response: Number,
    total_credits: Number,
    available_credits: Number,
    models: Array
});

const StatsModel = mongoose.model('Stats', StatsSchema);

export async function createStats(user: string, query: number, response: number, models: Array<string>, total_credits: number, available_credits: number) {
    const stats = new StatsModel({ user, query, response, models });
    return await stats.save();
}
export async function getStats() {
    return await StatsModel.find();
}
export async function getStatsUser(user: string) {
    return await StatsModel.findOne({ user });
}
export async function updateStats(id: string, user: string, query: number, response: number, models: Array<string>) {
    return await StatsModel.findByIdAndUpdate(id, { user, query, response, models });
}
export async function deleteStats(id: string) {
    return await StatsModel.findByIdAndDelete(id);
}