import db, {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  createStats,
  getStats,
  getStatsUser,
  updateStats,
  deleteStats,
  auth_user,
} from '../src/mongodb'; // Reemplaza 'tu_modulo' con la ruta real de tu módulo

async function menu() {
  console.log('==== Menú ====');
  console.log('1. Crear usuario');
  console.log('2. Mostrar usuarios');
  console.log('3. Mostrar estadísticas de uso');
  console.log('4. Acceder a estadísticas de usuario');
  console.log('5. Salir');
}

async function main() {
  while (true) {
    await menu();

    const choice = await prompt('Elije una opción: ');

    switch (choice) {
      case '1':
        await handleCreateUser();
        break;
      case '2':
        await handleGetUsers();
        break;
      case '3':
        await handleGetStats();
        break;
      case '4':
        await handleGetStatsUser();
        break;
      case '5':
        console.log('Saliendo...');
        return;
      default:
        console.log('Opción no válida');
    }
  }
}

async function handleCreateUser() {
  const name = await prompt('Nombre: ');
  const email = await prompt('Email: ');
  const password = await prompt('Contraseña: ');

  try {
    await createUser(name, email, password);
    console.log('Usuario creado con éxito.');
  } catch (error) {
    console.error('Error al crear usuario:', error);
  }
}

async function handleGetUsers() {
  try {
    const users = await getUsers();
    console.log('Usuarios:', users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
  }
}

async function handleGetStats() {
  try {
    const stats = await getStats();
    console.log('Estadísticas de uso:', stats);
  } catch (error) {
    console.error('Error al obtener estadísticas de uso:', error);
  }
}

async function handleGetStatsUser() {
  const email = await prompt('Email del usuario: ');

  try {
    const userStats = await getStatsUser(email);
    console.log('Estadísticas del usuario:', userStats);
  } catch (error) {
    console.error('Error al obtener estadísticas del usuario:', error);
  }
}

main().catch((error) => console.error('Error en la aplicación:', error));
