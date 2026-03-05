import type { Request, Response } from "express";
import { create, getAll, getById, remove, update } from "../models/usersModel";

export const getAllUsers = (req: Request, res: Response) => {
    const { role } = req.query;
    const users = getAll(typeof role === 'string' ? role : undefined);

    const response = {
        success: 'true',
        count: users.length,
        data: users,
    };
    res.status(200).json(response);
};

export const getUserById = (req: Request, res: Response) => {
    const userId = parseInt(req.params.id as string, 10);
    const user = getById(userId);

    if (user) {
        res.status(200).json({
            success: 'true',
            data: user,
        });
    } else {
        res.status(404).json({
            success: 'false',
            message: 'Utilisateur non trouvé',
        });
    }
};

export const createUser = (req: Request, res: Response) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({
            success: 'false',
            message: 'Le nom et l\'email sont requis pour créer un utilisateur',
        });
    }

    const existingUser = getAll().find(u => u.email === email);
    if (existingUser) {
        return res.status(409).json({
            success: 'false',
            message: 'Un utilisateur avec cet email existe déjà',
        });
    }

    const newUser = create({ name, email });
    res.status(201).json({
        success: 'true',
        data: newUser,
    });
}

export const updateUser = (req: Request, res: Response) => {
    const userId = parseInt(req.params.id as string, 10);
    const userIndex = getById(userId);
    if (!userIndex) {
        return res.status(404).json({
            success: 'false',
            message: 'Utilisateur non trouvé',
        });
    }

    const { id, createdAt, ...allowedUpdates } = req.body;

    if (Object.keys(allowedUpdates).length === 0) {
        return res.status(400).json({
            success: 'false',
            message: 'Aucun champ valide fourni pour la mise à jour',
        });
    }

    const updatedUser = update(userId, allowedUpdates);

    if (updatedUser) {
        res.status(200).json({
            success: 'true',
            data: updatedUser,
        });
    } else {
        res.status(404).json({
            success: 'false',
            message: 'Utilisateur non trouvé',
        });
    }
}

export const deleteUser = (req: Request, res: Response) => {
    const userId = parseInt(req.params.id as string, 10);
    const success = remove(userId);

    if (success) {
        res.status(204).json({
            success: 'true',
            message: 'Utilisateur supprimé avec succès',
        });
    } else {
        res.status(404).json({
            success: 'false',
            message: 'Utilisateur non trouvé',
        });
    }
}