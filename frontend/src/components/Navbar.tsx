import '../App.css'
interface NavbarProps {
    count: number
}

const Navbar = ({ count }: NavbarProps) => {
    return (
        <nav className="navbar">
            <h1 className='navbar-title'>Gestion des utilisateurs</h1>
            <span className="navbar-badge">{count} utilisateur{count !== 1 ? 's' : ''}</span>
        </nav>
    )
}

export default Navbar