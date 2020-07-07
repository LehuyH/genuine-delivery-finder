// This is where the work happens lol:

document.querySelector("#searchBtn")
    .addEventListener("click", () => router.go("Loading"));

router.onShow.Loading = async () => {
    /*
        Fetch data, load cookies, etc. here
    */
   // const cookies = await getCookies('https://www.instacart.com/store/checkout_v3',"_instacart_session")
    var cookies = "error"
    chrome.runtime.sendMessage({type: "instacart"}, function(res) {
        document.getElementById('status').innerText = JSON.stringify(res.data)
        router.go("Results")
      });
    
    // Timeout only for testing, remove later:
  
}