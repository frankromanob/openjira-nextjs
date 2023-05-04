import { db } from '@/database';
import { Entry, IEntry } from '@/models';
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =
    | { message: string }
    | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { id } = req.query;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'El Id no es válido ' + id })
    }

    switch (req.method) {
        case 'PUT':
            return updateEntry(req, res);
        case 'GET':
            return findEntry(req, res);

        default:
            return res.status(400).json({ message: 'Metodo no válido ' });
    }

}

const findEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query;

    await db.connect()

    const entryToFind = await Entry.findById(id);

    if (!entryToFind) {
        await db.disconnect()
        return res.status(400).json({ message: 'Id no existe: ' + id })
    }


    await db.disconnect()
    return res.status(200).json(entryToFind)

}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query;

    await db.connect()

    const entryToUpdate = await Entry.findById(id);

    if (!entryToUpdate) {
        await db.disconnect()
        return res.status(400).json({ message: 'Id no existe: ' + id })
    }


    const {
        status = entryToUpdate.status,
        description = entryToUpdate.description
    } = req.body

    try {
        entryToUpdate.description = description
        entryToUpdate.status = status
        await entryToUpdate.save()
        await db.disconnect()
        return res.status(201).json(entryToUpdate)
    } catch {
        await db.disconnect()
        return res.status(400).json({ message: 'Cannot update' })
    }
}


