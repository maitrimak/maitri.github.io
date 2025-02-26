document.addEventListener("DOMContentLoaded", function () {
    fetch("../data/gallery.json")
        .then(response => response.json())
        .then(images => {
            const galleryContainer = document.getElementById("gallery-container");

            images.forEach(image => {
                const colDiv = document.createElement("div");
                colDiv.className = "col-md-4 mb-4";

                const link = document.createElement("a");
                link.href = image.src;
                link.setAttribute("data-lightbox", "gallery");
                link.setAttribute("data-title", image.title);
                link.setAttribute("data-bs-toggle", "modal");
                link.setAttribute("data-bs-target", "#imageModal");
                link.addEventListener("click", function() {
                    // Set the modal content when the image is clicked
                    document.getElementById("imageModalLabel").textContent = image.title;
                    document.getElementById("modal-image").src = image.src;
                    document.getElementById("image-description").textContent = `Description: ${image.title}`;
                });

                const img = document.createElement("img");
                img.src = image.src;
                img.alt = image.alt;
                img.className = "img-fluid gallery-img"; // CSS style applied

                // Apply additional CSS styles dynamically
                img.style.width = "100%";
                img.style.height = "250px";
                img.style.objectFit = "cover";
                img.style.borderRadius = "10px";
                img.style.transition = "transform 0.3s ease-in-out";

                // Hover effect
                img.addEventListener("mouseover", function () {
                    img.style.transform = "scale(1.05)";
                });
                img.addEventListener("mouseout", function () {
                    img.style.transform = "scale(1)";
                });

                link.appendChild(img);
                colDiv.appendChild(link);
                galleryContainer.appendChild(colDiv);
            });
        })
        .catch(error => console.error("Error loading gallery images:", error));
});
