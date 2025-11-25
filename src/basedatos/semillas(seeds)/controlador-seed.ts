import { seedRoles } from "./seed-roles";
import { seedUsuarios } from "./seed-usuarios";
import { seedRolUsuario } from "./seed-rolUsuario";
import { seedPedidos } from "./seed-pedidos";

export async function ejecutarSemillas() {
  await seedRoles();
  await seedUsuarios();
  await seedRolUsuario();
  await seedPedidos();
}