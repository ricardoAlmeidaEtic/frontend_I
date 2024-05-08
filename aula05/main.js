window.onload = async() =>{
    /*const xhr = new XMLHttpRequest();
    const url = 'data.json';
    xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status === 200){
                console.log(JSON.parse(xhr.responseText));
            } else {
                console.error("Error: ", xhr.status);
            }
        }
    }

    xhr.open('GET',url)
    xhr.send()*/
    
    
}

const getData = async() =>{
    const serverURL= "http://localhost:3000"
    try {
        const req = await fetch(`${serverURL}/data`);
        const data = await req.json();
        console.log(data);
        displayData(data)
    } catch (error) {
        throw new Error(error.message);
    }
}

const displayData = (data) =>{
    const dataContainer = document.querySelector('#data-container')
    dataContainer.innerHTML = `${JSON.stringify(data,null,2)}`
}