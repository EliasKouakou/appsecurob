
// let url='http://localhost:3001/exigences'
// let url='https://mahaapp.000webhostapp.com/resources/databases/MAHA_DataBase.db.json'
// let url='http://maha.epizy.com/resources/databases/MAHA_DataBase.db.json'
import { useEffect } from 'react'
import ReactDom from 'react-dom'


let url
let ID
let headers
let resources


console.log(window.document)
let json_server={"json global":
                        {"id":2,
                        "url":"https://api.jsonbin.io/v3/b/62e3ac502c868775a53e7e2a",
                        "headers":
                                {'Content-Type': 'application/json; charset=utf-8','X-MASTER-Key': '$2b$10$VtbT3yNh5czEH1kwdD2bRuBXW0N8jhIUsM9sOLI6tNEJShsSJb9Mq'}},
                "json local":
                        {"id":1,
                        "url":'http://localhost:3001/exigences',
                        "headers":
                                {'Content-Type': 'application/json; charset=utf-8'}}}


const GET=async function(){

    const settings = {
        mode:'cors',
        method: 'GET',
        headers: headers
    };
    const ResponseData = await fetch(url,settings)
    const Data = await ResponseData.json();

    if(ID==1){
        sessionStorage.setItem('init_Data',JSON.stringify(Data)) 

    }else if (ID==2){
        sessionStorage.setItem('init_Data_2',JSON.stringify(Data.record)) 

    }
}
                                
function Select_json(element){

    url=json_server["json global"].url
    ID=json_server["json global"].id
    headers=json_server["json global"].headers
    sessionStorage.setItem('id',ID)
    useEffect(()=>{
        document.getElementById('url').value=url

    },[])
    
    
    try {
        if(element.value=='json local'){
            element.value='json global'   
        }
        else if(element.value=='json global') {
            element.value='json local'
        }

        url=json_server[element.value].url
        ID=json_server[element.value].id
        headers=json_server[element.value].headers
        sessionStorage.setItem('id',ID)


    } catch (error) {
        
    }

    GET()
    console.log({ID,url,resources,headers})

    
}



function Select_link_json(){

    useEffect(()=>{
    const url_url=window.document.getElementById('url').value
    if(url_url!="http://localhost:3001/exigences" && url_url!="https://api.jsonbin.io/v3/b/62e3ac502c868775a53e7e2a"){
        json_server["own json"]= {"id":3,"url":url_url,"resources":document.getElementById('resources').value,"headers":document.getElementById('headers').value}    
    }
    url=json_server["own json"].url
    ID=json_server["own json"].id
    // headers=JSON.parse(json_server["own json"].headers)
    headers=json_server["own json"].headers

    sessionStorage.setItem('id',ID)
    
    console.log({ID,url,resources,headers})

    },[]);

    
    

    

}

Select_json()




window.onload=GET()



function load_json(){
    var Database

    if(ID==1){
        Database=sessionStorage.getItem('init_Data')
        
    }else if(ID==2){
        Database=sessionStorage.getItem('init_Data_2')
    }
    return Database
}

var DataBASE=JSON.parse(load_json())


function filter(list){
    var L=[]
    for(let element of list){
        if (L.includes(element)==false){
            L.push(element)
        }else{      
        }
    }
    return L
}

function DataListInit(){

    try {
        for(let j=1;j<8;j++){
        var Val=DataBASE.map(x=>x['type'+j])
        var newVal=filter(Val)
        try{
            var LT=document.querySelector('datalist[id=LT'+j+']')
            for (let v of newVal){
                
                var opt=document.createElement('option')
                opt.setAttribute('value',v)
                LT.appendChild(opt)
            }
        }catch{}        
    }   
    } catch (error) {
        
    }
    
}
DataListInit()


var DATE=new Date()

var Exigence={
    'id':null,
    'type1':null,
    'type2':null,
    'type3':null,
    'type4':null,
    'type5':null,
    'type6':null,
    'type7':null,
    'exigence':null,
    'source':null,
    'date_du_jour':null,
}


function Display(){
    useEffect(()=>{
        Exigence.id=parseInt(document.querySelector('input#id').value) || null
        Exigence.type1=document.querySelector('input#T1').value || null
        Exigence.type2=document.querySelector('input#T2').value || null
        Exigence.type3=document.querySelector('input#T3').value || null
        Exigence.type4=document.querySelector('input#T4').value || null
        Exigence.type5=document.querySelector('input#T5').value || null
        Exigence.type6=document.querySelector('input#T6').value || null
        Exigence.type7=document.querySelector('input#T7').value || null
        Exigence.exigence=document.querySelector('textarea#exigence').value || null
        Exigence.source=document.querySelector('textarea#source').value || null
        Exigence.date_du_jour=DATE.toLocaleString('fr',{day:'2-digit',month:'2-digit',year:'numeric'}) || null
        sessionStorage.setItem('Exigence',JSON.stringify(Exigence))
    },[])
   
    // console.log(url)
}


var instruction

const POST=async function(DATA){

    const settings = {
        mode:'cors',
        method: 'POST',
        body:JSON.stringify(DATA),
        headers: headers
    };
    try {
        const ResponseData= await fetch(url, settings);
        console.log(ResponseData)
        const Data = await ResponseData.json();
        if(ID==1){
            sessionStorage.setItem('init_Data',JSON.stringify(Data)) 
    
        }else if (ID==2){
            sessionStorage.setItem('init_Data_2',JSON.stringify(Data.record)) 
    
        }
    } catch (error) {
        
    }
    
}

function Add(){  

    console.log('add')
    Display()   
    instruction='Add'

    POST(Exigence)
    sessionStorage.setItem('Instruction',JSON.stringify(instruction))


}

const PUT=async function(DATA){


    const settings = {
        mode: "cors",
        method: 'PUT',
        body:JSON.stringify(DATA),
        headers: headers
    };
    try {
        const ResponseData= await fetch(url, settings);
        console.log(ResponseData)
        const Data = await ResponseData.json();
        console.log(Data)
        if(ID==1){
            sessionStorage.setItem('init_Data',JSON.stringify(Data)) 
    
        }else if (ID==2){
            sessionStorage.setItem('init_Data_2',JSON.stringify(Data.record)) 
    
        }
    } catch (e) {
        
    }    
}

function Save(){

    console.log("save")
    Display()
    instruction='Save'

    PUT(Exigence)
    sessionStorage.setItem('Instruction',JSON.stringify(instruction))
}

function DELETE(DATA,id){


    var myInit={
        mode: "cors",
        method:'DELETE',
        headers:headers,
        body:DATA,
        }
    
        try {
            let myRequest=new Request(url+'/'+id,myInit);
            fetch(myRequest)
            .then(function(resp){return resp})
            .then(function(data){
                console.log(data)
                if(ID==1){
                    sessionStorage.setItem('init_Data',JSON.stringify(data)) 
            
                }else if (ID==2){
                    sessionStorage.setItem('init_Data_2',JSON.stringify(data.record)) 
            
                }
            })
        } catch (error) {
            
        }
   

}

 function Delete(){

    console.log("delelte")
    Display()
    instruction='Delete'
    console.log(Exigence.id)
    DELETE(null,Exigence.id)
    sessionStorage.setItem('Instruction',JSON.stringify(instruction))
    
}


function Cancel(){
    var X=[]
    X.push(document.querySelectorAll('input[type=number]'))
    X.push(document.querySelectorAll('input[type=text]'))
    X.push(document.querySelectorAll('textarea'))
    for (let x of X){
        for (let xe of x){
            if(xe.id!='id'){xe.value=''}
        }  
    }
}



function displayAllInfo(){
    
    Display()

    DataBASE=JSON.parse(load_json())
    try {
        var id=Exigence.id
    var tdb=DataBASE.filter(X=>X['id']==id)
    if(tdb.length>0){
        for(let j=1;j<8;j++){
            try {
                 var ip=document.querySelector('input[id=T'+j.toString()+']')
                 ip.value=tdb[0]['type'+j]
            } catch (error) {}
        }
        for(let j=8;j<10;j++){
            try {
                var tx=document.querySelectorAll('textarea') 
                    tx[j-8].value=tdb[0][Object.keys(Exigence)[j]]
           } catch (error) {}
        }
    }else{
        Cancel()
    }
    } catch (error) {
        
    }
    
}

export {Select_link_json,displayAllInfo,Save,Add,Delete,Display,Cancel} ;


