import React, { useCallback, useEffect, useRef, useState } from 'react'
import './Insertion.css'
import { PageWrapper,Getjson } from '../../Wrapper'
import {url,ID,headers} from '../../Wrapper/Getjson/Getjson'


export let DELETE=async function(DATA,id){
    var settings={
        mode: "cors",
        method:'DELETE',
        headers:headers
        }
        try {
                const ResponseData= await fetch(url+'/'+id, settings);
                console.log(ResponseData)
                const Data = await ResponseData.json();
                if(ID==1){
                    sessionStorage.setItem('init_Data',JSON.stringify(Data)) 
        
                }else if (ID==2){
                    sessionStorage.setItem('init_Data',JSON.stringify(Data.record)) 
                }
            }
         catch (error) {

        } 
}

export const POST=async function(DATA){
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
            sessionStorage.setItem('init_Data',JSON.stringify(Data.record)) 
        }
    } catch (error) {

    }

}

export const PUT=async function(DATA){
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
        if(ID==1){
            sessionStorage.setItem('init_Data',JSON.stringify(Data)) 

        }else if (ID==2){
            sessionStorage.setItem('init_Data',JSON.stringify(Data.record)) 
        }
    } catch (e) {
        console.log(e)
    }    
}

const Insertion = () => {
   

    function load_json(){
        var Database
        if(ID==1){
            Database=sessionStorage.getItem('init_Data')
        }else if(ID==2){
            Database=sessionStorage.getItem('init_Data')
        }
        return Database
    }
    
    
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
        var DataBASE=JSON.parse(load_json())
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
    
    var instruction

    
    function Add(){  
        console.log('add')
        instruction='Add'
        Display()   
        POST(Exigence)
        sessionStorage.setItem('Instruction',JSON.stringify(instruction))
    }
    
   
    
    function Save(){
        console.log("save")
        instruction='Save'
        Display()
        PUT(Exigence)
        sessionStorage.setItem('Instruction',JSON.stringify(instruction))
    }
    

    
    const Delete=()=>{
        console.log("delelte")
        instruction='Delete'
        Display()
        console.log(Exigence.id)
        try {
            DELETE(null,Exigence.id)
        } catch (error) {
            console.log(error)
        }
        sessionStorage.setItem('Instruction',JSON.stringify(instruction))
    
    }

    var DATE = new Date()

    var Exigence = {
        'id': null,
        'type1': null,
        'type2': null,
        'type3': null,
        'type4': null,
        'type5': null,
        'type6': null,
        'type7': null,
        'exigence': null,
        'source': null,
        'date_du_jour': null,
    }

    const Display = () => {
        Exigence.id = parseInt(document.querySelector('input#id').value) || null
        Exigence.type1 = document.querySelector('input#T1').value || null
        Exigence.type2 = document.querySelector('input#T2').value || null
        Exigence.type3 = document.querySelector('input#T3').value || null
        Exigence.type4 = document.querySelector('input#T4').value || null
        Exigence.type5 = document.querySelector('input#T5').value || null
        Exigence.type6 = document.querySelector('input#T6').value || null
        Exigence.type7 = document.querySelector('input#T7').value || null
        Exigence.exigence = document.querySelector('textarea#exigence').value || null
        Exigence.source = document.querySelector('textarea#source').value || null
        Exigence.date_du_jour = DATE.toLocaleString('fr', { day: '2-digit', month: '2-digit', year: 'numeric' }) || null
        sessionStorage.setItem('Exigence', JSON.stringify(Exigence))
        console.log(Exigence)
    }

    const displayAllInfo = () => {
        Display()
        var DataBASE = JSON.parse(load_json())
        try {
            var id = Exigence.id
            var tdb = DataBASE.filter(X => X['id'] == id)
            if (tdb.length > 0) {
                for (let j = 1; j < 8; j++) {
                    try {
                        var ip = document.querySelector('input[id=T' + j.toString() + ']')
                        ip.value = tdb[0]['type' + j]
                    } catch (error) { }
                }
                for (let j = 8; j < 10; j++) {
                    try {
                        var tx = document.querySelectorAll('textarea')
                        tx[j - 8].value = tdb[0][Object.keys(Exigence)[j]]
                    } catch (error) { }
                }
            } else {
                Cancel()
            }
        } catch (error) {

        }
    }

    const Cancel = () => {
        var X = []
        X.push(document.querySelectorAll('input[type=number]'))
        X.push(document.querySelectorAll('input[type=text]'))
        X.push(document.querySelectorAll('textarea'))
        for (let x of X) {
            for (let xe of x) {
                if (xe.id != 'id'){
                    xe.value = ''
                } 
            }
        }
    }

    return (
        <div className='app__insertion' >
            <div id='insertion' style={{height:'60vh'}}>
                <form action="" style={{ display: 'inline-flex', flexDirection: 'column',justifyContent:'center',textAlign:'center',alignContent:"center"}} autoComplete="false" >


                    <div style={{ margin: '0 auto', display: 'inline-flex', flexDirection: 'column' }}>
                        <label htmlFor="id" style={{ textAlign: "center" }}>id</label>
                        <input  type="number" name="id" id="id" required="required" onInput={() => displayAllInfo()} />
                    </div>

                    <div style={{ display: 'flex' }}>

                        <div style={{ margin: '0 auto', display: 'inline-flex', flexDirection: 'column' }}>
                            <label htmlFor="T1" style={{ textAlign: "center" }}>type1</label>
                            <input  type="text" name="T1" id="T1" required='required' list="LT1" />
                            <datalist id="LT1">
                                <option value="none"></option>
                            </datalist>
                        </div>
                        <div style={{ margin: '0 auto', display: 'inline-flex', flexDirection: 'column' }}>
                            <label htmlFor="T2" style={{ textAlign: "center" }}>type2</label>
                            <input  type="text" name="T2" id="T2" list="LT2" />
                            <datalist id="LT2">
                                <option value="none"></option>
                            </datalist>
                        </div>
                        <div style={{ margin: '0 auto', display: 'inline-flex', flexDirection: 'column' }}>
                            <label htmlFor="T3" style={{ textAlign: "center" }}>type3</label>
                            <input  type="text" name="T3" id="T3" list="LT3" />
                            <datalist id="LT3">
                                <option value="none"></option>
                            </datalist>
                        </div>


                    </div>
                    <br />
                    <div className='line2' display={{display:'flex'}} >

                        <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
                            <label htmlFor="T4" style={{ textAlign: "center" }}>type4</label>
                            <input  type="text" name="T4" id="T4" list="LT4" />
                            <datalist id="LT4">
                                <option value="none"></option>
                            </datalist>
                        </div>
                        <div style={{display: 'inline-flex', flexDirection: 'column' }}>
                            <label htmlFor="T5" style={{ textAlign: "center" }}>type5</label>
                            <input  type="text" name="T5" id="T5" list="LT5" />
                            <datalist id="LT5">
                                <option value="none"></option>
                            </datalist>
                        </div>
                        <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
                            <label htmlFor="T6" style={{ textAlign: "center" }}>type6</label>
                            <input  type="text" name="T6" id="T6" list="LT6" />
                            <datalist id="LT6">
                                <option value="none"></option>
                            </datalist>
                        </div>
                        <div style={{display: 'inline-flex', flexDirection: 'column' }}>
                            <label htmlFor="T7" style={{ textAlign: "center" }}>type7</label>
                            <input type="text" name="T7" id="T7" list="LT7" />
                            <datalist id="LT7">
                                <option value="none"></option>
                            </datalist>
                        </div>

                    </div>


                    <br />
                    <div style={{ margin: '0 auto', display: 'inline-flex', flexDirection: 'row' }} >
                        <div style={{ margin: '0 auto', display: 'inline-flex', flexDirection: 'column' }}>
                            <label htmlFor="exigence" style={{ textAlign: "center" }}>Exigence</label>
                            <textarea name="exigence" id="exigence" cols="30" rows="7" style={{ marginRight: "50px"}} required="required"></textarea>
                        </div>

                        <div style={{ margin: '0 auto', display: 'inline-flex', flexDirection: 'column' }}>
                            <label htmlFor="source" style={{ textAlign: "center" }}>Source</label>
                            <textarea name="source" id="source" cols="30" rows="7" style={{ marginLeft: '50px'}} required="required"></textarea>
                        </div>

                    </div>
                    


                    {/* <iframe src='/Selection#Graph' name="page-selection"></iframe> */}


                </form>

                
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', margin: '0 auto', width: '200px', justifyContent: 'space-between' }}>
                <input type="button" value="Save" onClick={() => Save()} style={{ width: '100px', height: '20px', marginRight: '5px' }} />
                <input type="button" value="Add" onClick={() => Add()} style={{ width: '100px', height: '20px', marginRight: '5px' }} />
                <input type="button" value="Delete" onClick={() => Delete()} style={{ width: '100px', height: '20px', marginRight: '5px' }} />

            </div>

            <br />


            <div style={{ float: 'right', justifyContent: 'space-between' }}>

                <a href="/Database"><input type="submit" value="Ok" onClick={() => Display()} style={{ width: '100px', height: '20px', marginRight: '5px' }} /></a>
                <input type="button" value="Cancel" onClick={() => Cancel()} style={{ width: '100px', height: '20px', marginRight: '5px' }} />
            </div>


        </div>
    )
}

export default PageWrapper(Insertion, 'Insertion', 'section')

