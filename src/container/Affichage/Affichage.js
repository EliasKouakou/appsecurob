import React, { useEffect } from 'react'
import './Affichage.css'
import { PageWrapper,Getjson } from '../../Wrapper'
import { Link } from 'react-router-dom'
import { ReactDOM } from 'react'

const Affichage = () => {

  
  var ID=sessionStorage.getItem('id')

  var data=sessionStorage.getItem('Selection')
  var Selec=JSON.parse(data)


const Display=(nested)=>{


  
 


    useEffect(()=>{
      try {
        const content=document.querySelector('div.content')
        // console.log(content)
      
        while(content.firstChild){
          content.removeChild(content.lastChild)
        }
      } catch (error) {
        // console.log(error)
      }
      const T=document.createElement("ul")
      T.setAttribute('class','tree')
      T.classList.add('tree')
      var L=Array(9)
      var U=Array(9)
      var tampon=nested[0]
      var j=0
      for (let line of Object.keys(nested)){
          var i=0;
          const X=InsertRec(i,line,nested[line],L,U)
          T.appendChild(X[0])
          const content=document.querySelector("div.content")
          content.appendChild(T)   
          j++
          tampon=nested[j]
      }
      AttributeOpen()
      
    // console.log(document)
  })

      
      
  }

  function InsertRec(i,keys,line,L,U){
      L[i]=document.createElement('li')
      U[i]=document.createElement('ul')
      let BR=1
      
      if(i<5){
          try {
              if(Object.keys(line)[i]!='null' && Object.keys(line)[i]!=null && Object.keys(line)[i]!='None'){
                  var A=document.createElement('a')
                  A.setAttribute('href','#')  
                  A.innerHTML=keys
                  if(typeof(line)==typeof('')){
                      A.innerHTML=keys+'    :    '+ line
                  }
                  L[i].appendChild(A)
                  for(let line2 of Object.keys(line)){
                      
                      const R=InsertRec(i+1,line2,line[line2],L,U)
                  BR=Math.max(i,R[1])
                  U[i].appendChild(R[0])
                  L[i].appendChild(U[i])  
                  }   
              }
      
          } catch (error) {
              // console.log(error)
          } 
      } 

      return [L[i],BR]   
  }


  var nested={}
  function toNestedJSON(nested,line){
    try {
      if(!Object.keys(nested).includes(line['type1'])){
        if(line['type1']=='None' || line['type1']==null || line['type1']=='null'){
          nested[line['exigence']]=line['source']
        }else{
          nested[line['type1']]={}
        }
      }
      
    
      if(!Object.keys(nested[line['type1']]).includes(line['type2'])){
        if(line['type2']=='None' || line['type2']==null || line['type2']=='null'){
          nested[line['type1']][line['exigence']]=line['source']
        }else{
          nested[line['type1']][line['type2']]={}
        }
      }

      
      if(!Object.keys(nested[line['type1']][line['type2']]).includes(line['type3'])){
        if(line['type3']=='None' || line['type3']==null || line['type3']=='null'){

          nested[line['type1']][line['type2']][line['exigence']]=line['source']
        }else{
          nested[line['type1']][line['type2']][line['type3']]={}
        }
      }

      
      if(!Object.keys(nested[line['type1']][line['type2']][line['type3']]).includes(line['type4'])){
        if(line['type4']=='None' || line['type4']==null || line['type4']=='null'){
          nested[line['type1']][line['type2']][line['type3']][line['exigence']]=line['source']
        }else{
          nested[line['type1']][line['type2']][line['type3']][line['type4']]={}
        }
      }

      if(!Object.keys(nested[line['type1']][line['type2']][line['type3']][line['type4']]).includes(line['type5'])){
        if(line['type5']=='None' || line['type5']==null || line['type5']=='null'){

          nested[line['type1']][line['type2']][line['type3']][line['type4']][line['exigence']]=line['source']
        }else{
          nested[line['type1']][line['type2']][line['type3']][line['type4']][line['type5']]={}
        }
      }

      if(!Object.keys(nested[line['type1']][line['type2']][line['type3']][line['type4']][line['type5']]).includes(line['type6'])){
        if(line['type6']=='None' || line['type6']==null || line['type6']=='null'){
          nested[line['type1']][line['type2']][line['type3']][line['type4']][line['type5']][line['exigence']]=line['source']
        }else{
          nested[line['type1']][line['type2']][line['type3']][line['type4']][line['type5']][line['type6']]={}
        }
      }

      if(!Object.keys(nested[line['type1']][line['type2']][line['type3']][line['type4']][line['type5']][line['type6']]).includes(line['type7'])){
        if(line['type7']=='None' || line['type7']==null || line['type7']=='null'){

          nested[line['type1']][line['type2']][line['type3']][line['type4']][line['type5']][line['type6']][line['exigence']]=line['source']
        }else{
          nested[line['type1']][line['type2']][line['type3']][line['type4']][line['type5']][line['type6']][line['type7']]={}
        }
      }

    } catch (error) {
      // console.log(error)
    }
      

    
    return nested
  }





  function load_json(){

      var Database
      if(ID==1){
          Database=sessionStorage.getItem('init_Data')
          Database=JSON.parse(Database)
    
      }else if(ID==2){
          Database=sessionStorage.getItem('init_Data')
          Database=JSON.parse(Database)
      }
      return Database
  }


  function AttributeOpen(){
      var tree=document.querySelectorAll('ul.tree a:not(:last-child)');
      for(var i = 0; i < tree.length; i++){
          tree[i].addEventListener('click', (e) => {
              console.log(e.target);
              var parent = e.target.parentElement;
              var classList = parent.classList;
              if(classList.contains("open")) {
                  classList.remove('open');
                  var opensubs = parent.querySelectorAll(':scope .open');
                  for(var i = 0; i < opensubs.length; i++){
                      opensubs[i].classList.remove('open');
                  }
              } else {
                  classList.add('open');
              }
              e.preventDefault();
        });
    }
  }

  
  function Filter(){
    var init_Data=load_json()
    var L=[]
  
    for(let e in Selec){
      if(Selec[e]){
        var A=init_Data.filter(line=>Object.values(line).includes(e))
        for(let a of A){
          L.push(a)
        }  
      }      
    }
    for(let line of L){
      nested=toNestedJSON(nested,line)
    }
    
    Display(nested)
  }

  window.load=Filter()

  
  
  return (
    <div className='app__affichage'>

        <div className="content" style={{overflowY:'scroll',overflowX:'scroll',border:'1px solid black',width: '100%',minHeight:'75vh',justifyContent:'left',textAlign:'left',alignContent:'start'}}>
        </div>
              
        <br/>
        <div style={{float:'right',justifyContent: 'space-between',bottom: '10px'}}>
            <Link to="/Selection"><input type="button" value="Ok" style={{width:'100px',height:'20px',marginRight:'5px'}}/></Link> 
        </div>
    </div>
  )
}

export default PageWrapper(Affichage,'Affichage','section')
