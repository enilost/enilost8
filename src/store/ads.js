import  firebase  from "firebase/compat/app";
import 'firebase/compat/firestore'
import 'firebase/compat/storage';
// import store from "@/store/store.js";

export default ({
    state: {
        ads: [
        ],
    },
    mutations: {
        ADDS_MUT(state, payload){
            state.ads = payload
        },
        ADS_USER_MUT(state,payload){
            state.ads.push(payload)
        }
    },
    actions: {
        /* eslint-disable */

        async NEW_ADD_ACTION(ctx, payload){
            ctx.commit('LOADING_MUT',true)
            const uid = ctx.getters.USER_UID
            try {
                payload.id = uid
                const fbVal = await firebase.database().ref(`/ads/`).push(payload)
                payload.key = fbVal.key
                
                //*обрезает расширение файла из его имени
                const imgExt = payload.img.name.slice((payload.img.name.lastIndexOf('.'))+1)
                //*загружает картинку в бд с названием ключа записи+расширение файла
                const fileData = await firebase.storage().ref(`ads/${fbVal.key}.${imgExt}`).put(payload.img)
                //*получает url загруженной картинки
                const imgsrc = await fileData.ref.getDownloadURL()

                payload.img = imgsrc
                //*обновляю url в бд
                await firebase.database().ref(`/ads/`)
                .child(fbVal.key).update({ img:imgsrc})
                
                ctx.commit('ADS_USER_MUT', payload );
                ctx.commit('CLEAR_ERROR_MUT');
                ctx.commit('LOADING_MUT', false);
            } catch (error) {
                console.log(error);
                ctx.commit('ERROR_MUT', error );
                ctx.commit('LOADING_MUT', false);
                throw error;
            }
        },
        async REDACT_AD_ACTION(ctx, payload){
            ctx.commit('LOADING_MUT',true)
            //*если не изменяли картинку
            if (typeof payload.img === 'string') {
                try {
                    await firebase.database().ref(`/ads/`)
                    .child(payload.key).update({
                        description: payload.description,
                        promo: payload.promo,
                        title: payload.title
                    });
                    ctx.dispatch('ALL_ADS_ACTION');
                    ctx.commit('LOADING_MUT', false);
                } catch (error) {
                    ctx.commit('ERROR_MUT', error );
                    ctx.commit('LOADING_MUT', false);
                    throw error;
                }
            }
            //*если изменяли картинку
            if (typeof payload.img === 'object') {
                try {
                    const imgExt = payload.img.name.slice((payload.img.name.lastIndexOf('.'))+1)

                    //*загружает картинку в бд с названием ключа записи+расширение файла
                    const fileData = await firebase.storage().ref(`ads/${payload.key}.${imgExt}`).put(payload.img)
                    //*получает url загруженной картинки
                    const imgsrc = await fileData.ref.getDownloadURL()
                    //*изменяет запись в базе
                    await firebase.database().ref(`/ads/`)
                    .child(payload.key).update({
                        description: payload.description,
                        img: imgsrc,
                        promo: payload.promo,
                        title: payload.title
                    });
                    ctx.dispatch('ALL_ADS_ACTION');
                    ctx.commit('LOADING_MUT', false);
                } catch (error) {
                    ctx.commit('ERROR_MUT', error );
                    ctx.commit('LOADING_MUT', false);
                    throw error;
                }
            }
        },
        async ALL_ADS_ACTION(ctx){
            try {
                const rcrds = (await firebase.database().ref(`/ads/`).once('value')).val()

                Object.values(rcrds).forEach((e, i) =>{
                    e.key = Object.keys(rcrds)[i]
                })

                ctx.commit('ADDS_MUT', Object.values(rcrds))
            } catch (error) {
                console.log(error);
            }
        },
        //*удаление из бд
        async DELETE_ADD_ACTION(ctx, pld){
            ctx.commit('LOADING_MUT', true);
            try {
                await firebase.database().ref(`/ads/`).child(pld.key).remove();
                await ctx.dispatch("ALL_ADS_ACTION");
                ctx.commit('LOADING_MUT', false);
            } catch (error) {
                console.log(error);
                ctx.commit('ERROR_MUT', error );
                ctx.commit('LOADING_MUT', false);
                throw error;
            }
        }
    },
    getters: {
        ADS_GETT(state){
            return state.ads
        },
        ADS_PROMO_GETT(state){
            const promo = state.ads.filter((e) => { return e.promo === true })
            return promo
        },
        MY_ADDS_GETT(state, gett){
            if (gett.USER_GETT) {
                let uid = gett.USER_GETT.uid;
            
                let userAds = state.ads.filter(e =>{
                    return e.id == uid
                })
                return userAds
            }
        }
    }
});