$(document).ready(function () {
    const opportunitiesContainer = $("#opportunitiesContainer");
    const searchInput = $("#searchInput");
    const loginButton = $("#loginButton");
    const logoutButton = $("#logoutButton");
    const userInfo = $("#userInfo");

    let opportunities = [];

    // Fetch volunteer opportunities
    function fetchOpportunities() {
        $.ajax({
            url: "https://jsonplaceholder.typicode.com/posts", // Replace with real API URL
            method: "GET",
            success: function (data) {
                opportunities = data.slice(0, 5).map((item, index) => ({
                    title: `Opportunity ${index + 1}`,
                    description: item.body,
                    date: `2025-02-${10 + index}`,
                    time: `${10 + index}:00 AM - ${12 + index}:00 PM`
                }));

                displayOpportunities(opportunities);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Error fetching opportunities:", textStatus, errorThrown);
                alert("Failed to fetch opportunities. Please check your network and try again.");
            }
        });
    }

    // Display volunteer opportunities dynamically
    function displayOpportunities(opportunitiesList) {
        opportunitiesContainer.empty(); // Clear previous content

        opportunitiesList.forEach((opportunity, index) => {
            const opportunityCard = `
                <div class="card mt-3">
                    <div class="card-body">
                        <h5>${opportunity.title}</h5>
                        <p>${opportunity.description}</p>
                        <p><strong>Date:</strong> ${opportunity.date} | <strong>Time:</strong> ${opportunity.time}</p>

                        <div class="form-group">
                            <label for="roleSelect-${index}">Select Role</label>
                            <select class="form-control roleSelect" id="roleSelect-${index}" data-index="${index}">
                                <option value="">Select a role</option>
                                <option value="volunteer">Volunteer</option>
                                <option value="participant">Participant</option>
                                <option value="sponsor">Sponsor</option>
                            </select>
                        </div>

                        <p class="role-message text-success mt-2" id="roleMessage-${index}" style="display: none;"></p>
                    </div>
                </div>
            `;

            opportunitiesContainer.append(opportunityCard);
        });
    }

    // Handle role selection with validation
    $(document).on("change", ".roleSelect", function () {
        const selectedRole = $(this).val();
        const index = $(this).data("index");

        if (!selectedRole) {
            alert("Please select a valid role.");
            return;
        }

        $(`#roleMessage-${index}`)
            .html(`<strong>You selected:</strong> ${selectedRole}`)
            .fadeIn()
            .delay(2500)
            .fadeOut();
    });

    // Search functionality with input focus improvement
    searchInput.on("input", function () {
        const searchText = $(this).val().trim().toLowerCase();
        const filteredOpportunities = opportunities.filter(opportunity =>
            opportunity.title.toLowerCase().includes(searchText) ||
            opportunity.description.toLowerCase().includes(searchText)
        );

        displayOpportunities(filteredOpportunities);

        if (!searchText) {
            searchInput.focus();
        }
    });

    // Simulated user authentication
    loginButton.on("click", function () {
        let username = prompt("Enter your username:");
        if (username) {
            username = username.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;"); // Basic sanitization
            localStorage.setItem("loggedInUser", username);
            updateUserUI();
        }
    });

    logoutButton.on("click", function () {
        localStorage.removeItem("loggedInUser");
        updateUserUI();
    });

    function updateUserUI() {
        const loggedInUser = localStorage.getItem("loggedInUser");
        if (loggedInUser) {
            userInfo.html(`<strong>Welcome, ${loggedInUser}!</strong>`).show();
            loginButton.hide();
            logoutButton.show();
        } else {
            userInfo.hide();
            loginButton.show();
            logoutButton.hide();
        }
    }

    // Initialize page
    fetchOpportunities();
    updateUserUI();
});

