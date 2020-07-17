// Handle messages
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    console.log(req.type)
    switch (req.type) {
        case "Instacart":
            fetch('https://instacart.com/v3/retailers/1/delivery_options?source=web')
            .then(response => response.json())
            .then(rawData => {
                // Convert data:
                const data = rawData.error ?
                    { error: rawData.error } : // Set to error if any.
                    rawData.service_options.days.map(({ // Parse data:
                        day,
                        date,
                        options
                    }) => [
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
