import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../config/db';
import User from '../models/usersModel';

const seedUsers = [
    { name: 'Alice Martin', email: 'alice@example.com', role: 'admin' },
    { name: 'Bob Dupont', email: 'bob@example.com', role: 'user' },
    { name: 'Charlie Bernard', email: 'charlie@example.com', role: 'user' },
];

async function seed() {
    await connectDB();

    const count = await User.countDocuments();
    if (count > 0) {
        console.log(`Collection non vide (${count} utilisateurs). Aucun insert effectué.`);
    } else {
        await User.insertMany(seedUsers);
        console.log(`3 utilisateurs insérés avec succès.`);
    }

    await mongoose.disconnect();
}

seed();
