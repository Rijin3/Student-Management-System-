export function login(username, password) {
    return username === 'admin' && password === '1234';
}

export function logout() {
    return true;
}