function fetchData(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            callback(null, data);
        } else {
            callback(new Error(`Ошибка: ${xhr.status}`));
        }
    };
    xhr.onerror = function () {
        callback(new Error("Ошибка сети"));
    };
    xhr.send();
}

function getSortedPosts(callback) {
    fetchData("https://jsonplaceholder.typicode.com/posts", function (err, posts) {
        if (err) return callback(err);
        const sorted = posts.sort((a, b) => b.title.length - a.title.length);
        callback(null, sorted);
    });
}

function getSortedComments(callback) {
    fetchData("https://jsonplaceholder.typicode.com/comments", function (err, comments) {
        if (err) return callback(err);
        const sorted = comments.sort((a, b) => a.name.localeCompare(b.name));
        callback(null, sorted);
    });
}

getSortedPosts(function (err, posts) {
    if (err) return console.error(err);
    console.log(posts.slice(0, 5));
});

getSortedComments(function (err, comments) {
    if (err) return console.error(err);
    console.log(comments.slice(0, 5));
});
