import './cursor.css'

import gsap from 'gsap';
import { useEffect, useRef } from 'react'


function Cursor() {
  const cursorRef = useRef(null);

  useEffect(() => {

    const moveCursor = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: .6,
      });
    };

    window.addEventListener('mousemove', moveCursor);

    return () => window.removeEventListener('mousemove', moveCursor);

  }, []);

  return (
    <>
      <div ref={cursorRef} id='cursor' className='bg-black dark:bg-white'></div>
    </>
  )
}

export default Cursor
