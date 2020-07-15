

//Handle messages
chrome.runtime.onMessage.addListener( (req, sender, sendResponse)=>{
console.log(req.type)
    switch(req.type){
        case "Instacart":
            fetch('https://instacart.com/v3/retailers/1/delivery_options?source=web').then(response => response.json())
                .then((data) =>{
                console.log(data)
                sendResponse({success:true,data:data})
            })
            
    }
    return true;
});
