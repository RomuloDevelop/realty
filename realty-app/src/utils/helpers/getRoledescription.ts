import { Role } from '../../constants'

export default function getRoleDescription(role: number) {
  if (role === Role.Admin) return 'Administrador'
  if (role === Role.Client) return 'Cliente'
  else return 'Agente'
}
