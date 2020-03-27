import React, {useRef, useState} from "react";
import SignatureCanvas from 'react-signature-canvas';
import Button from '@material-ui/core/Button';

export default function DrawableCanvas(props) {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);

  function handleClick() {
    setImage(canvasRef.current.toDataURL())
  }

  return (
    <div>
      <SignatureCanvas 
      ref={canvasRef}
      penColor='white' 
      canvasProps={{width: 300, height: 300, className: 'sigCanvas'}}
      backgroundColor='rgba(0,0,0,1)' />
      {image
      ? <p><img src={image} /></p>
      : null
      }
      <br />
      <Button variant="outlined" onClick={handleClick}>
        Default
      </Button>
    </div>
  )
}