import { useEffect, useState } from 'react'
import { api } from './api'

export default function Welcome(){
	const [notes, setNotes] = useState([])
	const [content, setContent] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const [user, setUser] = useState(null)

	useEffect(() => {
		loadNotes()
		// Try to get user info from localStorage or decode JWT
		const token = localStorage.getItem('token')
		if (token) {
			try {
				// Simple JWT decode (in production, use proper library)
				const payload = JSON.parse(atob(token.split('.')[1]))
				setUser({ email: payload.email, provider: payload.provider })
			} catch (e) {
				console.log('Could not decode user info')
			}
		}
	}, [])

	async function loadNotes(){
		try { 
			const r = await api('/notes')
			setNotes(r.notes) 
		} catch(e){ 
			setError(e.message) 
		}
	}

	async function add(){
		if(!content.trim()) return
		setLoading(true)
		try { 
			const r = await api('/notes',{ method:'POST', body: JSON.stringify({ content })})
			setContent('')
			setNotes([r.note, ...notes])
			setError('')
		} catch(e){ 
			setError(e.message) 
		}
		setLoading(false)
	}

	async function del(id){
		try { 
			await api(`/notes/${id}`, { method:'DELETE' })
			setNotes(notes.filter(n=>n._id!==id))
		} catch(e){ 
			setError(e.message) 
		}
	}

	function logout() {
		localStorage.removeItem('token')
		window.location.assign('/login')
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
			{/* Header */}
			<div className="bg-white shadow-lg border-b border-gray-200">
				<div className="max-w-4xl mx-auto px-6 py-4">
					<div className="flex justify-between items-center">
						<div>
							<h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
								Delite Notes
							</h1>
							{user && (
								<p className="text-gray-600 text-sm mt-1">
									Welcome back, {user.email} 
									<span className="ml-2 px-2 py-1 bg-gray-100 rounded-full text-xs">
										{user.provider}
									</span>
								</p>
							)}
						</div>
						<button 
							onClick={logout}
							className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium rounded-lg hover:from-red-600 hover:to-pink-700 transition-all duration-200 shadow-lg"
						>
							Sign Out
						</button>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="max-w-4xl mx-auto px-6 py-8">
				{/* Add Note Form */}
				<div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
					<h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Note</h2>
					<div className="flex gap-3">
						<textarea 
							className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
							rows="3"
							value={content} 
							onChange={e=>setContent(e.target.value)} 
							placeholder="Write your note here..."
						/>
						<button 
							onClick={add}
							disabled={loading || !content.trim()}
							className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg self-end"
						>
							{loading ? 'Adding...' : 'Add Note'}
						</button>
					</div>
				</div>

				{/* Error Display */}
				{error && (
					<div className="mb-6 px-6 py-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-center">
						{error}
					</div>
				)}

				{/* Notes List */}
				<div className="space-y-4">
					{notes.length === 0 ? (
						<div className="text-center py-12">
							<div className="text-gray-400 text-6xl mb-4">📝</div>
							<h3 className="text-xl font-medium text-gray-600 mb-2">No notes yet</h3>
							<p className="text-gray-500">Create your first note above to get started!</p>
						</div>
					) : (
						notes.map(note => (
							<div key={note._id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 border border-gray-100">
								<div className="flex justify-between items-start gap-4">
									<div className="flex-1">
										<div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
											{note.content}
										</div>
										<div className="text-xs text-gray-500 mt-3">
											Created: {new Date(note.createdAt).toLocaleString()}
										</div>
									</div>
									<button 
										onClick={() => del(note._id)}
										className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white text-sm font-medium rounded-lg hover:from-red-600 hover:to-pink-700 transition-all duration-200 shadow-md flex-shrink-0"
									>
										Delete
									</button>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	)
}
