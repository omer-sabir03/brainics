// Where each role lands after login. The admin dashboard lives at "/", the portals at "/teacher" and "/student".
export const homePathFor = (roles: string[]): string => {
  if (roles.includes('ADMIN')) return '/'
  if (roles.includes('TEACHER')) return '/teacher'
  if (roles.includes('STUDENT')) return '/student'
  return '/login'
}
