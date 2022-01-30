let users = [
    { 
        id: '1',
        username: 'jyp',
        password: '',
        name: 'junyong',
        email: 'babung@gmail.com',
        url: 'https://abbo.tistory.com'
    }
]

export async function findByUsername(username) {
    return users.find((user) => user.username === username)
}

export async function createUser(user) {
    const created = { ...user, id: Date.now().toString() }
    users.push(created);
    return created.id;
}