import mongoose, { Document, Schema } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const mongodb_password = Bun.env.MONGODB_PASSWORD;
const mongodb_user = Bun.env.MONGODB_USER;
export async function startConnection() {
    const string = 'mongodb+srv://'+mongodb_user+':'+mongodb_password+'@your-url-here/';
    console.log(string);
    let db = await mongoose.connect(string, {});
    console.log('Database is connected');
    return db;
}
const db = startConnection();
export default db;

const UserTokenSchema = new Schema({
    email: String,
    token: String,
    createdAt: Date,
});
const UserTokenModel = mongoose.model('UserToken', UserTokenSchema);

export async function auth(email: string, token: string) {
    return await UserTokenModel.findOne({ email, token });
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

const StatsSchema = new Schema({
    email: String,
    tokens: Number,
    a_tokens: Number,
});

const StatsModel = mongoose.model('Stats', StatsSchema);

export async function getStatsUser(email: string) {
    return await StatsModel.findOne({ email });
}
export async function add_tokens_usage(user: string, tokens: number): Promise<any>{
    const stats = await getStatsUser(user);
    try{
        if (stats && stats.a_tokens !== undefined) {
            stats.a_tokens -= tokens;
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
        if (stats && stats.a_tokens && stats.tokens !== undefined) {
            stats.a_tokens = 0;
            stats.tokens = 0;
            await stats.save();
        }
    }
    catch(error){
        console.log(error);
    }
    return stats;
}
