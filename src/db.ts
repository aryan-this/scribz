import mongoose, { model, Schema} from 'mongoose';
mongoose.connect('mongodb+srv://aryanggmu:aryansfirstdb@firstdb.wcy5pfy.mongodb.net/scribz')
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