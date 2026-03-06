
import '../App.css'

interface User {
    _id: string
    name: string
    email: string
    role: 'admin' | 'user'
    createdAt: string
}

interface UserCardProps {
    user: User
    onDelete: (id: string) => void
}

const UserCard = ({ user, onDelete }: UserCardProps) => {
    const formattedDate = new Date(user.createdAt).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    return (
        <div className="user-card">
            <h2 className="user-card__name">{user.name}</h2>
            <p className="user-card__email">{user.email}</p>
            <span className={`user-card__badge user-card__badge--${user.role}`}>
                {user.role}
            </span>
            <p className="user-card__date">Créé le {formattedDate}</p>
            <button className="user-card__delete-btn" onClick={() => onDelete(user._id)}>
                Supprimer
            </button>
        </div>
    )
}

export default UserCard