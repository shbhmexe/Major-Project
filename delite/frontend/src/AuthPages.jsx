import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { useState } from 'react'
import { api } from './api'

const GOOGLE_CLIENT_ID = '249475740776-49vbth4bn2fet8af92p40ddp6j4te4co.apps.googleusercontent.com'

function EmailOtpForm({ mode }) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [otp, setOtp] = useState('')
	const [sent, setSent] = useState(false)
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	async function requestOtp() {
		if (!email) { setError('Please enter email first'); return }
		setError('')
		setLoading(true)
		try {
			const response = await api('/auth/request-otp', { method: 'POST', body: JSON.stringify({ email }) })
			console.log('🚀 OTP RECEIVED:', response.otp)
			console.log('📧 Email:', email)
			console.log('⏰ Timestamp:', new Date().toLocaleString())
			console.log('----------------------------------------')
			setSent(true)
		} catch (e) { 
			setError(e.message) 
			console.error('❌ OTP request failed:', e.message)
		}
		setLoading(false)
	}
	
	async function submit() {
		if (!email || !otp || (mode === 'signup' && !password)) { 
			setError('Please fill all required fields'); return 
		}
		setError('')
		setLoading(true)
		try {
			let data
			if (mode === 'signup') {
				data = await api('/auth/signup-email', { method: 'POST', body: JSON.stringify({ email, password, otp }) })
			} else if (password) {
				data = await api('/auth/login-email', { method: 'POST', body: JSON.stringify({ email, password }) })
			} else {
				data = await api('/auth/login-otp', { method: 'POST', body: JSON.stringify({ email, otp }) })
			}
			localStorage.setItem('token', data.token)
			window.location.assign('/welcome')
		} catch (e) { setError(e.message) }
		setLoading(false)
	}

	return (
		<div className="space-y-4 w-full max-w-sm">
			<div className="space-y-2">
				<input 
					className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
					placeholder="Enter your email" 
					value={email} 
					onChange={e=>setEmail(e.target.value)} 
				/>
			</div>
			
			{mode==='signup' && (
				<div className="space-y-2">
					<input 
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
						placeholder="Create password" 
						type="password" 
						value={password} 
						onChange={e=>setPassword(e.target.value)} 
					/>
				</div>
			)}
			
			<div className="space-y-2">
				<div className="flex gap-2">
					<input 
						className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
						placeholder="Enter OTP" 
						value={otp} 
						onChange={e=>setOtp(e.target.value)} 
					/>
					<button 
						onClick={requestOtp} 
						disabled={loading}
						className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
					>
						{loading ? 'Sending...' : (sent ? 'Resend' : 'Send OTP')}
					</button>
				</div>
				
				{/* OTP Instructions */}
				{sent && (
					<div className="px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg">
						<div className="text-sm text-blue-800 text-center">
							📱 <strong>OTP sent!</strong> Check your browser console (F12) for the OTP code.
						</div>
					</div>
				)}
			</div>
			
			{error && (
				<div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
					{error}
				</div>
			)}
			
			<button 
				onClick={submit} 
				disabled={loading}
				className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
			>
				{loading ? 'Processing...' : (mode==='signup' ? 'Create Account' : 'Sign In')}
			</button>
		</div>
	)
}

export function Signup() {
	const [googleError, setGoogleError] = useState('')

	const handleGoogleSuccess = async (cred) => {
		setGoogleError('')
		try {
			const response = await api('/auth/google', { 
				method: 'POST', 
				body: JSON.stringify({ idToken: cred.credential }) 
			})
			localStorage.setItem('token', response.token)
			window.location.assign('/welcome')
		} catch (error) {
			console.error('Google auth error:', error)
			setGoogleError(error.message || 'Google authentication failed')
		}
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
			<div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
						Create Account
					</h1>
					<p className="text-gray-600 mt-2">Join us and start taking notes</p>
				</div>
				
				<EmailOtpForm mode="signup" />
				
				<div className="my-6">
					<div className="flex items-center gap-3">
						<div className="h-px bg-gray-300 flex-1"/>
						<span className="text-sm text-gray-500 font-medium">or continue with</span>
						<div className="h-px bg-gray-300 flex-1"/>
					</div>
				</div>
				
				<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
					<div className="space-y-3">
						<GoogleLogin 
							onSuccess={handleGoogleSuccess}
							onError={() => setGoogleError('Google authentication failed')}
							theme="outline"
							size="large"
							text="signup_with"
							shape="rectangular"
							width="100%"
						/>
						{googleError && (
							<div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
								{googleError}
							</div>
						)}
					</div>
				</GoogleOAuthProvider>
				
				<div className="text-center mt-6">
					<span className="text-gray-600">Already have an account? </span>
					<a href="/login" className="text-blue-600 hover:text-blue-700 font-medium underline">
						Sign in here
					</a>
				</div>
			</div>
		</div>
	)
}

export function Login() {
	const [googleError, setGoogleError] = useState('')

	const handleGoogleSuccess = async (cred) => {
		setGoogleError('')
		try {
			const response = await api('/auth/google', { 
				method: 'POST', 
				body: JSON.stringify({ idToken: cred.credential }) 
			})
			localStorage.setItem('token', response.token)
			window.location.assign('/welcome')
		} catch (error) {
			console.error('Google auth error:', error)
			setGoogleError(error.message || 'Google authentication failed')
		}
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
			<div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
						Welcome Back
					</h1>
					<p className="text-gray-600 mt-2">Sign in to your account</p>
				</div>
				
				<EmailOtpForm mode="login" />
				
				<div className="my-6">
					<div className="flex items-center gap-3">
						<div className="h-px bg-gray-300 flex-1"/>
						<span className="text-sm text-gray-500 font-medium">or continue with</span>
						<div className="h-px bg-gray-300 flex-1"/>
					</div>
				</div>
				
				<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
					<div className="space-y-3">
						<GoogleLogin 
							onSuccess={handleGoogleSuccess}
							onError={() => setGoogleError('Google authentication failed')}
							theme="outline"
							size="large"
							text="signin_with"
							shape="rectangular"
							width="100%"
						/>
						{googleError && (
							<div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
								{googleError}
							</div>
						)}
					</div>
				</GoogleOAuthProvider>
				
				<div className="text-center mt-6">
					<span className="text-gray-600">New here? </span>
					<a href="/signup" className="text-blue-600 hover:text-blue-700 font-medium underline">
						Create an account
					</a>
				</div>
			</div>
		</div>
	)
}
