import "./Loader.css";

export default function Loader () {
  return ( 
    <div  id="loader" className="loader-container" style={{ maxWidth: '100%', overflow: 'hidden' }}> 
      <img src={"/taleweaver-loader.png"} alt="Loading..." className="loader"/> 
    </div> 
  )
} 
