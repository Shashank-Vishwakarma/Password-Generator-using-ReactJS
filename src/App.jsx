import { useCallback, useEffect, useRef, useState } from "react"

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charactersAllowed, setCharactersAllowed] = useState(false);
  
  // use callback to get memoized callback
  const passwordGenerator = useCallback(()=>{
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numbersAllowed) str += "0123456789";
    if(charactersAllowed) str += "!@#$%^&*-_+={}[]~`";

    let pass = "";
    for(let i=1; i<=length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length + 1));
    }

    setPassword(pass);
  }, [length, numbersAllowed, charactersAllowed]);

  // copy logic
  const passRef = useRef(null);
  const copyPassword = useCallback(()=>{
    passRef.current?.select();
    passRef.current?.setSelectionRange(0, 100);
    navigator.clipboard.writeText(password);
  }, [password]);

  // use effect to apply side effects on every render
  useEffect(()=>{
    passwordGenerator();
  }, [length, numbersAllowed, charactersAllowed]);

  return (
    <>
      <div className="w-screen h-screen bg-slate-300 flex justify-center items-center flex-col">
        <div className="w-96">
          <input type="text" placeholder="Password" ref={passRef} value={password} className="w-5/6 px-3 py-2 outline-none border-none rounded-l-md" readOnly/>
          <button className="bg-blue-400 px-3 py-2 w-1/6 rounded-r-md hover:bg-blue-500" onClick={copyPassword}>Copy</button>
        </div>
        <div className="w-96 my-4 flex">
          <input type="range" min={8} max={100} value={length} onChange={(e)=>setLength(e.target.value)}/>
          <label className="mx-12">Length:({length})</label>
        </div>
        <div className="flex">
          <div className="w-32">
            <input type="checkbox" defaultChecked={numbersAllowed} name="numbers" onChange={()=>setNumbersAllowed((prev)=>!prev)}/>
            <label htmlFor="numbers">Numbers</label>
          </div>
          <div className="w-32">
            <input type="checkbox" defaultChecked={charactersAllowed} name="characters" onChange={()=>setCharactersAllowed((prev)=>!prev)}/>
            <label htmlFor="characters">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
