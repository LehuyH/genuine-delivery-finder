// Provider Store ----
let selectedProvider = null
// Events-------

//views
document.querySelector("#start").addEventListener("click", () => router.go("Onboarding"))
document.querySelectorAll(".return").forEach((e)=>{
    e.addEventListener("click", () => router.go("Search"))
   
   })


//select provider
document.querySelector("#searchBtn")
    .addEventListener("click", async () => {
        router.go("Loading")
        let provider = document.querySelector("#provider").value
        selectedProvider = provider
        //Fetch data
        chrome.runtime.sendMessage({
            type: provider
        }, function (res) {
            //Check for errors
            if (res.data.error) {
                switch (res.data.error.message) {
                    case "Unauthorized":
                        router.go("loginError")
                }

            } else if (typeof res.data.service_options !== 'undefined') { // Success!
                
                if(res.data.service_options)
                router.go('Success')
            } else { //Random error
                router.go('generalError')
            }

        });



    });

router.onShow.Loading = async () => {
    /*
        Fetch data, load cookies, etc. here
    */
    // const cookies = await getCookies('https://www.instacart.com/store/checkout_v3',"_instacart_session")


    // Timeout only for testing, remove later:

}