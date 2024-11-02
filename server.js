require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const app = express();
const port = 3000;

// Configurar CORS
app.use(cors({
  origin: '*',
}));

// Middleware para JSON
app.use(express.json());

// Conectar a MongoDB Atlas
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conectado a MongoDB Atlas');
  } catch (error) {
    console.error('Error de conexión:', error.message);
    process.exit(1);
  }
};

// Definir el esquema del usuario
const UserSchema = new mongoose.Schema({
  nickname: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

// Conectar a la base de datos
connectDB();

// Ruta para registrar usuarios
app.post('/register', async (req, res) => {
  const { nickname, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ nickname, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'Usuario registrado exitosamente', token });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Este correo electrónico / usuario ya está registrado' });
    } else {
      res.status(400).json({ message: 'Error en el registro: ' + error.message });
    }
  }
});

// Ruta para iniciar sesión
app.post('/login', async (req, res) => {
  const { emailOrUser, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: emailOrUser }, { nickname: emailOrUser }],
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.json({ success: true, token });
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send('Token no proporcionado');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send('Token no válido');
    }
    req.userId = decoded.userId;
    next();
  });
};

// Ruta protegida
app.get('/main', verifyToken, (req, res) => {
  res.send('Bienvenido a la ruta de inicio, el token es válido.');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});