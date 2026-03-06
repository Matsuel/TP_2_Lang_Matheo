
import { useState } from 'react'
import '../App.css'

interface FormData {
    name: string
    email: string
    role: 'user' | 'admin'
}

interface UserFormProps {
    onSubmit: (formData: FormData) => Promise<void> | void
}

const initialState: FormData = { name: '', email: '', role: 'user' }

const UserForm = ({ onSubmit }: UserFormProps) => {
    const [formData, setFormData] = useState<FormData>(initialState)
    const [validationError, setValidationError] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.name.trim() || !formData.email.trim()) {
            setValidationError('Le nom et l\'email sont obligatoires.')
            return
        }
        setValidationError(null)
        await onSubmit(formData)
        setFormData(initialState)
    }

    return (
        <form className="user-form" onSubmit={handleSubmit}>
            <h2 className="user-form__title">Ajouter un utilisateur</h2>

            {validationError && (
                <p className="user-form__error">{validationError}</p>
            )}

            <div className="user-form__fields">
                <div className="user-form__field">
                    <label htmlFor="name">Nom</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nom complet"
                    />
                </div>

                <div className="user-form__field">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="adresse@email.com"
                    />
                </div>

                <div className="user-form__field">
                    <label htmlFor="role">Rôle</label>
                    <select id="role" name="role" value={formData.role} onChange={handleChange}>
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                    </select>
                </div>

                <button type="submit" className="user-form__submit">Créer</button>
            </div>
        </form>
    )
}

export default UserForm