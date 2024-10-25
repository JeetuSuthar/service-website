
import React  from 'react'
import { useState } from 'react'
import {FaBars,FaTimes} from 'react-icons/fa'

import { Link } from 'react-router-dom';
const Navbar = () => {

    const [nav,setNav] = useState(false);
    
    const links =[
        {
            id:1,
            link:'home'
        },
        {
            id:2,
            link:'about'
        },
        {
            id:3,
            link:'contact'
        },
        {
            id:4,
            link:'services'
        }
    ]

  return (
    //NAVBAR START
    <div className='flex  justify-between items-center w-full h-20 px-4 text-white bg-black '>
        <Link to='/home'>
            <h1 className='text-3xl  font-signature ml-2 tracking-wide     '>Vedya Majdoor</h1>
        </Link>
        <ul className='hidden md:flex '>

            {links.map(({id,link})=>(
                 <li key={id} className='px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-125 duration-200 hover:text-white'>
                    <Link to={link} smooth duration={500} >{link}</Link>
                    </li>
            ))}

        </ul>
        <div onClick={()=>setNav(!nav)} className='cursor-pointer  pr-4 z-10 text-gray-500   hover:text-white duration-200 md:hidden'>
            {nav ? <FaTimes size={30} />:  <FaBars size={30}/>}
        </div>
            {nav &&(
                <ul className=' flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to bg-gray-800'>
                {links.map(({id,link})=>(
                         <li key={id} className='px-4 capitalize cursor-pointer py-6 text-4xl'><Link to={link} smooth duration={500} >{link}</Link></li>
                         
                    ))}   
                </ul>
            )}
            <Link to='/login' className='border rounded-lg border-white hover:bg-gray-400 px-3 py-2 hover:text-black'>
                Login/Signup
            </Link>
    </div>
     
  )
}

export default Navbar
