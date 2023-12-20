import { userService } from "../services/services.js";
import { cartService } from "../services/services.js";

const register = async (req, res) => {
  try {
    if (req.session.isLogged) {
      return res.redirect("/home");
    }

    const { username, surname, email, password } = req.body;

    // Crear usuario y carrito
    const newUser = await createCart({ username, surname, email, password });

    res.redirect("/home");
  } catch (error) {
    console.error(error, "register sessionController");
    res.status(500).send("Error al registrar usuario");
  }
};

const createCart = async (userData) => {
  try {
    // Crear nuevo usuario
    const newUser = await userService.create(userData);

    // Crear nuevo carrito para el usuario
    const newCart = await cartService.create({
      user: newUser._id,
      products: [],
    });

    // Actualizar el campo 'cart' del usuario con el ID del nuevo carrito
    await userService.update(newUser._id, { cart: newCart._id });

    return newUser;
  } catch (error) {
    console.error(error, "createCart sessionController");
    throw new Error("Error al crear usuario y carrito");
  }
};

const login = async (req, res) => {
  try {
    if (req.session.isLogged) {
      return res.redirect("/home");
    }

    const { username, password } = req.body;
    const user = await userService.findOne({ username, password }).lean();
    if (user) {
      req.session.username = user.username;
      req.session.surname = user.surname;
      req.session.email = user.email;
      req.session.userId = user._id;
      req.session.isLogged = true;
      res.redirect("/home");
    } else {
      res.render("login");
    }
    return user;
  } catch (error) {
    console.log(error, "login sessionController");
  }
};

export default { register, login };
