if ("serviceWorker" in navigator){
    navigator.serviceWorker.register('/service-worker.js').then(registration=>
        {console.log("SW Registration");
        console.log(registration);}).catch(error=>{
            console.log("SW Failed");
            console.log(error);
        })
    
}