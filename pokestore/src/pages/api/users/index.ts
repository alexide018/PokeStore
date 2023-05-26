import type { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../../models/User';
import { db } from '../../../../database';

type Data = {
}


export default async function (req: NextApiRequest, res: NextApiResponse<Data>) {
    
    const { method, body } = req;

    switch (method) {
        case 'GET':

            try {

                await db.conexion();
                const user = await User.find();
                console.log(user);
                await db.desconexion();
                return res.status(200).json(user);

            } catch (error) {
                
                return res.status(500).json({ error: error });

            }

        case 'POST':

            try {
                
                await db.conexion();
                const newUser = new User(body);
                const savedUser = await newUser.save();
                return res.status(201).json(savedUser);

            } catch (error) {
                
                return res.status(500).json({ error: error });

            }
    
        default:
            return res.status(400).json({ msg: "Este metodo no es soportado" });
    }
     
}