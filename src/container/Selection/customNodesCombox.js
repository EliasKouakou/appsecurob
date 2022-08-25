import React, {useCallback,useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import ToggleButton from '@mui/material/ToggleButton';
import ButtonGroup from '@mui/material/ButtonGroup'
import Box from '@mui/material/Box'


const handleStyle = { left: 10 };
function CustomNodeGroup({ data, isConnectable }) {
 
  const [selected, setSelected] = React.useState(true);

  const Color=(data.color!='')?data.color:'white'
  return (
    <>
      <Handle type="target" position='left' isConnectable={isConnectable} />

        <ButtonGroup
        orientation="vertical"
        aria-label="vertical outlined button group"
        >

        <ToggleButton id={selected.toString()} value={data.label} title={data.class} name='button' onClick={()=>setSelected(!selected)}  sx={{backgroundColor:Color,color:'black' }} disabled={data.disabled} >
          {data.label}
        </ToggleButton>
        {/* <ToggleButton id={selected.toString()} value={data.label} title={data.class} name='button' onClick={()=>setSelected(!selected)}  sx={{backgroundColor:Color,color:'black' }} disabled={data.disabled} >
          {data.label}
        </ToggleButton>
         */}

        </ButtonGroup>
        
      <Handle type="source" position='right' isConnectable={isConnectable} />

    </>
  );
}

export default CustomNodeGroup;