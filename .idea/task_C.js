async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
    }
    return response.json();
}

async function getSortedPosts() {
    const posts = await fetchData("https://jsonplaceholder.typicode.com/posts");
    return posts.sort((a, b) => b.title.length - a.title.length);
}

async function getSortedComments() {
    const comments = await fetchData("https://jsonplaceholder.typicode.com/comments");
    return comments.sort((a, b) => a.name.localeCompare(b.name));
}

async function getUsersSelectedFields() {
    const users = await fetchData("https://jsonplaceholder.typicode.com/users");
    return users.map(u => ({
        id: u.id,
        name: u.name,
        username: u.username,
        email: u.email,
        phone: u.phone
    }));
}

async function getUncompletedTodos() {
    const todos = await fetchData("https://jsonplaceholder.typicode.com/todos");
    return todos.filter(t => !t.completed);
}

(async () => {
    try {
        const posts = await getSortedPosts();
        console.log(posts.slice(0, 5));

        const comments = await getSortedComments();
        console.log(comments.slice(0, 5));

        const users = await getUsersSelectedFields();
        console.log(users);

        const todos = await getUncompletedTodos();
        console.log(todos.slice(0, 5));
    } catch (err) {
        console.error(err);
    }
})();
