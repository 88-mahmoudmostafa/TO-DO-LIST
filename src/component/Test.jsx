import {useRef,useEffect,useState} from 'react'

function Test() {
 
    const [onput,setOnput]=useState(()=>{
       const there=localStorage.getItem('todos')
     return  there ? JSON.parse(there):[];
    })
     const [build,setBuild]=useState(null)



   useEffect(()=>{
       localStorage.setItem('todos',JSON.stringify(onput))
   },[onput])

    const  inputref = useRef()


     const heandelclick=(e)=>{
        e.preventDefault();
         const text=inputref.current.value;
         if(text==='') return;
         if(build!==null){
             const newtext=[...onput]
             newtext[build].text=text
             setOnput(newtext);
             setBuild(null)
         }else{
            setOnput([...onput,
               {
                  text,
                  complete:false
               }])
         }
       
         inputref.current.value= '';
     
     }
     const complete=(index)=>{
         const newtext= [...onput]
         newtext[index].complete =!newtext[index].complete
         setOnput(newtext)
         setBuild(null)

     }
     const  heandledelete=(index)=>{
       const newtext=[...onput];
       newtext.splice(index,1)
       setOnput(newtext)
     }
      const dopelclick =(index)=>{
         
         inputref.current.value=onput[index].text
         setBuild(index)
      }


  return (
    <div className='container'>
       <>
        <h1> to do list</h1>
        </>
         <div className='content'>
        <ul>{onput.map((item,index)=>{
         return (
            <div className='hero'>
           <li  onContextMenu={(e)=>{
              e.preventDefault();
              dopelclick(index);
           }}
             key={index} className={item.complete ? 'dome': null} onClick={()=>complete(index)}>
            <p>{item.text}</p>
         </li> 
         <span onClick={()=>heandledelete(index)} className='X'>✖</span>
         </div>
         )
        }) }</ul>
        <form onSubmit={heandelclick}>
         <input ref={inputref} placeholder=' inter'/>
         <button type='submit'>{build !==null? 'update':'App'}</button>
         </form>
         </div>
    </div>
  )
}

export default Test