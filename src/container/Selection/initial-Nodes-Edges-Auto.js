import fetch from 'cross-fetch'
import React from 'react';

var Data
Data=await fetch('http://localhost:3000/exigences')
  .then(res => {  return res.json();})
  .then(data => {return data});


const initialNodes=[]
const initialEdges=[]




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


function PopulateNodesEdges(){

  var nested={}
  for(let line of Data){
      
      nested=toNestedJSON(nested,line)
  }

  var i=0
  for (let parent in nested)
  {
      // console.log(parent)
      
      initialNodes.push(
          {
              id:parent,
              sourcePosition:'right',
              type:'selectNode',
              data:{label:parent},
              position:{x:0,y:250*i}

          }
      )
      var j=0
      for (let child in nested[parent]){
          // console.log(child)

          initialNodes.push(
              {
                  id:child,
                  sourcePosition:'right',
                  targetPosition:'left',
                  type:'selectNode',
                  data:{label:child},
                  position:{x:250,y:250*i+ 100*(Object.keys(nested[parent]).length%2-j)}
              }
          )
          initialEdges.push(
              {
                  id: parent+'-->'+child,
                  source: parent,
                  type: 'smoothstep',
                  target: child,
                  animated: false,  
              }
          )


          var k=0
          for (let child2 in nested[parent][child]){

              if(typeof(nested[parent][child][child2])===typeof({})){
                  initialNodes.push(
                      {
                          id:child2,
                          sourcePosition:'right',
                          targetPosition:'left',
                          type:'selectNode',
                          data:{label:child2},
                          position:{x:250*3,y:250*i+ 50*(Object.keys(nested[parent]).length%2-j)+50*(Object.keys(nested[parent][child]).length%2-k)}
                      }
                  )
                  initialEdges.push(
                      {
                          id: child+'-->'+child2,
                          source: child,
                          type: 'smoothstep',
                          target: child2,
                          animated: false,  
                      }
                  )
              }
              
              k++
          }

          j++
      }
      console.log()
    i++
  }

}


console.log(initialNodes)
console.log(initialEdges)

export default {initialEdges,initialNodes}