import { Request, Response } from 'express'
import { getRepository, getConnection } from 'typeorm'

import User from '../models/User'

class UserController {
    async store(req: Request, res: Response) {
        const repository = getRepository(User);

        const { name, username, email, password, city, uf, age } = req.body;

        const userExists = await repository.findOne({ where: { email } })

        if (userExists) {
            return res.sendStatus(409);
        }

        const data = {
            name, username, email, password, city, uf, age

        }

        console.log(data)

        const user = repository.create(data)
        await repository.save(user)

        return res.json(user);

    }
    async delete(req: Request, res: Response) {
        const repository = getRepository(User);

        const id = req.params.id;

        const userExists = await repository.findOne({ where: { id } })

        console.log(req.params)

        if (!userExists) {
            return res.sendStatus(404);

        }
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(User)
            .where("id = :id", { id })
            .execute();

        console.log('Deletado')
        res.send(`Usuario com ID ${req.params.id} foi deletado.`);
    }

    async list(req: Request, res: Response) {
        try {
            const courses_all = await getRepository(User).find();
            return res.status(200).json({
                message: "Sucesso ao buscar todos os usuarios.",
                data: courses_all,
            });
        } catch (error) {
            return res.status(400).json({
                message: "Falha ao buscar os usuarios..",
                info: error,
            });
        }
    }
    async listOne(req: Request, res: Response) {
        const { username } = req.params;
        try {
            const user = await getRepository(User).findOne(username);
            return res.status(200).json({
                message: "Get course operation success.",
                data: user,
            });
        } catch (error) {
            return res.status(401).json({
                message: "get courses operation failed, try agaain.",
                info: error,
            });
        }
    }
    async update(req: Request, res: Response) {
        const { name, username, email, password, city, uf, age } = req.body;
        console.log(req.body)
        const dados = {
            name, username, email, password, city, uf, age
        }
        const id = req.params;
        try {
            const courses_update = await getRepository(User).update(
                id,
                dados
            );
            return res.status(200).json({
                message: "Update operation success.",
                data: courses_update,
            });
        } catch (error) {
            return res.status(400).json({
                message: "Update operation failed, try again.",
                info: error,
            });
        }
    }


}




export default new UserController();