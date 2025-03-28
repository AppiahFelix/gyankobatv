async function fetchPosts() {
    let newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = "<p>Loading...</p>";
    try {
        let response = await fetch("https://cors-anywhere.herokuapp.com/http://admingyankoba.lovestoblog.com/fetch_post.php");
        if (!response.ok) {
            throw new Error(`Fetch failed with status: ${response.status}`);
        }
        let posts = await response.json();
        console.log("Posts:", posts);
        newsContainer.innerHTML = "";
        if (!posts || posts.length === 0) {
            newsContainer.innerHTML = "<p>No posts available.</p>";
        } else {
            posts.forEach(post => {
                newsContainer.innerHTML += `
                    <div class="news-card">
                        <h3>${post.title}</h3>
                        <p>${post.created_at ? new Date(post.created_at).toLocaleDateString() : "No date"}</p>
                        ${post.image ? `<img src="${post.image}" alt="${post.title}">` : ""}
                        <p>${post.content}</p>
                    </div>
                `;
            });
        }
    } catch (error) {
        console.error("Fetch error:", error);
        newsContainer.innerHTML = "<p>Error: " + error.message + "</p>";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    fetchPosts();
    document.getElementById("refresh-posts").addEventListener("click", fetchPosts);
});