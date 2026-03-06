import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    createdAt: { type: Date, default: Date.now }
}, { versionKey: false });

const User = mongoose.model('User', userSchema);

export default User;

export const getAll = async (role?: string, search?: string) => {
    const filter: Record<string, unknown> = {};
    if (role) filter.role = role;
    if (search) filter.name = new RegExp(search, 'i');
    return User.find(filter);
}

export const getById = async (id: string) => {
    return User.findById(id);
}

export const create = async (data: { name: string; email: string; role?: string }) => {
    return User.create(data);
}

export const update = async (id: string, data: { name?: string; email?: string; role?: string; _id?: unknown; createdAt?: unknown }) => {
    const { _id, createdAt, ...safeData } = data;
    return User.findByIdAndUpdate(id, safeData, { returnDocument: 'after', runValidators: true });
}

export const remove = async (id: string) => {
    const result = await User.findByIdAndDelete(id);
    return result !== null;
};