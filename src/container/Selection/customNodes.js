import React, {useCallback } from 'react';
import { Handle, Position } from 'react-flow-renderer';

const handleStyle = { left: 10 };

function CustomNode({ data, isConnectable }) {
  // function AddExi(parent,child){
  //   if(typeof(nested[parent][child][Object.keys(nested[parent][child])[0]])!=typeof({'a':1})){

     
  //      return (
  //       <div className='exigences' style={{position:'sticky',width:'200px',height:'200px',transform:'translate(50%,50%)'}}>
  //         {Object.entries(nested[parent][child]).join('\n\n')}
  //       </div>
  //      )
     
  //   }
  // }

  const Return = useCallback((evt) => {
  }, []);
  return (
    <>
      <Handle type="target" position='left' isConnectable={isConnectable} />

      <div>
        <button id={data.label} title={data.Data} className={data.class} name='button' onClick={Return}  style={{ fontSize: 24, width: '350px' }} >
          {data.label}
        </button>
        {/* <div className='exigence' style={{display:'none',position:'absolute',width:'1000px',height:'200px',transform:'',backgroundColor:'white',color:'black',zIndex:10000}}>
          {data.Data}
        </div> */}
        
      </div>
      <Handle type="source" position='right' isConnectable={isConnectable} />

    </>
  );
}

export default CustomNode;