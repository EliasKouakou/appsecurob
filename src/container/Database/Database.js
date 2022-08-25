import React, { useEffect,useRef } from 'react'
import './Database.css'
import { PageWrapper} from '../../Wrapper'
import {url,ID,headers} from '../../Wrapper/Getjson/Getjson'


const defaultKeysOrder=['id','type1','type2','type3','type4','type5','type6','type7','exigence','source','date_du_jour']
const Database = () => {
    
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
                sessionStorage.setItem('init_Data',JSON.stringify(Data.record)) 
        
            }
        } catch (e) {
            return e;
        }    
    }


    const POST=async function(DATA){

        const settings = {
            mode:'cors',
            method: 'POST',
            body:JSON.stringify(DATA),
            headers: headers
        };
        const ResponseData= await fetch(url, settings);
        console.log(ResponseData)
        const Data = await ResponseData.json();
        console.log(Data)
        if(ID==1){
            sessionStorage.setItem('init_Data',JSON.stringify(Data)) 

        }else if (ID==2){
            sessionStorage.setItem('init_Data',JSON.stringify(Data.record)) 

        }
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
                    if(ID==1){
                        sessionStorage.setItem('init_Data',JSON.stringify(data)) 
                
                    }else if (ID==2){
                        sessionStorage.setItem('init_Data',JSON.stringify(data.record)) 
                
                    }
                })
            } catch (error) {
                
            }
    

    }

    function load_json(){
        var DataBASE
        DataBASE=sessionStorage.getItem('init_Data')
        
        return DataBASE
    }


    var DataBASE=JSON.parse(load_json())


    var data=sessionStorage.getItem('Exigence')
    var Exigence=JSON.parse(data)


    function InitAddExigence(){


            let tbody=document.getElementById('tbody')
            while(tbody.firstChild){
                tbody.removeChild(tbody.lastChild)
            }

            try {
            for(let j=0;j<DataBASE.length;j++){
                AddtoTable(DataBASE[j])  
            } 
            } catch (error) {
                
            }

    }

                

    function AddtoTable(Exigence){
        let tbody=document.querySelector("tbody")
        let tr=document.createElement('tr')
        for(let i=0;i<11;i++){
            var td=document.createElement('td')
            td.innerHTML=Exigence[defaultKeysOrder[i]]
            if(i==8){
                td.setAttribute('colspan',3)
            }
            tr.appendChild(td)
        }
        tbody.appendChild(tr)
    }


    function AddHead(){
        
        
        DataBASE=JSON.parse(load_json())

        let thead=document.querySelector("thead")
        let tr=document.createElement('tr')
        while(thead.firstChild){
            thead.removeChild(thead.lastChild)
        }
        try {
                Exigence=DataBASE[0]
            for(let i=0;i<11;i++){
                var th=document.createElement('th')
                if(i==8){
                    th.setAttribute('colspan',3)
                }
                th.innerHTML=Object.keys(Exigence)[i]

                tr.appendChild(th)
            }
            thead.appendChild(tr)
        } catch (error) {
            
        }
    
        
    }





        useEffect(()=>{
            AddHead()
            InitAddExigence()
        })








    ///function of the page


    function AddRow(){
        let Table=document.querySelector('table')
        let New=document.createElement('tr')
        for(let i=0;i<11;i++){
            
            var td=document.createElement('td')
            
            if(i==0){
            td.innerHTML=parseInt(Table.children[1].children[Table.children[1].children.length-1].children[0].innerHTML)+1
            }

            if(i==8){
                td.setAttribute('colspan',3)
            }

            if(i==10){
                let date= new Date()
                td.innerText=date.toLocaleString('fr',{day:'2-digit',month:'2-digit',year:'numeric'})
            }
            New.appendChild(td)
        }

        
        Table.children[1].appendChild(New)
    }


    function sleep(ms){
        return new Promise(resolve=>setTimeout(resolve,ms))
    }

    // function SaveRow(){
        
    //     let Table=document.querySelector('table')
    //     for(raw of Table.children[1].children){
    //         json={}
    //         for(let i=0;i<raw.children.length;i++){
    //             json[Object.keys(Exigence)[i]]=raw.children[i].innerHTML
    //         }
    //         console.log(json)
    //         // try {
    //         //     POST(json)  
    //         // } catch {
    //         //     PUT(json)
    //         // }finally{

    //         // }
    //     }
    // }

    function SaveRow(){
        
        let Table=document.querySelector('table')
        let raw =Table.children[1].children[Table.children[1].children.length -1]
        let json={}
        for(let i=0;i<raw.children.length;i++){
            json[Object.keys(Exigence)[i]]=raw.children[i].innerHTML
        }

        try {
            POST(json)  
        } catch (error) {
            console.log(error)
        }
        
    }




    function DeleteRow(){
        let Table=document.querySelector('table')
        let raw =Table.children[1].children[Table.children[1].children.length -1]
        let json={}
        for(let i=0;i<raw.children.length;i++){
            if(i==0){
            json[Object.keys(Exigence)[i]]=parseInt(raw.children[i].innerHTML)

            }else{
            json[Object.keys(Exigence)[i]]=raw.children[i].innerHTML 
            }
            
        }
        console.log(json['id'])
        try {
            DELETE(null,json['id'])
            
        } catch (error) {
            console.log(error)
        }
    }






    function RemoveColumn(){
    

    }




    function AddColumn(){
        let X=document.querySelector('input[name=col-name]')
        console.log(X.value)
        let Table=document.querySelector('table')
        let New=document.createElement('th')
        New.innerHTML=X.value
        Table.children[0].children[0].appendChild(New)

        let tbody=document.querySelector('tbody')
        for(let e of tbody.children){
            var td=document.createElement('td')
            e.appendChild(td)
        }
    }


        const urlI = useRef(null)
        const headersI = useRef(null)
        const resourcesI = useRef(null)

        const btgl = useRef(null)



  return (
    <div className='app__database'>
        
          <div style={{marginTop:'0px',overflow:'scroll',maxHeight:"70vh",width: '100%'}}>
              <table contentEditable={true} aria-expanded="true"  >
                <thead >
                    
                </thead>
                <tbody id='tbody'>
                    
                </tbody>
              </table>
          </div>

          <br/>
          <div style={{display:'flex',flexDirection:'row',margin:'0 auto',width:" 300px",justifyContent: "center"}}>
              <input type="button" value="Add" onClick={()=>AddRow()} style={{width:'100px',height:'20px',marginRight:'5px'}}/>
              <input type="button" value="Save" onClick={()=>SaveRow()} style={{width:'100px',height:'20px',marginRight:'5px'}}/>
              <input type="button" value="Delete" onClick={()=>DeleteRow()} style={{width:'100px',height:'20px',marginRight:'5px'}}/>

              

            </div>  
            <br/>

            <div style={{float:'right',justifyContent: 'space-between'}}>
                <a href="/Insertion"><input type="button" value="Ok" style={{width:'100px',height:'20px',marginRight:'5px'}}/></a> 
                <a href="#"><input type="button" value="Cancel" style={{width:'100px',height:'20px',marginRight:'5px'}}/></a>
            </div>

    </div>
  )
}

export default PageWrapper(Database,'Database','section')
