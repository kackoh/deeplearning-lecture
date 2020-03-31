import React, {useRef, useState} from "react";
import SignatureCanvas from 'react-signature-canvas';
import Button from '@material-ui/core/Button';

export default function DrawableCanvas(props) {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);

  function handleClick() {
    console.log(canvasRef.current.toDataURL())
    fetch('/api/cr', {
      method : 'POST',
      body : JSON.stringify({pic : canvasRef.current.toDataURL()}), // 文字列で指定する
      headers: {
          "Content-Type": "application/json; charset=utf-8", //jsonと明記
          // "Content-Type": "application/x-www-form-urlencoded",
      }
    })
    .then(r => r.json())
    .then(d => {
      console.log(d.ans)
      setImage(d.pic)
    })
  }

  return (
    <div>
      <SignatureCanvas 
      ref={canvasRef}
      penColor='white' 
      minWidth={25}
      maxWidth={25}
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