import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/usersController";

const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:_id', getUserById);
userRouter.post('/', createUser);
userRouter.put('/:_id', updateUser);
userRouter.delete('/:_id', deleteUser);


export default userRouter;