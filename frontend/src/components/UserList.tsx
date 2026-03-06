
import UserCard from './UserCard'
import '../App.css'

interface User {
    _id: string
    name: string
    email: string
    role: 'admin' | 'user'
    createdAt: string
}

interface UserListProps {
    users: User[]
    loading: boolean
    error: string | null
    onDelete: (id: string) => void
}

const UserList = ({ users, loading, error, onDelete }: UserListProps) => {
    if (loading) return <p className="user-list__status">Chargement...</p>
    if (error) return <p className="user-list__status user-list__status--error">{error}</p>
    if (users.length === 0) return <p className="user-list__status">Aucun utilisateur</p>

    return (
        <div className="user-list">
            {users.map((user) => (
                <UserCard key={user._id} user={user} onDelete={onDelete} />
            ))}
        </div>
    )
}

export default UserList