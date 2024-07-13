import { useRef, useEffect } from 'react'

const useCanvas = draw => {
  
  const canvasRef = useRef(null)
  
  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    
    const render = () => {
      draw(context)
    }
    render()
    
  }, [draw])
  
  return canvasRef
}

export default useCanvas