async function getCookies(url,name){
    
    return await chrome.cookies.get({url,name})

    
}

