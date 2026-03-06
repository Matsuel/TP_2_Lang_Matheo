import mongoose from "mongoose";
import type { Request, Response } from "express";
import { create, getAll, getById, remove, update } from "../models/usersModel";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const { role, search } = req.query;
        const users = await getAll(
            typeof role === 'string' ? role : undefined,
            typeof search === 'string' ? search : undefined
        );

        const response = {
            success: true,
            count: users.length,
            data: users,
        };
        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            success: false,
            message: 'Une erreur est survenue lors de la récupération des utilisateurs',
        });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const { _id } = req.params;
    if (!_id) {
        return res.status(400).json({ success: false, message: 'ID de l\'utilisateur requis' });
    }
    if (!mongoose.isValidObjectId(_id)) {
        return res.status(400).json({ success: false, message: 'ID invalide' });
    }

    try {
        const user = await getById(_id as string);
        if (!user) {
            return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ success: false, message: 'Erreur lors de la récupération de l\'utilisateur' });
    }
};

export const createUser = async (req: Request, res: Response) => {
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
    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(409).json({ success: false, message: 'Un utilisateur avec cet email existe déjà' });
        }
        res.status(500).json({ success: false, message: 'Erreur lors de la création' });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { _id } = req.params;
    if (!mongoose.isValidObjectId(_id)) {
        return res.status(400).json({ success: false, message: 'ID invalide' });
    }

    const { name, email, role } = req.body;

    try {
        const updatedUser = await update(_id as string, { name, email, role });
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
        }
        res.status(200).json({ success: true, data: updatedUser });
    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(409).json({ success: false, message: 'Un utilisateur avec cet email existe déjà' });
        }
        console.error('Error updating user:', error);
        res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour' });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { _id } = req.params;
    if (!mongoose.isValidObjectId(_id)) {
        return res.status(400).json({ success: false, message: 'ID invalide' });
    }

    try {
        const deleted = await remove(_id as string);
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ success: false, message: 'Erreur lors de la suppression' });
    }
}