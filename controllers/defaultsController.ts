import type { Request, Response } from "express";

export const defaultController = (req: Request, res: Response) => {
    res.redirect('https://www.google.com/search?q=do+a+barrel+roll');
}