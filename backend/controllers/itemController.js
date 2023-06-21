const Item = require('../models/item');
const multer = require('multer');

// Configuración de multer para gestionar la carga de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    const extension = file.originalname.split('.').pop();
    const filename = `${Date.now()}_${Math.floor(Math.random() * 1000)}.${extension}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

// Obtener todos los elementos
exports.getItems = (req, res) => {
  Item.find()
    .then((items) => {
      res.json(items);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// Obtener un elemento por su ID
exports.getItemById = (req, res) => {
  Item.findById(req.params.id)
    .then((item) => {
      if (!item) {
        return res.status(404).json({ message: 'Elemento no encontrado' });
      }
      res.json(item);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// Crear un nuevo elemento
exports.createItem = (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const newItem = new Item({
      name: req.body.name,
      description: req.body.description,
      image: req.file ? req.file.filename : null, // Obtener el nombre del archivo si se ha subido una imagen
      // Otros campos que desees para tu modelo
    });

    newItem.save()
      .then((item) => {
        res.status(201).json(item);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  });
};

// Resto de controladores para actualizar y eliminar elementos


    // Actualizar un elemento existente
    exports.updateItem = (req, res) => {
    Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((item) => {
    if (!item) {
    return res.status(404).json({ message: 'Elemento no encontrado' });
    }
    res.json(item);
    })
    .catch((error) => {
    res.status(500).json({ error: error.message });
    });
    };
    
    // Eliminar un elemento existente
    exports.deleteItem = (req, res) => {
    Item.findByIdAndDelete(req.params.id)
    .then((item) => {
    if (!item) {
    return res.status(404).json({ message: 'Elemento no encontrado' });
    }
    res.json({ message: 'Elemento eliminado correctamente' });
    })
    .catch((error) => {
    res.status(500).json({ error: error.message });
    });
    };