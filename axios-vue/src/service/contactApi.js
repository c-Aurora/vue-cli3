//封装API，便于调用，一个功能写一个js文件，这个是联系人js文件


const CONTACT_API = {     
    //获取联系人列表
    getContactList: {
        method: 'get',
        url: '/contactList'
    },
    //新建联系人列表
    newContactForm: {
        method: 'post',
        url: '/contact/new/json'
    },
    //编辑联系人列表
    editContactList: {
        method: 'put',
        url: '/contact/edit'
    },
    //删除联系人列表
    delContactList: {
        method: 'delete',
        url: '/contact'
    },
}
//在其他地方需要用的时候，把这个对象导出去export default CONTACT_API 
export default CONTACT_API 