import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../../../models/User';
import { db } from '../../../../database';

type Data = {
}

export default async function (req: NextApiRequest, res: NextApiResponse<Data>) {
    
    const { method, body, query: { id } } = req;

    switch (method) {
        case 'GET':
            
            try {
                
                db.conexion();
                const user = await User.findById( id );
                if ( !user ) return res.status(400).json({ msg: "Usuario no encontrado" });
                db.desconexion();
                return res.status(200).json(user);

            } catch (error) {
                
                res.status(500).json({ msg: error });

            }

        case 'PUT':
            
            try {
                
                db.conexion();
                const updatedUser = await User.findByIdAndUpdate( id, body, { new: true } );
                if ( !updatedUser ) return res.status(4400).json({ msg: "Usuario no encontrado" });
                db.desconexion();
                return res.status(200).json( updatedUser );

            } catch (error) {

                return res.status(500).json({ msg: error });

            }

        case 'DELETE':

            try {
                
                db.conexion();
                const deletedUser = await User.findByIdAndDelete( id );
                if ( !deletedUser ) return res.status(400).json({ msg: "Usuario no encontrado" });
                db.desconexion();
                return res.status(204).json(deletedUser);

            } catch (error) {
                
                return res.status(500).json({ msg: error });

            }
    
        default:
            break;
    }

}