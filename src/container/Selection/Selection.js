import './Selection.css'
import React, { useCallback, useEffect, useState} from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, Controls, updateEdge } from 'react-flow-renderer';
import CustomNode from './customNodes'
import CustomNodeGroup from './customNodesCombox'
import { PageWrapper} from '../../Wrapper'
import {url,ID,headers} from '../../Wrapper/Getjson/Getjson'
import {DELETE,POST,PUT} from '../Insertion/Insertion'
//insert a delay before loading this page
// const nodeTypes = { selectNode: CustomNode }
const nodeTypes = { selectNode: CustomNodeGroup }
var Selec={}

const Selection = () => {
  // sessionStorage.setItem("Selection",JSON.stringify({}))

  const GetSortOrder = (prop) => {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
  }    




    function load_json(){
        var Database

        if(ID==1){
            Database=sessionStorage.getItem('init_Data')
        }else if(ID==2){
            Database=sessionStorage.getItem('init_Data')
        }
        return Database
    }

  // Data=Data.sort(GetSortOrder('type1')).sort(GetSortOrder('type2'))
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
  
  const Opacity=0.5
  var clicked="unclicked"; 
  
  function PopulateNodesEdges(){
    var nested={}
    var Data=JSON.parse(load_json())


      for(let line of Data){
        nested=toNestedJSON(nested,line)}

    // nested={'Conception physique':nested['Conception physique']}
    

  
   
    

    function Action2(list){
      var ret=[null,'not']
      let nc={...nested}
      let a
      try {
        for(let key of list){
          a=nc[key]
          nc=a
        }
        if(typeof(nc[Object.keys(nc)[0]])!==typeof({})){
          ret[0]=Object.entries(nc).join('\n\n')
          ret[1]='end'
        }

        } catch (error) {
      }
      return ret
    }
    function Action(list){
      var ret=[null,'not']
      let nc={...nested}
      let a
      try {
        for(let key of list){
          a=nc[key]
          nc=a
        }
        if(typeof(nc[Object.keys(nc)[0]])!==typeof({})){
          ret[0]=Object.entries(nc).join('\n\n')
          ret[1]='end'
        }

        } catch (error) {
      }
      return ret

    }

  
    var Color=''
    var i=0

    for (let parent in nested)
    {
        initialNodes.push(
            {
                id:parent,
                sourcePosition:'right',
                type:'selectNode',

                data:{label:parent,click:clicked,disable:false,color:'white',Exigence:{'type1':parent}},
                position:{x:0,y:1000*i},
                style:{opacity:1}
  
            }
        )
        var j=0
        for (let child in nested[parent]){
           
            initialNodes.push(
                { 
                    id:child,
                    sourcePosition:'right',
                    targetPosition:'left',
                    type:'selectNode',

                    // data:{label:child,Data:Action(parent,child)[0],class:Action(parent,child)[1],click:clicked,disable:true,color:Color,Exigence:{'type1':parent,'type2':child}},
                    data:{label:child,Data:Action([parent,child])[0],class:Action([parent,child])[1],click:clicked,disable:true,color:Color,Exigence:{'type1':parent,'type2':child}},
                    parentNode:parent,
                    style:{opacity:Opacity},
                    position:{x:450,y:300*(Object.keys(nested[parent]).length/'2'-j)}
                }
            )
            
            initialEdges.push(
                {
                    id: parent+'-->'+child,
                    source: parent,
                    type: 'smoothstep',
                    target: child,
                    animated: false,
                    style:{stroke:'var(--black)',strokeWidth:'5px'} ,
                   
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

                            // data:{label:child2,Data:Action(parent,child,child2)[0],class:Action(parent,child,child2)[1],click:clicked,disable:true,color:Color,Exigence:{'type1':parent,'type2':child,'type3':child2}},
                            data:{label:child2,Data:Action([parent,child,child2])[0],class:Action([parent,child,child2])[1],click:clicked,disable:true,color:Color,Exigence:{'type1':parent,'type2':child,'type3':child2}},
                            parentNode:child,
                            style:{opacity:Opacity},
                            position:{x:450,y:100*(Object.keys(nested[parent][child]).length/'2'-k)}

                        }
                    )

                    
                    initialEdges.push(
                        {
                            id: child+'-->'+child2,
                            source: child,
                            type: 'smoothstep',
                            target: child2,
                            animated: false,  
                            style:{stroke:'var(--black)',strokeWidth:'5px'}  
                    

                        }
                    )
                    let l=0
                    for (let child3 in nested[parent][child][child2]){
                
                      if(typeof(nested[parent][child][child2][child3])===typeof({})){
                          initialNodes.push(
                              {
                                  id:child3,
                                  sourcePosition:'right',
                                  targetPosition:'left',
                                  type:'selectNode',
      
                                  data:{label:child3,Data:Action([parent,child,child2,child3])[0],class:Action([parent,child,child2,child3])[1],click:clicked,disable:true,color:Color,Exigence:{'type1':parent,'type2':child,'type3':child2,'type4':child3}},
                                  parentNode:child2,
                                  style:{opacity:Opacity},
                                  position:{x:450,y:60*(Object.keys(nested[parent][child][child2]).length/'2'-l)}
      
                              }
                          )
  
                          initialEdges.push(
                              {
                                  id: child2+'-->'+child3,
                                  source: child2,
                                  type: 'smoothstep',
                                  target: child3,
                                  animated: false,  
                                  style:{stroke:'var(--black)',strokeWidth:'5px'}  
                          
      
                              }
                          )
      
                        }
                      l++

                      }
                }
                
                k++
            }
  
            j++
        }
      i++
    }
  
  }
  
  PopulateNodesEdges()

  const store=useCallback((element)=>{

        // console.log('clicked',element.target.id)
            setNodes((els)=>{
              const FindElement=(node)=>{
                if(node.id==element.target.value){
                  return node
                }
              }
              const changeNode=(node,Find)=>{

                if(node==Find[0]){
                  
                  if(node.style.opacity==1 && element.target.id=='true'){
                    if(element.target.title=='end'){
                      Selec[element.target.value]=true;
                      sessionStorage.setItem("Selection",JSON.stringify(Selec))
                      node.data.color='red'


                    }
                    node.data.click="unclicked"
                    return node
                  }
                  if(node.style.opacity==1 && element.target.id=='false'){
                    if(element.target.title=='end'){
                      Selec[element.target.value]=false;
                      sessionStorage.setItem("Selection",JSON.stringify(Selec))
                      node.data.color='blue'
                    }
                    node.data.click="clicked"
                    return node
                  }
    
                }
                return node
              }
                const Find=els.filter((node)=>FindElement(node))
                return [...els.map((node)=>changeNode(node,Find))]
              
            })
 
  },[])


  const AddNodeEdge=(e)=>{
    var prev
    if(e.target.name){
      function check(x){
        if(x.id==e.target.value){
          prev=x
          e.target.title='not'
          x.data.Data='not'
          return x 

        }}

      setNodes((els) => {
        console.log(prev)
        els[els.indexOf(prev)]=els.filter(check)[0]
        console.log(els[els.indexOf(check)[0]])
        els.filter(check)[0].data.Exigence['type'+String(Object.keys(els.filter(check)[0].data.Exigence).length+1)]= `${e.target.value}-newNode`
        const ex=els.filter(check)[0].data.Exigence
        
        console.log('exigence',ex)
        POST(ex)
        return [...els,{
                id: `${e.target.value}-newNode`,
                sourcePosition: 'right',
                targetPosition: 'left',
                type: 'selectNode',
                parentNode:els.filter(check)[0].id,
                data: { label: `${e.target.value}-newNode`,color:'',Data:{},class:'end',disable:true,Exigence:ex},
                style:{opacity:Opacity},
                position:{ x: els.filter(check)[0].position.x+450, y: els.filter(check)[0].position.y }
            }]
      })
      setEdges((els) => {
        return [...els,{
                id: `${e.target.value}-->${e.target.value}-newNode`,
                source: `${e.target.value}`,
                type: 'smoothstep',
                target: `${e.target.value}-newNode`,
                animated: false,
                style:{stroke:'var(--black)',strokeWidth:'5px'}
            }]
      })
    }
    
    }
  
  function updateAllChild(parent,els){
    function updateChild(parent,els){

      if(parent.parentNode){
        console.log(els)
        for(let x of els){
          console.log(x)
          if(x.parentNode==parent.id){
            console.log(396,x)
            if(parent.style.opacity==0.5){
              x.style.opacity=0.5
              x.data.disable=true
            } 
          updateAllChild(x,els)

          }
      }
      return parent
      }else{
        return parent
      }
      
    }
    parent=updateChild(parent,els)
    setNodes((els)=>{
      return [...els]
    })
    
  }

  const updateNode=useCallback((e)=>{  
    if(e.target.name){
        function checkParent(x){ 
          if(x.id==e.target.value){
              // x.style.opacity=!x.style.opacity
              // x.data.disable=false
              return x
          }
        }
        function changeHidden(x,Parent,els){
          if(e.target.id){
            
            if(Parent.style.opacity==1){
              if(String(e.target.value)==String(x.parentNode)){
                x.style.opacity=(x.style.opacity)%1+0.5
                x.data.disable=false
                Parent=x
  
                
              }
            }

          }else{
            Parent.style.opacity=0.5
            // setNodes((els)=>{
            //   return [...els]
            // })

          }

          
          if(Parent.style.opacity==0.5){
            console.log('im here')
            if(String(e.target.value)==String(x.parentNode)){
              // console.log(415,x)
              x.style.opacity=0.5
              x.data.disable=true
              updateAllChild(x,els)
          }
          
        }

        return x
  
      }
          setNodes((els) => {
          const Parent=els.filter(checkParent)
          return [...els.map((x)=>changeHidden(x,Parent[0],els))]
        })
    
      }
    
  },[])



  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);
  const Ok=()=> { 
    sessionStorage.setItem('Selection',JSON.stringify(Selec))  
  }

  function Cancel() { 

    Selec={}
    function CancelCallback(x){
      if(x.targetPosition!=null){
        console.log('here')
        x.data.disable=true
        x.style.opacity=0.5
        x.data.color=''
      }
      console.log(x)
      return x
    }
      setNodes((els) => {

        return [...els.map((x)=>CancelCallback(x))]
      })
  }

  return (
    <div className='app__selection'>
      <ReactFlow
        aria-disabled="true"
        className='Graph'
        id='Graph'
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        style={{ height:'70vh',width: '100%',border:'1px solid var(--secondary-color)' }}

        onNodeDoubleClick={(e)=>{AddNodeEdge(e)}}
        onNodeClick={(e)=>{updateNode(e);store(e)}}      
      >
      
    
        <Controls ></Controls>
      </ReactFlow>

      <div style={{ height: '5vh' }}>
        <a href='/Affichage'><input type={'button'} value='Ok' onClick={Ok} style={{ width: '100px', height: '20px', marginRight: '5px' }} /></a>
        <input type={'button'} value='Cancel' onClick={Cancel} style={{ width: '100px', height: '20px', marginLeft: '5px' }} />

      </div>
    </div>


  );
};

export default PageWrapper(Selection, 'Selection', 'section');
