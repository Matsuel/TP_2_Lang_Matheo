import express from 'express';
import users from './data/users';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/api/users', (req, res) => {
    const response = {
        success: 'true',
        count: users.length,
        data: users,
    };
    res.status(200).json(response);
});

app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === userId);

    if (user) {
        res.status(200).json({
            success: 'true',
            data: user,
        });
    } else {
        res.status(404).json({
            success: 'false',
            message: 'Utilisateur non trouvé',
        });
    }
});

app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({
            success: 'false',
            message: 'Le nom et l\'email sont requis pour créer un utilisateur',
        });
    }

    const newUser = {
        id: users.length + 1,
        name,
        email,
        role: 'user',
        createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    res.status(201).json({
        ...newUser,
    });
});


app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({
            success: 'false',
            message: 'Utilisateur non trouvé',
        });
    }

    const { id, createdAt, ...allowedUpdates } = req.body;

    if (Object.keys(allowedUpdates).length === 0) {
        return res.status(400).json({
            success: 'false',
            message: 'Aucun champ valide fourni pour la mise à jour',
        });
    }

    users[userIndex] = {
        ...users[userIndex],
        ...allowedUpdates,
    };

    res.status(200).json({
        success: 'true',
        data: users[userIndex],
    });
});

app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({
            success: 'false',
            message: 'Utilisateur non trouvé',
        });
    }

    users.splice(userIndex, 1);
    res.status(204).send();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});