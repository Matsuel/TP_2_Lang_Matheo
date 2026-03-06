import mongoose from "mongoose";
import users from "../data/users";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

export default User;

export const getAll = (role?: string) => {
    let filteredUsers = users;

    if (role) {
        filteredUsers = users.filter(user => user.role === role);
    }

    return filteredUsers;
}

export const getById = (id: number) => {
    return users.find(user => user.id === id);
}

export const create = (data: { name: string; email: string }) => {
    const { name, email } = data;

    const newUser = {
        id: users.length + 1,
        name,
        email,
        role: 'user',
        createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    return newUser;
}

export const update = (id: number, data: { name?: string; email?: string, role?: string }) => {
    const user = getById(id);
    if (!user) {
        return null;
    }

    if (data.name) {
        user.name = data.name;
    }
    if (data.email) {
        user.email = data.email;
    }
    if (data.role) {
        user.role = data.role;
    }
    return user;
}

export const remove = (id: number) => {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
        return false;
    }
    users.splice(index, 1);
    return true;
};