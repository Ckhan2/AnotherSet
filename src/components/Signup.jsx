import { useState } from "react"



export default function Signup() {
    const [formdata, setFormdata] = useState({
        name:"",
        email:"",
        password:""
    }
        )
        console.log(formdata)
const handleChange=(e)=>{setFormdata({...formdata,[e.target.name]:e.target.value})}
const [open,setopen] =useState(true)
if(!open) return null;
    return (
        <>

            <div className="fixed inset-0 min-h-screen bg-blue flex items-center justify-center">
                <div className="ml-18 relative bg-gray-900 rounded-xl shadow-lg px-6 pt-2 shadow-2xl max-w-sm w-full" >
                <button className="absolute top-4 right-4 text-white" onClick={() => setopen(false)}>Close</button>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="logo.png"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign up for your account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
                                Name:
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value = {formdata.name}
                                    onChange={handleChange}
                                    required
                                    autoComplete="name"
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value = {formdata.email}
                                    onChange={handleChange}
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                                    Password
                                </label>

                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value = {formdata.password}
                                    onChange={handleChange}
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>


                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-400">
                        Already a member?{' '}
                        <a href="/login" className="font-semibold text-indigo-400 hover:text-indigo-300">
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
        </>
    )
}
