import React from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import { App } from './components/App/App.js'

const root = createRoot(document.getElementById('root'))

root.render(<App/>)
