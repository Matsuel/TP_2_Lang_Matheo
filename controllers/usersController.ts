import mongoose from "mongoose";
import type { Request, Response, NextFunction } from "express";
import { create, getAll, getById, remove, update } from "../models/usersModel";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { role, search } = req.query;
        const users = await getAll(
            typeof role === 'string' ? role : undefined,
            typeof search === 'string' ? search : undefined
        );
        res.status(200).json({ success: true, count: users.length, data: users });
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params as { _id: string };
    if (!_id) {
        return res.status(400).json({ success: false, message: 'ID de l\'utilisateur requis' });
    }
    if (!mongoose.isValidObjectId(_id)) {
        return res.status(400).json({ success: false, message: 'ID invalide' });
    }

    try {
        const user = await getById(_id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: 'Le nom et l\'email sont requis pour créer un utilisateur',
        });
    }

    try {
        const newUser = await create({ name, email });
        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params as { _id: string };
    if (!mongoose.isValidObjectId(_id)) {
        return res.status(400).json({ success: false, message: 'ID invalide' });
    }

    const { name, email, role } = req.body;

    try {
        const updatedUser = await update(_id, { name, email, role });
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
        }
        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params as { _id: string };
    if (!mongoose.isValidObjectId(_id)) {
        return res.status(400).json({ success: false, message: 'ID invalide' });
    }

    try {
        const deleted = await remove(_id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}