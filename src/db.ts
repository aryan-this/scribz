import mongoose, { model, Schema} from 'mongoose';
import 'dotenv/config'
const db_url = process.env.db_connect
//@ts-ignore
mongoose.connect(db_url)
const UserSchema = new Schema({
    username: {type: String, unique: true},
    password: String
})

export const UserModel = model("Users", UserSchema)


const contentTypes: string[]= ['image', 'video', 'article', 'audio'];
const ContentSchema = new Schema({
    title: {type: String, required: true},
    type: { type: String, enum: contentTypes, required: true},
    link: {type: String, required: true},
    tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
    userId: {type: mongoose.Types.ObjectId, ref: 'Users'}
})

export const ContentModel = model('Content', ContentSchema);