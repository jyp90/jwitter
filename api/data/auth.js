import { db } from '../data/db/database.js'

export async function findByUsername(username) {
    // return users.find((user) => user.username === username)
    return db.execute('SELECT * FROM users WHERE username = ?', [username])
    .then(res => {
        console.log(res)
        return res[0][0]
    });
}

export async function createUser(user) {
    // const created = { ...user, id: Date.now().toString() }
    // users.push(created);
    // return created.id;
    const { username, password, name, email, url } = user
    return db
    .execute(`INSERT INTO users (username, password, name, email, url) 
        VALUES (?, ?, ?, ?, ?)`, 
        [username, password, name, email, url])
    .then((res) => console.log)
    .catch(console.error)

}

export async function findById(id) {
    // return users.find((user) => user.id === id)
    return db.execute('SELECT * FROM users WHERE id = ?', [id])
    .then(res => {
        console.log(res)
        return res[0][0]
    });
}