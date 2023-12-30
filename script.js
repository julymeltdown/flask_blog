document.getElementById('postForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    fetch('http://localhost:5000/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        loadPosts();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

function loadPosts() {
    fetch('http://localhost:5000/posts')
    .then(response => response.json())
    .then(posts => {
        const postsContainer = document.getElementById('posts');
        postsContainer.innerHTML = '';
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `
                <h3 onclick="toggleContent(${post.id})">${post.title}</h3>
                <div class="post-content" id="content-${post.id}">
                    <p>${post.content}</p>
                    <button class='delete-btn' onclick='deletePost(${post.id})'>Delete</button>
                </div>
            `;
            postsContainer.appendChild(postElement);
        });
    });
}

function toggleContent(postId) {
    const contentElement = document.getElementById(`content-${postId}`);
    if (contentElement.style.maxHeight) {
        contentElement.style.maxHeight = null;
    } else {
        contentElement.style.maxHeight = contentElement.scrollHeight + "px";
    }
}

function deletePost(postId) {
    fetch(`http://localhost:5000/post/${postId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        loadPosts();
    })
    .catch(error => console.error('Error:', error));
}

loadPosts();
