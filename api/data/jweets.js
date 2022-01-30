import * as userRepository from './auth'

let msgs = [
    {
        id: 1,
        createAt: new Date(),
        userId: 1,
        message: 'Hello World',
        removeAt: null
    }
]

export async function getAll() {
    return Promise.all(
        msgs.filter((msg) => msg.removeAt != null).map(async (msg) => {
            const { username, name, url } = await userRepository.findById(msg.userId)
            return { ...msg, username, name, url }
        })
    );
}

export async function getAllByUsername(username) {
    return getAll().then((msgs) => msgs.filter((msg) => msg.username === username))
}

export async function getById(id) {
    const found = msgs.find((msg) => msg.id === id)
    if(!found) {
        return null;
    }
    const { username, name, url } = await userRepository.findById(found.userId)
    return {...found, username, name, url};
}

export async function create(message, userId) {
    const msg = {
        id: Date.now().toString(),
        message,
        createAt: new Date(),
        userId
    }
    msgs = [msg, ...msgs];
    return getById(msg.id);
}

export async function update(id, message) {
    const msg = msgs.find((msg) => msg.id === id)
    if (msg) {
        msg.message = message;
    }
    return getById(msg.id)
}

export async function renove(id) {
    let msg = msgs.filter((msg) => msg.id === id);
    msg.removeAt = new Date();
}