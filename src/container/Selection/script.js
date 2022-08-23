
// let url='http://localhost:3000/exigences' 

var ID=sessionStorage.getItem('id')

var data=sessionStorage.getItem('Selection')
Selec=JSON.parse(data)


function Display(nested){
    
    const T=document.createElement("ul")
    T.setAttribute('class','tree')
    T.classList.add('tree')
    var L=Array(9)
    var U=Array(9)
    var tampon=nested[0]
    var j=0
    for (line of Object.keys(nested)){
        var i=0;
        const X=InsertRec(i,line,nested[line],L,U)
        T.appendChild(X[0])
        document.querySelector("div.content").appendChild(T)   
        j++
        tampon=nested[j]
    }
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
                for(line2 of Object.keys(line)){
                    
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


nested={}


function load_json(){

  var Database
  if(ID==1){
      Database=sessionStorage.getItem('init_Data')
      Database=JSON.parse(Database)
 
  }else if(ID==2){
      Database=sessionStorage.getItem('init_Data_2')
      Database=JSON.parse(Database)
  }
  return Database
}



function Filter(){
  init_Data=load_json()
  console.log(ID)

  console.log(init_Data)
  L=[]
 
  for(e in Selec){
    if(Selec[e]){
      A=init_Data.filter(line=>Object.values(line).includes(e))
      for(a of A){
        L.push(a)
      }  
    }
    
    
  }
  // console.log(L)
  for(line of L){
    nested=toNestedJSON(nested,line)
  }

    // console.log(nested)

  
  Display(nested)
}

Filter()