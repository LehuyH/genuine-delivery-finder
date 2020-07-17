// Bind click events to view changes:
document.querySelector("#start").addEventListener("click", () => router.go("Onboarding"))
document.querySelectorAll(".return").forEach((e) => e.addEventListener("click", () => router.go("Search")))


// Select provider, move to loader in UI:
document.querySelector("#searchBtn").addEventListener("click", () => router.go("Loading"));

// Fetch provider data & slots:
router.onShow.Loading = () => {
    // Fetch data, load cookies, etc. here
    let provider = document.querySelector("#provider").value;
    // Fetch data from background
    chrome.runtime.sendMessage({ type: provider }, res => {
        // Check for real errors:
        if (res.data.error) {
            switch (res.data.error.message) {
                case "Unauthorized": return router.go("loginError");
            }
        }
        // Incorrect response 
        else if (!Array.isArray(res.data)) {
            if (res.data.service_options) router.go('Success')
            else router.go('generalError');
        }
        // Actually successful lmao:
        else showSlots(res.data);
    });
}