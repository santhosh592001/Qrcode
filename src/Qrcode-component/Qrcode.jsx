import React, { useState } from 'react';
import './Qrcode.css'
export const Qrcode = () => {

const [img , setImg] = useState('');
const [loading , setLoading] = useState(false);
const  [qrData, setqrData] = useState('');
const [qrsize ,  setQrsize] = useState('')

async function generatorQR(event){

  event.preventDefault();

   setLoading(true);

try{

  const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrData)}`;
  setImg(url);

}catch(error){

  console.log("Error Generate Qr Code", error)

}finally{

  setLoading(false);

}
  //  setTimeout(()=>{

  //   setImg('qrcode.jpg');

  //   setLoading(false)


  //  },5000);

}


function downloadQR(event){


  event.preventDefault()

  fetch(img)
  
  .then((response)=>response.blob())
  
  .then((blob) =>{

    const link = document.createElement("a")
    link.href= URL.createObjectURL(blob);
    link.download= "w3school.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  }).catch((error) => {

    console.error("Error Downloading Qr Error:",error);

  })

}



  return (
    
   

    <div className='container'>
      <div className='subcontainer'>

      
        <h3 className='text-center'>QR CODE GENERATOR</h3>
       {loading && <p className='text-center mt-5'>please Wait.....</p>}
        {img && <img src= {img} className='mt-5 mx-auto d-flex' style={{width:'200px'}}></img>}

        <form className='mt-3'>
          <label htmlFor="data" className='mt-3 text-primary'>Data for QR code :</label>
          <input type='text' id="data" value={qrData} onChange={(e)=> setqrData(e.target.value)} className='form-control mt-3 border-primary' 
          placeholder='Enter Data For QR code' required></input>
          <label htmlFor="size" className='mt-3 text-primary'>Enter The Image Size:</label>
          <input type='number' id="data" value={qrsize} onChange={(e)=> setQrsize(e.target.value)}
           className='form-control mt-3 border-primary' placeholder='Enter Size For QR code' required></input>
          
          <div className='subcontainer-Generate'>
          <button className='btn btn-warning border-0 mt-4 me-2 pe-4 ps-4' id="button1" style={{width:'200px'}}
          onClick={generatorQR}>Generate QR Code</button>
          <button className='btn btn-danger border-0 mt-4 p-2' id="button2" onClick={downloadQR} style={{width:'200px'}}
          >Download The QR code</button>
          </div>
        </form>
        </div>
        </div>
  );
};
