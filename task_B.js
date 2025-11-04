function fetchData(url) {
    return fetch(url).then(response => {
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        return response.json();
    });
}

function getUsersSelectedFields() {
    return fetchData("https://jsonplaceholder.typicode.com/users")
        .then(users => users.map(u => ({
            id: u.id,
            name: u.name,
            username: u.username,
            email: u.email,
            phone: u.phone
        })));
}

function getUncompletedTodos() {
    return fetchData("https://jsonplaceholder.typicode.com/todos")
        .then(todos => todos.filter(t => !t.completed));
}

getUsersSelectedFields()
    .then(users => console.log(users))
    .catch(err => console.error(err));

getUncompletedTodos()
    .then(todos => console.log(todos))
    .catch(err => console.error(err));
