import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [caracterAllowed, setCaracterAllowed] = useState(false)
  const [password, setPassword] = useState('')

  // ref hook
  const passwordRef = useRef(null)

  // Password Generator Logic
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (caracterAllowed) str += "`~!@#$%^&*()_+"

    for (let i = 1; i <= length; i++) {
      // BUG FIXED: Removed "+1" to stay within string index range
      let charIndex = Math.floor(Math.random() * str.length)
      pass += str.charAt(charIndex)
    }

    setPassword(pass)
  }, [length, numberAllowed, caracterAllowed])

  // Copy to Clipboard Logic
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select() // Selection effect
    passwordRef.current?.setSelectionRange(0, 99999) // For mobile devices
    window.navigator.clipboard.writeText(password)
  }, [password])

  // Effect to run generator
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, caracterAllowed, passwordGenerator])

  return (
    <>
      <div className='w-[90%] max-w-4xl mx-auto shadow-xl text-center text-green-400 py-12 rounded-xl my-8 px-6 bg-gray-900'>
        <h1 className='text-3xl font-bold mb-4'>Password Generator</h1>

        <div className='flex shadow rounded-2xl overflow-hidden mb-4'>
          <input 
            type="text" 
            value={password}
            className='outline-none w-full py-1 px-3 text-black text-lg'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button 
            onClick={copyPasswordToClipboard} 
            className='bg-pink-500 hover:bg-purple-600 text-white py-2 px-4 rounded-r shrink-0'
          >
            Copy
          </button>
        </div>

        <div className='flex text-sm gap-x-4 flex-wrap justify-center py-2 text-blue-400'>
          <div className='flex items-center gap-x-1'>
            <input 
              type="range" 
              min={6} 
              max={80} 
              value={length} 
              className='cursor-pointer' 
              onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox" 
              defaultChecked={numberAllowed}
              id='number' 
              onChange={() => {setNumberAllowed((prev) => !prev)}}
            />
            <label htmlFor='number'>Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox" 
              defaultChecked={caracterAllowed}
              id='caracter' 
              onChange={() => {setCaracterAllowed((prev) => !prev)}}
            />
            <label htmlFor='caracter'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App