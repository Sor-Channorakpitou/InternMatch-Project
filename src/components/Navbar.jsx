import React from 'react'

function Navbar() {
    return (
    <div>
        <div className='mt-40 text-5xl p-5 block text-center'>
            <h1>
                Welcome to our project
            </h1>
        </div>
                <div className='flex items-center justify-center '>
            <div className='shadow-lg p-5 bg-orange-300 rounded-md flex flex-col items-center'>
                <h1 className='font-bold my-5'>I am testing tailwind CSS</h1>
                <button className='shadow-sm bg-pink-300 p-3 w-fit rounded-lg hover:bg-pink-400 transition'>Click me</button>
            </div>
        </div>
        </div>
    )
}

export default Navbar;
