import { useState, useCallback, useEffect, useRef} from 'react'

function App() {
  
  let [length, setLength] = useState(10);
  let [numberAllowed, setNumberAllowed] = useState(false);
  let [characterAllowed, setCharacterAllowed] = useState(false);
  let [password, setPassword] = useState("");

  let passwordGenerator = useCallback(() => {
   let  pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed){str += "1234567890";}
    if(characterAllowed){str += "@#$%^&*{}[]<>~`"}
    for(let i=0; i<length ; i++){
      let charIndex = Math.floor(Math.random()*str.length + 1);
      pass+=str.charAt(charIndex);
    }
    setPassword(pass);
  } , [length, numberAllowed, characterAllowed])


  let passwordRef = useRef(null);
  let copyPasswordToClip = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  } , [password])

  useEffect(() => {
    passwordGenerator()
  } , [length, characterAllowed, numberAllowed, passwordGenerator]);

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-8 mx-8 text-orange-500 bg-gray-800'>
        <h1 className='text-center text-white my-3'>PassWord Generator</h1>

        <div className='flex overflow-hidden rounded-lg mb-4 '>
          <input type="text" value={password} className='outline-none w-full py-1 px-3 bg-white rounded-md text-black' placeholder='password' readOnly ref={passwordRef}/>
          <button className='bg-blue-700 outline-none text-white px-3 py-0.5 shrink-0' onClick={copyPasswordToClip}  >COPY</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-2'>
            <input type="range" min={6}  value={length} className='cursor-pointer' onChange={(e) => {setLength(e.target.value)}}/>
            <label htmlFor="">Length: {length}</label>

            <input type="checkbox" defaultChecked={characterAllowed} onChange={() => {setCharacterAllowed(characterAllowed = !characterAllowed)}}/>
            <label htmlFor="">Characters</label>

            <input type="checkbox" defaultChecked={numberAllowed} onChange={() => {setNumberAllowed(numberAllowed => !numberAllowed)}} />
            <label htmlFor="">Numbers</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
