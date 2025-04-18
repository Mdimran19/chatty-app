import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { MessageSquare , Mail , Lock, Loader2} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
const {login, isLoggingIn} = useAuthStore()
const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  login(formData)
  navigate("/")
};
  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      {/*left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:0-12">
        <div className="w-full max-w-md space-y-8">
          {/* logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className='text-2xl font-bold mt-2'>SignIn Account</h1>
              <p className="text-base-content/60">Get started with your account</p>

            </div>
          </div>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className="form-control">
              
             
            
            </div>
            {/* mail */}
            <div className="form-control">
              <label className='label'>
                <span className="label-text font-medium">Enter Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className='size-5 text-base-content/40' />

                </div>
                <input type="email" className={`input input-bordered w-full pl-10`}
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            {/* password */}
            <div className="form-control">
              <label className='label'>
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className='size-5 text-base-content/40' />

                </div>
                <input type={showPassword ? "text" : "password"} className={`input input-bordered w-full pl-10 bg-slate-500`}
                  placeholder='* * *'
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                {/* <button className="btn btn-dash btn-accent " onClick={() => setShowPassword(!showPassword)}>{showPassword ? (<EyeOff className='text-5 text-base-content/40' />) :
            (<Eye className='text-5 text-base-content/40' />)
            }</button> */}
              </div>
            </div>
            <div className='items-center text-center'>
              <button type='submit' className="btn btn-dash btn-accent " disabled={isLoggingIn}>{
                isLoggingIn ?(
                  <>
                  <Loader2 className='h-5 w-5 animate-spin' />
                  Loading ... 
                    </>
                ) : (
                  "Sign-in"
                )
                }</button>
            </div>
            <div className='items-center text-center'><p>Already have an account ? <Link className='cursor-pointer' to='/signup'>signup</Link></p></div>

          </form>
        </div>
      </div>
      {/* right side */}
      <AuthImagePattern
        title="Join Our Community"
        subtitle="Connect with friends, share moments, and stay in touch with you" />
    </div>
  )
}

export default LoginPage