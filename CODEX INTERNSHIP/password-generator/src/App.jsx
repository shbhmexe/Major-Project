import React, { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const [password, setPassword] = useState("")
  const [passwordLength, setPasswordLength] = useState(8)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const [theme, setTheme] = useState('red') // Default theme
  const [copied, setCopied] = useState(false)

  // Theme colors
  const themes = {
    purple: {
      primary: 'bg-purple-600',
      text: 'text-purple-600',
      background: 'bg-purple-100',
    },
    blue: {
      primary: 'bg-blue-600',
      text: 'text-blue-600',
      background: 'bg-blue-100',
    },
    green: {
      primary: 'bg-green-600',
      text: 'text-green-600',
      background: 'bg-green-100',
    },
    red: {
      primary: 'bg-red-600',
      text: 'text-red-600',
      background: 'bg-red-100',
    },
    amber: {
      primary: 'bg-amber-600',
      text: 'text-amber-600',
      background: 'bg-amber-100',
    }
  }

  const handleLengthIncrease = (e) => {
    e.preventDefault()
    if (passwordLength < 30) {
      setPasswordLength(passwordLength + 1)
    }
  }

  const handleLengthDecrease = (e) => {
    e.preventDefault()
    if (passwordLength > 4) {
      setPasswordLength(passwordLength - 1)
    }
  }

  const getPasswordStrength = () => {
    let score = 0;
    
    // Length contribution
    if (passwordLength >= 12) score += 3;
    else if (passwordLength >= 8) score += 2;
    else score += 1;
    
    // Character types contribution
    if (includeUppercase) score += 1;
    if (includeLowercase) score += 1;
    if (includeNumbers) score += 1;
    if (includeSymbols) score += 2;
    
    // Return strength level
    if (score >= 7) return { text: "Strong", color: "bg-green-600" };
    if (score >= 5) return { text: "Medium", color: "bg-amber-500" };
    return { text: "Weak", color: "bg-red-600" };
  }

  const handleCopyPassword = () => {
    if (password) {
      navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handlePasswordGenerate = useCallback(() => {
    let charset = "";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    
    // If no charset is selected, use lowercase as default
    if (charset === "") {
      charset = "abcdefghijklmnopqrstuvwxyz";
      setIncludeLowercase(true);
    }
    
    let pass = "";
    for (let i = 0; i < passwordLength; i++) {
      pass += charset[Math.floor(Math.random() * charset.length)];
    }
    
    setPassword(pass);
  }, [passwordLength, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  useEffect(() => {
    handlePasswordGenerate();
  }, [passwordLength, includeUppercase, includeLowercase, includeNumbers, includeSymbols, handlePasswordGenerate]);

  const strength = getPasswordStrength();

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center ${themes[theme].background}`}>
      <div className="w-full max-w-lg mx-auto p-5">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h1 className={`text-2xl font-bold mb-2 ${themes[theme].text}`}>
            Password Generator
          </h1>
          
          <div className="relative mb-5">
            <div className="flex items-center justify-between bg-gray-100 rounded-lg p-3">
              <input 
                type="text" 
                className="w-full mr-2 bg-transparent outline-none font-mono text-lg"
                value={password} 
                readOnly
              />
              <motion.button 
                onClick={handleCopyPassword}
                className={`p-2 rounded-md transition ${themes[theme].primary} text-white`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {copied ? "Copied!" : "Copy"}
              </motion.button>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="font-medium">Password Length</label>
              <div className="flex items-center">
                <motion.button 
                  className={`h-8 w-8 flex items-center justify-center ${themes[theme].primary} text-white rounded-md`}
                  onClick={handleLengthDecrease}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  -
                </motion.button>
                <span className="mx-3 font-mono text-lg">{passwordLength}</span>
                <motion.button 
                  className={`h-8 w-8 flex items-center justify-center ${themes[theme].primary} text-white rounded-md`}
                  onClick={handleLengthIncrease}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  +
                </motion.button>
              </div>
            </div>
            <input 
              type="range" 
              min="4" 
              max="30" 
              value={passwordLength} 
              onChange={(e) => setPasswordLength(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div className="space-y-3 mb-6">
            <label className="font-medium">Include:</label>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="uppercase"
                  checked={includeUppercase}
                  onChange={() => setIncludeUppercase(!includeUppercase)}
                  className={`mr-2 w-4 h-4 ${themes[theme].text}`}
                />
                <label htmlFor="uppercase">Uppercase Letters</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="lowercase"
                  checked={includeLowercase}
                  onChange={() => setIncludeLowercase(!includeLowercase)}
                  className={`mr-2 w-4 h-4 ${themes[theme].text}`}
                />
                <label htmlFor="lowercase">Lowercase Letters</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="numbers"
                  checked={includeNumbers}
                  onChange={() => setIncludeNumbers(!includeNumbers)}
                  className={`mr-2 w-4 h-4 ${themes[theme].text}`}
                />
                <label htmlFor="numbers">Numbers</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="symbols"
                  checked={includeSymbols}
                  onChange={() => setIncludeSymbols(!includeSymbols)}
                  className={`mr-2 w-4 h-4 ${themes[theme].text}`}
                />
                <label htmlFor="symbols">Symbols</label>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="font-medium">Password Strength:</label>
            <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
              <div 
                className={`h-full rounded-full ${strength.color}`} 
                style={{ width: `${(getPasswordStrength().text === "Strong" ? 100 : getPasswordStrength().text === "Medium" ? 66 : 33)}%` }}
              ></div>
            </div>
            <p className="text-right mt-1 text-sm font-medium">{strength.text}</p>
          </div>
          
          <motion.button 
            onClick={handlePasswordGenerate}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium ${themes[theme].primary} transition`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Generate Password
          </motion.button>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className={`text-xl font-bold mb-4 ${themes[theme].text}`}>
            Choose Theme
          </h2>
          <div className="flex flex-wrap gap-3">
            {Object.keys(themes).map((colorTheme) => (
              <motion.button
                key={colorTheme}
                onClick={() => setTheme(colorTheme)}
                className={`w-10 h-10 rounded-full ${themes[colorTheme].primary} ${theme === colorTheme ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                title={colorTheme.charAt(0).toUpperCase() + colorTheme.slice(1)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
        
        {/* Translator App Link */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <motion.a
            href="https://translate.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-3 py-3 px-4 rounded-lg ${themes[theme].primary} text-white transition-all`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            <span className="font-medium">Translator App</span>
          </motion.a>
        </div>
      </div>
    </div>
  )
}

export default App
