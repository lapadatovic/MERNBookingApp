import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import { UserType } from '../shared/types';

// Create SCHEMA
const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
})

// If we change something, we wanna check if password is changed 
// before we 'save' document we wanna hash our password if password is changed
userSchema.pre('save', async function (next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next(); 
});


// create MODEL
const User = mongoose.model<UserType>("User", userSchema);

export default User;