import './Selection.css'
import React, { useCallback, useState,useRef } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, Controls, updateEdge } from 'react-flow-renderer';
import CustomNode from './customNodes'
import { PageWrapper,Getjson } from '../../Wrapper'
import fetch from 'cross-fetch'
import { ReactDOM } from 'react';
import { render } from '@testing-library/react';



const nodeTypes = { selectNode: CustomNode }

var Selec={}






const Selection = () => {

  const effectRan=useRef(false)
  const json_server = {
    "json global":
    {
        "id": 2,
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

let url = json_server["json global"].url
let ID = json_server["json global"].id
let headers = json_server["json global"].headers
let resources = json_server["json global"].resources





const urlI = useRef(null)
const headersI = useRef(null)
const resourcesI = useRef(null)

const btgl = useRef(null)


const GET = async function () {
  
  
  // const [clicked, setClicked] = useState(false)
  // function toggle(value) {
  //   return !value;
  // }

  const settings = {
      mode: 'cors',
      method: 'GET',
      headers: JSON.parse(headers)
  };
  const ResponseData = await fetch(url, settings)
  const Data = await ResponseData.json();

  console.log(ResponseData)
  if (ID == 1) {
      sessionStorage.setItem('init_Data', JSON.stringify(Data))

  } else if (ID == 2) {
      sessionStorage.setItem('init_Data', JSON.stringify(Data.record))

  }
  } 






function Ok() { 
  sessionStorage.setItem('Selection',JSON.stringify(Selec))  
 }
 
function Cancel() { console.log('cancel') }

const Select_json = (e) => {

  url = json_server["json global"].url
  ID = json_server["json global"].id
  headers = JSON.stringify(json_server["json global"].headers)
  resources = json_server["json global"].resources
  sessionStorage.setItem('id', ID)



  try {
      if (e.value == 'json local') {
          e.value = 'json global'
      }
      else if (e.value == 'json global') {
          e.value = 'json local'
      }

      url = json_server[e.value].url
      ID = json_server[e.value].id
      headers = JSON.stringify(json_server[e.value].headers)
      resources = json_server[e.value].resources
      console.log(ID)
      sessionStorage.setItem('id', ID)

      // urlI.current.value = url
      // headersI.current.value = headers
      // resourcesI.current.value = resources

      document.getElementById("url").value=url
      document.getElementById("headers").value=headers
      document.getElementById("resources").value=resources

      GET()
  } catch (error) {
  }


}

const Select_link_json = () => {
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

function GetSortOrder(prop) {    
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
    // console.log(Database)
    return Database
  }

  var Data=JSON.parse(load_json())
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
  
  const [nodeHidden,setNodeHidden]=useState(true)
  const [Opacity,setOpacity]=useState(0.5)
  var clicked="unclicked"; 
  
  function PopulateNodesEdges(){
    // console.log(Data)
    var nested={}
    for(let line of Data){
        
        nested=toNestedJSON(nested,line)
    }
    

    nested={'Conception physique':nested['Conception physique']}
    var i=0

  
    // Object.keys(nested).forEach(
    //   (parent)=>{
    //     console.log(parent)
    //     Object.keys(nested[parent]).forEach((child)=>console.log(child))
    //   }
    // ) //to use to define initial nodes and initial edges
    

    function Action(parent,child,child2){
      var ret=[null,'not']
      try {
        if(typeof(nested[parent][child][Object.keys(nested[parent][child])[0]])!==typeof({})){
          ret[0]=Object.entries(nested[parent][child]).join('\n\n')
          ret[1]='end'
        }

        if(typeof(nested[parent][child][child2][Object.keys(nested[parent][child][child2])[0]])!==typeof({})){
          ret[0]=Object.entries(nested[parent][child][child2]).join('\n\n')
          ret[1]='end'
        }
      } catch (error) {
        
      }
      return ret

    }


    for (let parent in nested)
    {
        initialNodes.push(
            {
                id:parent,
                sourcePosition:'right',
                type:'selectNode',
                data:{label:parent,click:clicked},
                // hidden:false,
                position:{x:0,y:600*i},
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
                    data:{label:child,Data:Action(parent,child)[0],class:Action(parent,child)[1],click:clicked},
                    // data:{label:child,Data:AddExi(parent,child)},
        
      
                    // hidden:nodeHidden,
                    parentNode:parent,
                    style:{opacity:Opacity},
                    position:{x:450,y:600*i+ 125*(Object.keys(nested[parent]).length%2-j)}
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
                            data:{label:child2,Data:Action(parent,child,child2)[0],class:Action(parent,child,child2)[1],click:clicked},
                            // hidden:nodeHidden,
                            parentNode:child,
                            style:{opacity:Opacity},
                            position:{x:450*2,y:600*i+ 125*(Object.keys(nested[parent]).length%2-j)+75*(Object.keys(nested[parent][child]).length%2-k)}
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
    
    if(effectRan.current===false){
    
          
            setNodes((els)=>{
              const FindElement=(node)=>{
                if(node.id==element.target.id){
                  return node
                }
              }
              const changeNode=(node,Find)=>{
                if(node==Find[0]){
    
                  console.log(node.data)
                  if(node.style.opacity==1 && node.data.click=="clicked"){
                    if(element.target.className=='end'){
                      Selec[element.target.id]=true;
                      element.target.style.backgroundColor='red'
                    }
                    node.data.click="unclicked"
                    return node
                  }
                  if(node.style.opacity==1 && node.data.click=="unclicked"){
                    if(element.target.className=='end'){
                      Selec[element.target.id]=false;
                      element.target.style.backgroundColor='blue'
                    }
                    node.data.click="clicked"
                    return node
                  }
    
                }
                return node
              }
                const Find=els.filter((node)=>FindElement(node))
                console.log(effectRan)
                
                return [...els.map((node)=>changeNode(node,Find))]
              
            })
    }
    effectRan.current=true
  },[])





  const AddNode=useCallback((e)=>{
    if(e.target.name){
      function check(x){
        if(x.id==e.target.innerHTML){
          return x 

        }}

      setNodes((els) => {
        return [...els,{
                id: `${e.target.innerHTML}-newNode`,
                sourcePosition: 'right',
                targetPosition: 'left',
                type: 'selectNode',
                data: { label: `${e.target.innerHTML}-newNode` },
                position:{ x: els.filter(check)[0].position.x+450, y: els.filter(check)[0].position.y }
            }]
      })
    }
     

},[])

  const AddEdge=useCallback((e)=>{
    if(e.target.name){
      setEdges((els) => {

        // console.log(els)
        return [...els,{
                id: `${e.target.innerHTML}-->${e.target.innerHTML}-newNode`,
                source: `${e.target.innerHTML}`,
                type: 'smoothstep',
                target: `${e.target.innerHTML}-newNode`,
                animated: false,
                style:{stroke:'var(--black)',strokeWidth:'5px'}
            }]
      })
    }
   
  
  },[])

  
  
  const updateNode=useCallback((e)=>{


      if(e.target.name){
        function checkParent(x){
          if(x.id==e.target.innerHTML){
              return x
          }
        }
  
        function changeHidden(x,Parent){
          if(Parent.style.opacity==1){
            if(String(e.target.id)==String(x.parentNode)){
              x.style.opacity=(x.style.opacity)%1+0.5
            }
      
          }
  
          
        return x
  
      }
  
          setNodes((els) => {
          const Parent=els.filter(checkParent)
          return [...els.map((x)=>changeHidden(x,Parent[0]))]
        })
    
      }
    
  },[])



  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);


  const initialElements = [...initialNodes, ...initialEdges];
  const [elements, setElements] = useState(initialElements);
  const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);

  const onElementClick = (event, object) => {
    const graphElements = [object.id];

    setElements((els) => {
      setEdges((edges) =>
        edges.sort((a, b) => {
          if (a.source < b.source) return -1;
          if (a.source > b.source) return 1;
          return 0;
        })
      );
      edges.forEach((el) => {
        if (graphElements.includes(el.source)) {
          graphElements.push(el.target);
          el.animated = true;
        } else {
          el.animated = false;
        }
      });
      return [...nodes, ...edges];
    });

  }
  return (
    <div className='app__selection'>

      {/* <div className='app__select_json'>
          <input type="button" value="json global" ref={btgl} onClick={(e) => Select_json(e.target)} />
      </div>

      <br />

      <div className='app__insert'>
          <input type="button" value="SELECT-JSON" onClick={() => Select_link_json()} />
          <input type="text" ref={urlI} name="url" id="url" placeholder="url" />
          <input type="text" ref={headersI} name="headers" id="headers" placeholder="headers" />
          <input type="text" ref={resourcesI} name="resources" id="resources" placeholder="resources" />
      </div> */}

      <br/>
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
        style={{ height:'75vh',width: '100%',border:'1px solid var(--secondary-color)' }}

        
        onNodeDoubleClick={(e)=>{AddNode(e);AddEdge(e)}}
        onNodeClick={(e)=>{updateNode(e);store(e)}}
        
        // onNodeMouseEnter={(e)=>e.target.name?e.target.nextSibling.style.display='block':''}
        // onNodeMouseLeave={(e)=>e.target.name?e.target.nextSibling.style.display='none':''}
        
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
