import  firebase  from "firebase/compat/app";

export default ({
    state: {
        user: null,
        loading: false,
    },
    mutations: {
        USER_MUT(state, payload){
            state.user = payload
        },
        LOADING_MUT(state, payload){
            state.loading = payload
        },
    },
    actions: {
        //*логаут
        LOGOUT_ACTION(ctx){
            firebase.auth().signOut()
            ctx.commit('USER_MUT', null)
        },
        //*логин
        async LOGIN_ACTION(ctx, user){
            ctx.commit('LOADING_MUT',true)
            try {
                await firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                ctx.dispatch('ID_FROM_BASE_ACTION')
                ctx.commit('LOADING_MUT',false)
                ctx.commit('CLEAR_ERROR_MUT')
            } catch (error) {
                ctx.commit('ERROR_MUT', error )
                ctx.commit('LOADING_MUT',false)
                throw error;
            }
        },
        //*регистрация и добавление поля инфо в базу
        async REGISTRATION_ACTION(ctx, user){
            ctx.commit('LOADING_MUT',true)
            try {
                await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)

                 ctx.dispatch('ID_FROM_BASE_ACTION')
                 ctx.commit('LOADING_MUT',false)
                 ctx.commit('CLEAR_ERROR_MUT')
            } catch (error) {
                ctx.commit('LOADING_MUT',false)
                ctx.commit('ERROR_MUT', error )
                // console.log(error);
                throw error;
            }
        },
        //*айдишник юзера из базы
        async ID_FROM_BASE_ACTION(ctx) {
            const user = await firebase.auth().currentUser
            ctx.commit('USER_MUT', user )//|| null)
        },
        LOADING_ACTION(ctx, payload){
            ctx.commit('LOADING_MUT', payload)
        },
    },
    getters: {
        LOADING_GETT(state){
            return state.loading
        },
        USER_GETT(state){
            return state.user
        },
        USER_UID(state){
            if (state.user) {
                return state.user.uid
            }
        }
    }
});