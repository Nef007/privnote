
const request =  async (url, method = 'GET', body = null, headers = {}) => {

    if (body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
    }


    const response = await fetch(url, {method, body, headers})
    const data = await response.json()

    if (!response.ok) {

        throw new Error(data.message || 'Что то пошло не так')
    }

    return data

}




export const authAPI = {

    login(form) {
        return  request('/auth/login', 'POST', {...form})

    },

    auth(token) {

        return  request('/auth/me', 'GET', null, {
            Authorization: `Bearer ${token}`
        })

    },

    register(form){
        return   request('/auth/register', 'POST', {...form})
    },
    reset(form){
        return   request('/auth/reset', 'POST', {...form})
    },
    isAdmin(){
        return   request('/auth/isadmin', 'GET' )
    }


}

export const linkAPI = {

    create(form, link) {
        return  request('/api/link/create', 'POST', {form, link})

    },
    get() {
        return  request(`/api/link/`, 'GET', null)
    },
    getLink(id, password) {
        return  request(`/api/link/${id}`, 'POST' , {password} )
    },
    deleteLink(id) {
        return  request(`/api/link/${id}`, 'DELETE'  )
    },
    checkLink(id) {
        return  request(`/api/link/check/${id}`, 'GET' )
    },
    saveText(id, text, token ) {
        return  request(`/api/link/save/${id}`, 'POST', {text},{
            Authorization: `Bearer ${token}`} )},
    deleteBd(token ) {
        return  request(`/api/link/`, 'DELETE', null,{
            Authorization: `Bearer ${token}`} )}


    // addDevices(dataForm, token) {
    //     return request('/api/devices/generate', 'POST', {dataForm}, {
    //         Authorization: `Bearer ${token}`
    //     })
    //
    // },


}
