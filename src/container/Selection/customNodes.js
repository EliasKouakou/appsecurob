import React, {useCallback,useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import ToggleButton from '@mui/material/ToggleButton';
const handleStyle = { left: 10 };

// function CustomNode({ data, isConnectable }) {
 

//   const Return = useCallback((evt) => {
//   }, []);
//   return (
//     <>
//       <Handle type="target" position='left' isConnectable={isConnectable} />

//       <div>
//         <button id={data.label} title={data.Data} className={data.class} name='button' onClick={Return}  style={{ fontSize: 24, width: '350px' }} >
//           {data.label}
//         </button>
//         {/* <div className='exigence' style={{display:'none',position:'absolute',width:'1000px',height:'200px',transform:'',backgroundColor:'white',color:'black',zIndex:10000}}>
//           {data.Data}
//         </div> */}
        
//       </div>
//       <Handle type="source" position='right' isConnectable={isConnectable} />

//     </>
//   );
// }
function CustomNode({ data, isConnectable }) {
 
  const [selected, setSelected] = React.useState(true);

  const Color=(data.color!='')?data.color:'white'
  // console.log(Color)
  return (
    <>
      <Handle type="target" position='left' isConnectable={isConnectable} />

  
        {/* <ToggleButton id={data.class} value={data.label} title={data.Data} className={data.class} name='button' onClick={()=>setClicked(!clicked)}  style={{ fontSize: 24, width: '350px',backgroundColor:'white',color:'black' }} disabled={data.disabled} > */}
        <ToggleButton id={selected.toString()} value={data.label} title={data.class} name='button' onClick={()=>setSelected(!selected)}  sx={{ fontSize: 18, width: '350px',backgroundColor:Color,color:'black' }} disabled={data.disabled} >
          {data.label}
        </ToggleButton>
        
      <Handle type="source" position='right' isConnectable={isConnectable} />

    </>
  );
}

export default CustomNode;