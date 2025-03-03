document.addEventListener("DOMContentLoaded", loadPosts);

function openPostForm() {
    document.getElementById("postForm").style.display = "block";
}

function submitPost() {
    let name = document.getElementById("name").value;
    let location = document.getElementById("location").value;
    let content = document.getElementById("content").value;
    let imageFile = document.getElementById("imageUpload").files[0];

    if (!name || !location || !content) {
        alert("Please fill all fields!");
        return;
    }

    let reader = new FileReader();
    reader.onload = function (e) {
        let newPost = {
            name: name,
            location: location,
            content: content,
            image: e.target.result
        };

        savePost(newPost);
    };
    
    if (imageFile) {
        reader.readAsDataURL(imageFile);
    } else {
        savePost({ name, location, content, image: null });
    }
}

function savePost(post) {
    let posts = JSON.parse(localStorage.getItem("posts") || "[]");
    posts.unshift(post);
    localStorage.setItem("posts", JSON.stringify(posts));
    loadPosts();
}

function loadPosts() {
    let postsContainer = document.getElementById("postsContainer");
    postsContainer.innerHTML = "";
    let posts = JSON.parse(localStorage.getItem("posts") || "[]");

    posts.forEach(post => {
        let postElement = document.createElement("div");
        postElement.innerHTML = `
            <h3>${post.name} (${post.location})</h3>
            <p>${post.content}</p>
            ${post.image ? `<img src="${post.image}" width="100">` : ""}
            <hr>
        `;
        postsContainer.appendChild(postElement);
    });
}

function searchPosts() {
    let query = document.getElementById("searchBar").value.toLowerCase();
    let posts = JSON.parse(localStorage.getItem("posts") || "[]");
    let filteredPosts = posts.filter(post =>
        post.name.toLowerCase().includes(query) ||
        post.location.toLowerCase().includes(query)
    );

    let postsContainer = document.getElementById("postsContainer");
    postsContainer.innerHTML = "";
    filteredPosts.forEach(post => {
        let postElement = document.createElement("div");
        postElement.innerHTML = `
            <h3>${post.name} (${post.location})</h3>
            <p>${post.content}</p>
            ${post.image ? `<img src="${post.image}" width="100">` : ""}
            <hr>
        `;
        postsContainer.appendChild(postElement);
    });
}

