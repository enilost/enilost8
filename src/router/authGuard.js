import  firebase  from "firebase/compat/app";

export default async function (to,from,next) {
    const you = await firebase.auth().currentUser
    if (you != null) {
        next()
    } else {
        next('/login?ErrorAuthGuard=true')
    }
}