export const useAuthentication = () =>{
    const {loggedIn, session, user, clear, fetch} = useUserSession();

    const login = async (email:string, password: string) => {

        try {
           await $fetch('/api/auth/login',{
            method:'POST',
            body: {email, password}
        }); 
            await fetch(); 
            navigateTo('/?message=login existoso');
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    const register = async(fullname:string, email:string, password:string)=>{
        return true;
    }

    const logout = async() => {
        await clear();
        navigateTo('/?message=logout existoso');
    }



    return {
        loggedIn, session, user,

        isLoggedIn : loggedIn,
        isAdmin : computed(()=>user.value?.roles.includes('admin')),

        fetch,
        login,
        register,
        logout
    }
}