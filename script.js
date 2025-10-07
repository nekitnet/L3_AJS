const https = require('https');

function makeRequest(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            let data = '';
            response.on('data', (chunk) => data += chunk);
            response.on('end', () => {
                try { resolve(JSON.parse(data)); }
                catch (error) { reject(error); }
            });
        }).on('error', reject);
    });
}

function getPostsSortedByTitle(callback) {
    makeRequest('https://jsonplaceholder.typicode.com/posts')
        .then(posts => callback(null, posts.sort((a, b) => b.title.length - a.title.length)))
        .catch(callback);
}

function getCommentsSortedByName(callback) {
    makeRequest('https://jsonplaceholder.typicode.com/comments')
        .then(comments => callback(null, comments.sort((a, b) => a.name.localeCompare(b.name))))
        .catch(callback);
}

function getUsersWithSelectedFields() {
    return makeRequest('https://jsonplaceholder.typicode.com/users')
        .then(users => users.map(({id, name, username, email, phone}) =>
            ({id, name, username, email, phone})));
}

function getIncompleteTodos() {
    return makeRequest('https://jsonplaceholder.typicode.com/todos')
        .then(todos => todos.filter(todo => !todo.completed));
}

async function getPostsSortedByTitleAsync() {
    const posts = await makeRequest('https://jsonplaceholder.typicode.com/posts');
    return posts.sort((a, b) => b.title.length - a.title.length);
}

async function getCommentsSortedByNameAsync() {
    const comments = await makeRequest('https://jsonplaceholder.typicode.com/comments');
    return comments.sort((a, b) => a.name.localeCompare(b.name));
}

async function getUsersWithSelectedFieldsAsync() {
    const users = await makeRequest('https://jsonplaceholder.typicode.com/users');
    return users.map(({id, name, username, email, phone}) =>
        ({id, name, username, email, phone}));
}

async function getIncompleteTodosAsync() {
    const todos = await makeRequest('https://jsonplaceholder.typicode.com/todos');
    return todos.filter(todo => !todo.completed);
}

async function testAllFunctions() {
    console.log('Testing Callbacks:');

    getPostsSortedByTitle((error, posts) => {
        if (error) console.error('Posts error:', error.message);
        else console.log('Posts sorted - First:', posts[0].title.substring(0, 30), 'Count:', posts.length);
    });

    getCommentsSortedByName((error, comments) => {
        if (error) console.error('Comments error:', error.message);
        else console.log('Comments sorted - First:', comments[0].name, 'Count:', comments.length);
    });

    setTimeout(async () => {
        console.log('\nTesting Promises:');

        try {
            const users = await getUsersWithSelectedFields();
            console.log('Users fields:', Object.keys(users[0]), 'Count:', users.length);

            const todos = await getIncompleteTodos();
            console.log('Incomplete todos:', todos.length, 'First:', todos[0].title.substring(0, 30));
        } catch (error) {
            console.error('Promise error:', error.message);
        }

        console.log('\nTesting Async/Await:');

        try {
            const [posts, comments, users, todos] = await Promise.all([
                getPostsSortedByTitleAsync(),
                getCommentsSortedByNameAsync(),
                getUsersWithSelectedFieldsAsync(),
                getIncompleteTodosAsync()
            ]);

            console.log('All operations completed successfully!');
            console.log('Results:', {
                posts: posts.length,
                comments: comments.length,
                users: users.length,
                todos: todos.length
            });

        } catch (error) {
            console.error('Async error:', error.message);
        }
    }, 1000);
}

testAllFunctions();