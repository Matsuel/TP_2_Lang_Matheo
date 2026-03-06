
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

    const initials = user.name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()

    return (
        <div className="user-card">
            <div className="user-card__header">
                <div className="user-card__avatar">{initials}</div>
                <span className="user-card__name">{user.name}</span>
                <span className={`user-card__badge user-card__badge--${user.role}`}>{user.role}</span>
            </div>
            <p className="user-card__email">{user.email}</p>
            <p className="user-card__date">Créé le {formattedDate}</p>
            <div className="user-card__footer">
                <button className="user-card__delete-btn" onClick={() => onDelete(user._id)}>
                    Supprimer
                </button>
            </div>
        </div>
    )
}

export default UserCard