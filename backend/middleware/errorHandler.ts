import type { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = 'AppError';
    }
}

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    if (err.name === 'AppError') {
        return res.status(err.status).json({ success: false, message: err.message });
    }

    if (err.name === 'ValidationError') {
        return res.status(400).json({ success: false, message: err.message });
    }

    if (err.code === 11000) {
        return res.status(409).json({ success: false, message: 'Un utilisateur avec cet email existe déjà' });
    }

    res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
};

export default errorHandler;
