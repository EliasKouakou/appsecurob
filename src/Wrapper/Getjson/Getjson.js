import React, { useEffect, useRef } from 'react'
import './Getjson.css'

export let name = sessionStorage.getItem('name')
export let url = sessionStorage.getItem('url')
export let headers = JSON.parse(sessionStorage.getItem('headers'))
export let resources = sessionStorage.getItem('resources')
export let ID = sessionStorage.getItem('id')

export const json_server = {

    "json local":
    {
        "id": 1,
        "url": 'http://localhost:3001/exigences',
        "headers":
            { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': 'http://localhost:3000' },
        "resources": ''
    },

    "json global":
    {
        "id": 2,
        "url": "https://api.jsonbin.io/v3/b/62e3ac502c868775a53e7e2a",
        "resources": 'record',
        "headers":
            { 'Content-Type': 'application/json; charset=utf-8', 'X-MASTER-Key': '$2b$10$VtbT3yNh5czEH1kwdD2bRuBXW0N8jhIUsM9sOLI6tNEJShsSJb9Mq', 'Access-Control-Allow-Origin': 'http://localhost:3000' }
    }
}

const Getjson = () => {

    async function GET() {
        try {
            console.log(url, headers)
            const settings = {
                mode: 'cors',
                method: 'GET',
                headers: headers
            };
            const ResponseData = await fetch(url, settings)
            const Data = await ResponseData.json();
            if (Data.record) {
                sessionStorage.setItem('init_Data', JSON.stringify(Data.record))
            } else {
                sessionStorage.setItem('init_Data', JSON.stringify(Data))
            }
        } catch (error) {
            console.log()
        }

    }


    const display = (item) => {
        url = json_server[item].url
        headers = json_server[item].headers
        resources = json_server[item].resources
        ID = json_server[item].id

        sessionStorage.setItem('name', item)
        sessionStorage.setItem('id', ID)
        sessionStorage.setItem('headers', JSON.stringify(headers))
        sessionStorage.setItem('url', url)
        sessionStorage.setItem('resources', resources)

        try {
            document.getElementById("url").value = url
            document.getElementById("headers").value = JSON.stringify(headers)
            document.getElementById("resources").value = resources
            GET()
            console.log({ ID, url, headers, resources })

        } catch (error) {
            console.log(error)
        }
    }

    const init_display = () => {
        for (let item in json_server) {
            if (json_server[item].id == ID) {
                GET()
                return item
            } else {

                url = json_server['json global'].url
                headers = json_server['json global'].headers
                resources = json_server['json global'].resources
                ID = json_server['json global'].id


                sessionStorage.setItem('name', 'json global')
                sessionStorage.setItem('id', ID)
                sessionStorage.setItem('headers', JSON.stringify(headers))
                sessionStorage.setItem('url', url)
                sessionStorage.setItem('resources', resources)

                GET()
                return 'json global'
            }
        }
    }


    function Select_json(e) {
        try {
            if (e.value == 'json local') {
                e.value = 'json global'
            }
            else if (e.value == 'json global') {
                e.value = 'json local'
            }
            display(e.value)
        } catch (error) {
            console.log(error)
        }


    }


    const Select_link_json = () => {

        const url_url = document.getElementById("url").value
        if (url_url != "http://localhost:3001/exigences" && url_url != "https://api.jsonbin.io/v3/b/62e3ac502c868775a53e7e2a") {
            json_server["own json"] = { "id": 3, "url": url_url, "resources": document.getElementById('resources').value, "headers": document.getElementById('headers').value }
        }
        display("own json")

    }

    return (
        <div className='app__getjson'>
            <div className='app__select_json'>
                <input type="button" defaultValue={init_display()} onClick={(e) => Select_json(e.target)} />
            </div>
            <br />
            <div className='app__insert'>
                <input type="button" value="SELECT-JSON" onClick={() => Select_link_json()} />
                <input type="text" defaultValue={json_server[init_display()].url} name="url" id="url" placeholder="url" />
                <input type="text" defaultValue={JSON.stringify(json_server[init_display()].headers)} name="headers" id="headers" placeholder="headers" />
                <input type="text" defaultValue={json_server[init_display()].resources} name="resources" id="resources" placeholder="resources" />
            </div>
        </div>
    )
}

export default Getjson
