document.addEventListener("DOMContentLoaded", () => {
    const newsContainer = document.getElementById("newsContainer");
    const apiKey = "94fe0ac770ae4b13b6273243b5bdd7c2"; // Replace with your actual API key
    const apiUrl = `https://newsapi.org/v2/everything?q=community&language=en&sortBy=publishedAt&apiKey=${apiKey}`;

    async function fetchNews() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            displayNews(data.articles);
        } catch (error) {
            console.error("Error fetching news:", error);
            newsContainer.innerHTML = "<p class='text-danger'>Failed to load news. Please try again later.</p>";
        }
    }

    function displayNews(articles) {
        newsContainer.innerHTML = "";
        if (articles.length === 0) {
            newsContainer.innerHTML = "<p class='text-center'>No news available at the moment.</p>";
            return;
        }

        articles.forEach(article => {
            const newsItem = document.createElement("div");
            newsItem.classList.add("col-md-4", "mb-4");
            newsItem.innerHTML = `
                <div class="card h-100">
                    <img src="${article.urlToImage || 'placeholder.jpg'}" class="card-img-top" alt="News Image">
                    <div class="card-body">
                        <h5 class="card-title">${article.title}</h5>
                        <p class="card-text">${article.description || "No description available."}</p>
                        <a href="${article.url}" class="btn btn-primary" target="_blank">Read More</a>
                    </div>
                </div>
            `;
            newsContainer.appendChild(newsItem);
        });
    }

    fetchNews();
});
