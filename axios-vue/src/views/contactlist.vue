<template>
    <div>
        <!-- 联系人列表 -->
        <van-contact-list 
            :list="list" 
            @add="onAdd" 
            @edit="onEdit" 
        />

        <!-- 联系人编辑 -->
        <van-popup v-model="showEdit" position="bottom">
            <van-contact-edit
                :contact-info="editingContact"
                :is-edit="isEdit"
                @save="onSave"
                @delete="onDelete"
            />
        </van-popup>
    </div>
</template>
<script>
    import { ContactList,Toast,ContactEdit,Popup } from 'vant';
    import axios from 'axios'
    export default {
        name: "",
        components: {
            [ContactList.name]:ContactList,//只有在<template></template>使用到才注册，Toast没在里面使用，不用注册
            [ContactEdit.name]:ContactEdit,
            [Popup.name]:Popup,
        },
        data () {
            return {
                list: [],
                instance: null,//axios实例
                showEdit: false,//编辑弹窗显示隐藏
                editingContact: {},//正在编辑的联系人数据
                isEdit: false,//控制新建或者编辑
            }
        },
        created() {
            this.instance = axios.create({
                baseURL: 'http://localhost:9000/api',
                timeout: 1000
            })
            this.getList();
        },
        methods: {
            //获取联系人列表

                //封装
            async getList () {
                let res = await this.$Http.getContactList();
                this.list = res.data;
            },

                //没封装
            // getList () {
            //     this.instance.get("/contactList")
            //     .then(res => {
            //         this.list = res.data.data;
            //     })
            //     .catch(err => {
            //         console.log(err)
            //         Toast('请求失败，请稍后再试'); 
            //     })
            // },
            // 添加联系人
            onAdd() {
                this.showEdit = true;
                this.isEdit = false;
                this.editingContact = {};//新建前清空数据
            },
            //编辑联系人
            onEdit (info) {
                this.showEdit = true;
                this.isEdit = true;
                this.editingContact = info;
            },
            //保存
            async onSave (info) {
                if (this.isEdit) {
                    //编辑保存
                        //封装
                        await this.$Http.editContactList(info);
                        Toast("编辑成功");
                        this.showEdit = false;
                        this.getList();
                        //没封装
                    // this.instance.put("/contact/edit",info)
                    // .then(() => {
                    //     Toast("编辑成功");
                    //     this.showEdit = false;
                    //     this.getList();
                    // })
                    // .catch(() => {
                    //     Toast('请求失败，请稍后再试'); 
                    // })
                } else {
                    //新建保存
                        //封装
                        
                        await this.$Http.newContactForm(info);
                        Toast("新建成功");
                        this.showEdit = false;
                        this.getList();

                        //没封装
                    // this.instance.post("/contact/new/json",info)
                    // .then(res => {
                    //     console.log(res)
                    //     Toast("新建成功");
                    //     this.showEdit = false;
                    //     this.getList();
                    // })
                    // .catch(() => {
                    //     Toast('请求失败，请稍后再试'); 
                    // })
                }
            },
            //删除
            async onDelete (info) {
                //封装
                await this.$Http.delContactList({
                    id: info.id
                });
                Toast("删除成功");
                this.showEdit = false;
                this.getList();


                //没封装
                // this.instance.delete('/contact',{
                //     params:{
                //         id: info.id
                //     }
                // })
                // .then(res => {
                //     console.log(res)
                //     Toast("删除成功");
                //     this.showEdit = false;
                //     this.getList();
                // })
                // .catch(() => {
                //     Toast('请求失败，请稍后再试'); 
                // })
            }
        }
    }
</script>
<style scoped>
    .van-popup{
        height: 100%;
    }
    .van-contact-list__add{
        z-index: 0;
    }
</style>