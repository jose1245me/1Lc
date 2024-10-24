require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');


const app = express();  // Mueve la declaración de 'app' aquí
const port = 3000;

// Middleware para CORS y parseo de JSON
app.use(cors({
  origin: 'http://localhost:3000',
}))
app.use(express.json());

// Conexión a MongoDB Atlas
const connectDB = async () => {
  try {
    console.log('URI de conexión:', process.env.MONGODB_URI); // Verifica que esta línea imprima la URI
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conectado a MongoDB Atlas');
  } catch (error) {
    console.error('Error de conexión:', error.message);
    process.exit(1);
  }
};

// Definición del modelo de usuario
const UserSchema = new mongoose.Schema({
  nickname: { type: String, required: true },
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
    // Cifrar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario con la contraseña cifrada
    const newUser = new User({ nickname, email, password: hashedPassword });
    await newUser.save(); // Guardar en la base de datos

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    if (error.code === 11000) { // Código de error para duplicado de clave única (email en este caso)
      res.status(400).json({ message: 'Este correo electrónico ya está registrado' });
    } else {
      res.status(400).json({ message: 'Error en el registro: ' + error.message });
    }
  }
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});