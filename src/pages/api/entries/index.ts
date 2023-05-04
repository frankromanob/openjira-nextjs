import mongoose from "mongoose";

import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database/';
import { Entry, IEntry } from "@/models";

type Data =
    | { message: string }
    | IEntry[]
    | IEntry

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getEntries(res)
        case 'POST':
            return addEntry(req, res)
        case 'PUT':
            return addEntry(req, res)
        default:
            return res.status(400).json({ message: 'Endpoint no existe' })
    }

}

const getEntries = async (res: NextApiResponse<Data>) => {

    await db.connect()

    const entries = await Entry.find().sort({ createdAt: 'ascending' })
    await db.disconnect()
    res.status(200).json(entries)
}

const addEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {


    const { description = '' } = req.body
    const entry = new Entry({
        description,
        createdAt: Date.now()
    })

    try {
        await db.connect()
        await entry.save()
        //await Entry.insertMany(entry)
        await db.disconnect()
        res.status(201).json(entry)
    } catch (error) {
        await db.disconnect()
        res.status(500).json({ message: 'Algo salio mal' })
    }

}