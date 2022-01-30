import { db } from '../data/db/database.js'

const SELECT_QUERY = `SELECT m.id, m.message, m.create_at, m.user_id, u.username, u.name, u.url 
    FROM messages m JOIN users u ON m.user_id = u.id `;

export async function getAll() {
    // return Promise.all(
    //     msgs.filter((msg) => msg.removeAt != null).map(async (msg) => {
    //         const { username, name, url } = await userRepository.findById(msg.userId)
    //         return { ...msg, username, name, url }
    //     })
    // );
    return db.execute(```
    ${SELECT_QUERY} 
    ORDER BY create_at DESC
    ```)
        .then((res) => res[0])
}

export async function getAllByUsername(username) {
    return getAll().then((msgs) => msgs.filter((msg) => msg.username === username))
}

export async function getById(id) {
    // const found = msgs.find((msg) => msg.id === id)
    // if(!found) {
    //     return null;
    // }
    // const { username, name, url } = await userRepository.findById(found.userId)
    // return {...found, username, name, url};
    return db.execute(`${SELECT_QUERY} WHERE m.id = ${id}`)
        .then((res) => {
            res[0][0]
        })
}

export async function create(message, userId) {
    // const msg = {
    //     id: Date.now().toString(),
    //     message,
    //     createAt: new Date(),
    //     userId
    // }
    // msgs = [msg, ...msgs];
    // return getById(msg.id);
    return db.execute(`INSERT INTO messages (message, create_at, user_id) VALUES (${message}, ${new Date()}, ${userId})`)
        .then((res) => console.log)
}

export async function update(id, message) {
    // const msg = msgs.find((msg) => msg.id === id)
    // if (msg) {
    //     msg.message = message;
    // }
    // return getById(msg.id)
    return db.execute(`UPDATE messages SET message = ${message} WHERE id = ${id}`)
        .then((res) => console.log)
}

export async function renove(id) {
    // let msg = msgs.filter((msg) => msg.id === id);
    // msg.removeAt = new Date();
    return db.execute(`DELETE FROM messages WHERE id = ${id}`)
    .then((res) => console.log)
}