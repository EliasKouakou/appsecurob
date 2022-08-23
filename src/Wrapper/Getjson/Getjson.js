import React,{useEffect, useRef} from 'react'
import './Getjson.css'
export let name
export let url
export let headers
export let resources
export let ID = sessionStorage.getItem('id')

export const json_server = {
    "json global":
    {
        "id":2,
        "url": "https://api.jsonbin.io/v3/b/62e3ac502c868775a53e7e2a",
        "resources": 'record',
        "headers":
            { 'Content-Type': 'application/json; charset=utf-8', 'X-MASTER-Key': '$2b$10$VtbT3yNh5czEH1kwdD2bRuBXW0N8jhIUsM9sOLI6tNEJShsSJb9Mq' }
    },
    "json local":
    {
        "id": 1,
        "url": 'http://localhost:3001/exigences',
        "headers":
            { 'Content-Type': 'application/json; charset=utf-8' },
        "resources": ''
    }
}


const Getjson = React.memo(() =>{

    const GET = async function HOC () {
        // console.log(typeof(headers))
        const settings = {
            mode: 'cors',
            method: 'GET',
            headers: headers
        };
        const ResponseData = await fetch(url, settings)
        const Data = await ResponseData.json();
        // console.log(Data)
    
        // console.log(ResponseData)
        if (ID == 1) {
            sessionStorage.setItem('init_Data', JSON.stringify(Data))
    
        } else if (ID == 2) {
            sessionStorage.setItem('init_Data', JSON.stringify(Data.record))
    
        }
    }

    sessionStorage.setItem('id', ID)
    for( let item in json_server){

        if(json_server[item]['id']==ID){
            url = json_server[item].url
            headers = json_server[item].headers
            resources = json_server[item].resources
            name=item
            // console.log({name,ID,url,headers,resources})
            break
            
        }
    }

    try {
        useEffect(()=>{
            document.getElementById("url").value=url
            document.getElementById("headers").value=JSON.stringify(headers)
            document.getElementById("resources").value=resources
            
        })
        GET()



    } catch (error) {
        console.log(error)
    }
    
    const urlI = useRef(null)
    const headersI = useRef(null)
    const resourcesI = useRef(null)

    const btgl = useRef(null)


    
    function Select_json(e){

        sessionStorage.setItem('id', ID)

        for( let item in json_server){
    
            if(json_server[item]['id']==ID){
                url = json_server[item].url
                headers = json_server[item].headers
                resources = json_server[item].resources
                name=item
                console.log({name,ID,url,headers,resources})
                break
                
            }
        }

        try {
            if (e.value == 'json local') {
                e.value = 'json global'
            }
            else if (e.value == 'json global') {
                e.value = 'json local'
            }

            url = json_server[e.value].url
            ID = json_server[e.value].id
            headers = json_server[e.value].headers
            resources = json_server[e.value].resources
            sessionStorage.setItem('id', ID)

            document.getElementById("url").value=url
            document.getElementById("headers").value=headers
            document.getElementById("resources").value=resources
            GET()

        } catch (error) {
            console.log(error)
        }

        
    }


    const Select_link_json=()=>{
        
        const url_url = urlI.current.value
        if (url_url != "http://localhost:3001/exigences" && url_url != "https://api.jsonbin.io/v3/b/62e3ac502c868775a53e7e2a") {
            json_server["own json"] = { "id": 3, "url": url_url, "resources": document.getElementById('resources').value, "headers": document.getElementById('headers').value }
        }


        url = json_server["own json"].url
        ID = json_server["own json"].id
        headers = JSON.stringify(json_server["own json"].headers)
        resources = json_server["own json"].resources
        try {
            urlI.current.value = url
            headersI.current.value = headers
            resourcesI.current.value = resources

        } catch (error) {

        }

        sessionStorage.setItem('id', ID)

        console.log({ ID, url, resources, headers })
        

    }
  return (
    <div className='app__getjson'>
        <div className='app__select_json'>
            {/* <input type="button" value={"json global"} ref={btgl} onClick={(e) => Select_json(e.target)} /> */}
            <input type="button" value={name==null?'json global':name} ref={btgl} onClick={(e) => Select_json(e.target)} />
        </div>

        <br />

        <div className='app__insert'>
            <input type="button" value="SELECT-JSON" onClick={() => Select_link_json()} />
            <input type="text" ref={urlI} name="url" id="url" placeholder="url" />
            <input type="text" ref={headersI} name="headers" id="headers" placeholder="headers" />
            <input type="text" ref={resourcesI} name="resources" id="resources" placeholder="resources" />
        </div>

    </div>
  )
})

export default Getjson
