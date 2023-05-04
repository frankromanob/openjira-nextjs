
interface seedData{
    entries:SeedEntry[]
}

interface SeedEntry {
    description: string,
    createdAt: number,
    status: string,
}

export const seedData = {
    entries: [
        {
            description: 'Pending - Loren Ipsum bla bla bla',
            createdAt: Date.now(),
            status: 'pending'
        },
        {
            description: 'In progress - Loren Ipsum bla bla bla22',
            createdAt: Date.now() - 1000000,
            status: 'in-progress'
        },
        {
            description: 'Done - Loren Ipsum bla bla bla33',
            createdAt: Date.now() - 100000,
            status: 'finished'
        }
    ]
}