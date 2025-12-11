export default defineEventHandler(async(event) => {
  // console.log('New request: ' + getRequestURL(event))

  if(!event.path.startsWith('/api/admin')){
    return;
  }

  const session = await requireUserSession(event)
    const hasAdmindRole = session.user.roles.includes('admin');
    if(!hasAdmindRole){
        throw createError({
            status: 401,
            message: 'Unauthorized'
        });
    }

  return;
})
