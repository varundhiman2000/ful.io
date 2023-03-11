import React, {useState} from 'react'

export default function TextForm(props) {
    const [text, setText] = useState(''); 
    const [num, setNum] = useState(1); 
    const[font,setFont]=useState()
    const[fontName,setFName]=useState('Convert to Bold')
    const[italic,setItalic]=useState()
    const[italicName,setIName]=useState('Convert to Italic')

    // to uppercase
    const handleUpClick = ()=>{
        let newText = text.toUpperCase();
        setText(newText)
        props.showAlert("Converted to uppercase!", "success");
    }
    //convert to bold
    const handleBold = ()=>{
        if(font === 'bold'){
          setFont('normal');
          setFName('Convert to Bold')
          props.showAlert("Converted to NormalText!", "success");
        }
        else{
            setFont('bold');
            setFName('Bold to Normal')
            props.showAlert("Converted to Bold!", "success");
        }}
        // convert to italic
        const handleItalic = ()=>{
            if(italic === 'italic'){
                setItalic('normal');
                setIName('Convert to Italic')
                props.showAlert("Converted to NormalText!", "success");
            }
            else{
                setIName('Italic to Normal')
                setItalic('italic');
                props.showAlert("Converted to Italic!", "success");
        }}
// To lowercase
    const handleLoClick = ()=>{ 
        let newText = text.toLowerCase();
        setText(newText)
        props.showAlert("Converted to lowercase!", "success");
    }
  // TExt cleared method
    const handleClearClick = ()=>{ 
        let newText = '';
        setText(newText);
        props.showAlert("Text Cleared!", "success");
    }
// onchnage method 
    const handleOnChange = (event)=>{
        setText(event.target.value) 
    }
    

    //  text copy
    const handleCopy = () => {
        navigator.clipboard.writeText(text); 
        props.showAlert("Copied to Clipboard!", "success");
    }
// remove space
    const handleExtraSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Extra spaces removed!", "success");
    }
    const handle =async () => {
        setNum(num+1);
        // let newText = text.split(/[ ]+/);
        setText(text)
        document.getElementById('id').innerHTML+=`
            <p style="font-weight:${font}; font-style: ${italic};">${num}.${text}</p> 
            `  
        
        props.showAlert("Notes added!", "success");
        // const response = await fetch(`http//localhost:5000/api/notes/addnote/`, {
        //     method: "POST", // *GET, POST, PUT, DELETE, etc.
        //     headers: {
        //       "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({text}), // body data type must match "Content-Type" header
        //   });
    }

    return (
        <>
        
        <div className="container" style={{color: props.mode==='dark'?'white':'#042743'}}> 
            <h1 className='mb-4'>{props.heading}</h1>
            <div className="mb-3">  
            <textarea className="form-control" value={text} onChange={handleOnChange} style={{backgroundColor: props.mode==='dark'?'#13466e':'white', color: props.mode==='dark'?'white':'#042743' ,fontWeight: font==='bold' ? 'bold': 'normal',fontStyle:italic==='italic' ? 'italic': 'normal' }} id="myBox" rows="8" placeholder='𝗧𝘆𝗽𝗲 𝗼𝗿 𝗽𝗮𝘀𝘁𝗲 𝘆𝗼𝘂𝗿 𝗰𝗼𝗻𝘁𝗲𝗻𝘁 𝗵𝗲𝗿𝗲'></textarea>
            </div>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Convert to Uppercase</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>Convert to Lowercase</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleClearClick}>Clear Text</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleCopy}>Copy Text</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleBold}>{fontName}</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleItalic}>{italicName}</button>
            <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handle}>Save</button>
        </div>
        <div className="container my-3" style={{color: props.mode==='dark'?'white':'#042743'}}>
            <h2>Your text summary</h2>
            <p>{text.split(/\s+/).filter((element)=>{return element.length!==0}).length} words and {text.length} characters</p>
            <p>{0.008 *  text.split(/\s+/).filter((element)=>{return element.length!==0}).length} Minutes read</p>
            <h2>Your Notes</h2>
            
            {/* <p>{text.length>0?text:"Nothing to preview!"}</p> */}
            <p  id='id'></p>
        </div>
        </>
    )
}