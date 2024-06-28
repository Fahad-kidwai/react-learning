import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'


// useRef -used to give reference
// usecallback hook - used to memoise the function
function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed,setNumberAllowed] = useState(false)
  const [charAllowed,setCharAllowed]= useState(false)
  const [password,setPassword]= useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    
    if(numberAllowed) str+= "123456789"
    if(charAllowed) str+= "!@#$%^&*()-_+=[]{}"

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random()* str.length + 1)

      pass += str.charAt(char)
    }
    setPassword(pass)
  },[length,numberAllowed,charAllowed,setPassword])

  const copyToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(length)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
      <div className=' w-full bg-gray-700 max-w-lg  mx-auto shadow-md rounded-2xl px-3 py-4  my-8 text-orange-500'>
      <h1 className=' text-4xl text-white text-center mb-2' >Password Generator</h1>
      <div className=' flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
          type='text'
          value={password}
          className=' outline-none w-full px-3 py-1'
          placeholder='Password'
          readOnly
          ref={passwordRef}
        />
        <button 
        onClick={copyToClipboard}
        className=' outline-none bg-blue-600 text-white px-3 shrink-0 py-0.5'>
          copy
        </button>
      </div>
      <div className=' flex text-sm gap-x-2'>
        <div className=' flex items-center gap-x-1'>
          <input
            type='range'
            min={8}
            max={99}
            value={length}
            onChange={(e)=>{setLength(e.target.value)}}
            className='cursor-pointer'
          />
          <label>Length: {length}</label>
        </div>
        <div className=' flex items-center gap-x-1'>
          <input 
            type="checkbox" 
            onChange= {()=>{
              setNumberAllowed((prev)=>!prev)
            }}
            id='numberInput'
          />
          <label htmlFor="numberInput">Number</label>
        </div>
        <div className=' flex items-center gap-x-1'>
          <input 
            type="checkbox" 
            onChange= {()=>{
              console.log("char")
              setCharAllowed((prev)=>!prev); // NOTE: we can fetch previous value like this 
            }}
            id='charInput'
          />
          <label htmlFor="charInput"> Character</label>
        </div>
      </div>
        
      </div>
    </>
  )
}

export default App
