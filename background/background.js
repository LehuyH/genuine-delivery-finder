// Handle messages
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    console.log(req.type)
    switch (req.type) {
        case "Instacart":
            fetch("https://instacart.com/v3/retailers/1/delivery_options?source=web")
            .then(res => res.json())
            .then(raw => {
                // Convert data:
                const data = raw.error ?
                    { error: raw.error } : // Set to error if any.
                    raw.service_options.days.map(({ day, date, options }) => [
                        `${day}, ${date}`,
                        options.map(windowSlot => ({
                            cost: windowSlot.price_value,
                            color: windowSlot.price_color,
                            time: windowSlot.full_window
                        }))
                    ]);

                console.log(data);

                // Send back data:
                sendResponse({ data });
            });
            break;

    }
    return true;
});
