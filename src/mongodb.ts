import mongoose, { Document, Schema } from 'mongoose';
//cargamos variables de entorno
import dotenv from 'dotenv';
dotenv.config();
//funcion para crear una conexion
const mongodb_password = Bun.env.MONGODB_PASSWORD;
const mongodb_user = Bun.env.MONGODB_USER;
export async function startConnection() {
    const string = 'mongodb+srv://'+mongodb_user+':'+mongodb_password+'@serverlessinstance0.oo6ew3r.mongodb.net/';
    console.log(string);
    let db = await mongoose.connect(string, {});
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
    console.log(body);
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
    response: Number,
    total_credits: Number,
    available_credits: Number,
    models: Array
});

const StatsModel = mongoose.model('Stats', StatsSchema);

export async function createStats(user: string, models: Array<string>, total_credits: number, available_credits: number) {
    const stats = new StatsModel({ user, models, total_credits, available_credits });
    return await stats.save();
}
export async function getStats() {
    return await StatsModel.find();
}
export async function getStatsUser(user: string) {
    return await StatsModel.findOne({ user });
}
export async function add_tokens_usage(user: string, tokens: number): Promise<any>{
    const stats = await getStatsUser(user);
    try{
        if (stats && stats.available_credits !== undefined) {
            stats.available_credits -= tokens;
            await stats.save();
        }
    }
    catch(error){
        console.log(error);
    }
    return stats;
}
export async function add_tokens_credit(user: string, tokens: number): Promise<any>{
    const stats = await getStatsUser(user);
    try{
        if (stats && stats.available_credits && stats.total_credits !== undefined) {
            stats.total_credits += tokens;
            stats.available_credits += tokens;
            await stats.save();
        }
    }
    catch(error){
        console.log(error);
    }
    return stats;
}

export async function set_to_cero(user: string): Promise<any>{
    const stats = await getStatsUser(user);
    try{
        if (stats && stats.available_credits && stats.total_credits !== undefined) {
            stats.available_credits = 0;
            stats.total_credits = 0;
            await stats.save();
        }
    }
    catch(error){
        console.log(error);
    }
    return stats;
}

export async function deleteStats(id: string) {
    return await StatsModel.findByIdAndDelete(id);
}