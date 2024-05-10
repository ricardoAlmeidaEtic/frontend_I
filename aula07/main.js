window.onload = async() =>{

    if("serviceWorker" in navigator){
        try{
            await navigator.serviceWorker.register("serviceWorker.js")
        } catch(error){
            console.error("Error registering Service Worker: ",error)
        }
    } else {
        alert("service worker not supported, use a chromium based browser.")
    }

    document.querySelector("#next").onclick = () =>{
        document.querySelector("#page1").style.display="none"
        document.querySelector("#page2").style.display="flex"
    };

    document.querySelector("#previous").onclick = () =>{
        document.querySelector("#page1").style.display="flex"
        document.querySelector("#page2").style.display="none"
    };

}