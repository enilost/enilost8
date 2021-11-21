
export default ({
    state: {
        error:'',
    },
    mutations: {
        ERROR_MUT(state, payload){
            state.error = payload
        },
        CLEAR_ERROR_MUT(state){
            state.error = '';
        }
    },
    actions: {
        ERROR_ACTION(ctx, payload){
            ctx.commit('ERROR_MUT', payload)
        },
        CLEAR_ERROR_ACTION(ctx){
            ctx.commit('CLEAR_ERROR_MUT')
        }

    },
    getters: {
        ERROR_GETT(state){
            return state.error
        },
    }
});