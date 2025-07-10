import React from 'react'
import { useState , useCallback , useEffect , useRef } from 'react'

const App = () => {

  const [length , setLength] = useState(8);
  const [numallowed , setNumallowed] = useState(false);
  const [charallowed , setCharallowed] = useState(false);
  const [password , setPassword] = useState("");

  const passwordGenerator = useCallback(() =>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQURSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numallowed) str += "0123456789";
    if(charallowed) str += "~!@#$%^&*()_+?:{}<>?";

    for(let i=1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }
    ,[length , numallowed , charallowed])

    const passwordref = useRef(null);

    const CopyPasswordToClipboard = useCallback(() =>{
      passwordref.current?.select();
      window.navigator.clipboard.writeText(password);
    }
  ,[password])

    useEffect(()=>{
      passwordGenerator()
    },
      [length , numallowed , charallowed , passwordGenerator])

  return (
    <div className='bg-gray-500 rounded-2xl w-200 ml-88 mt-20 text-center items-center h-55 '>
      <h1 className='text-white text-center font-bold text-5xl'>Password Generator</h1>  
       
       <div className='flex'>
        <input type="text" value={password} placeholder='password' readOnly ref={passwordref} className='bg-white ml-25 mx-6 my-10 rounded-xl w-3/4 h-10'/>
        <button onClick={CopyPasswordToClipboard} className='bg-blue-600 text-white h-10 -mx-30 w-25 my-10 rounded-xl'>Copy</button>
       </div>

      <div className='flex text-sm gap-x-2 ml-15 text-white'> 

       <div className='flex items-center gap-x-1'>
         <input type="range" min={6} max={100} value={length} className='cursor-pointer'
         onChange={(e)=>{setLength(e.target.value)}}/>
         <label className='font-bold'>Length:{length}</label>
       </div>

        <div className='flex items-center gap-x-1 ml-30'>
          <input type="checkbox" defaultChecked={numallowed} 
          id="numberInput" 
          onChange={() => {setNumallowed
            ((prev) => !prev);
          }} />
          <label htmlFor='numberInput' className='font-bold cursor-pointer'>Number</label>
        </div>

        <div className='flex items-center gap-x-1 ml-40'>
          <input type="checkbox" defaultChecked={charallowed} 
          id="characterInput" 
          onChange={() => {setCharallowed
            ((prev) => !prev);
          }}/>
          <label htmlFor='characterInput' className='font-bold cursor-pointer'>Character</label>
        </div>

      </div> 

    </div>   
  )
}

export default App
