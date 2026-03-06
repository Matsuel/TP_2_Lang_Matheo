import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import UserForm from './components/UserForm'
import UserList from './components/UserList'
import { userService } from './services/userService'

interface User {
  _id: string
  name: string
  email: string
  role: 'admin' | 'user'
  createdAt: string
}

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await userService.getAll()
        setUsers(res.data.data)
      } catch {
        setError('Erreur lors du chargement des utilisateurs.')
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const handleCreate = async (data: Omit<User, '_id' | 'createdAt'>) => {
    try {
      const res = await userService.create(data)
      setUsers((prev) => [...prev, res.data.data])
    } catch {
      setError('Erreur lors de la création de l\'utilisateur.')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await userService.remove(id)
      setUsers((prev) => prev.filter((u) => u._id !== id))
    } catch {
      setError('Erreur lors de la suppression de l\'utilisateur.')
    }
  }

  return (
    <div className="app-layout">
      <Navbar count={users.length} />
      <main className="app-main">
        <UserForm onSubmit={handleCreate} />
        <UserList users={users} loading={loading} error={error} onDelete={handleDelete} />
      </main>
    </div>
  )
}

export default App
