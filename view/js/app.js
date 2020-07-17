import { router } from "./router.js";
import { showSlots } from "./display-slots.js";

// Bind click events to view changes:
document.querySelector("#start").addEventListener("click", () => router.go("ProviderChoice"));
document.querySelectorAll(".return").forEach((e) => e.addEventListener("click", () => router.go("SplashScreen")));
document.querySelector("#searchBtn").addEventListener("click", () => router.go("SlotLoader"));

// Fetch provider data & slots:
router.onShow.SlotLoader = () => {
    // Fetch data, load cookies, etc. here
    let provider = document.querySelector("#provider").value;
    // Fetch data from background
    chrome.runtime.sendMessage({ type: provider }, res => {
        // Check for real errors:
        if (res.data.error) {
            switch (res.data.error.message) {
                case "Unauthorized": return router.go("LoginError");
            }
        }

        // Incorrect response 
        else if (!Array.isArray(res.data)) router.go("generalError");
        
        // Actually successful lmao:
        else showSlots(res.data);
    });
}