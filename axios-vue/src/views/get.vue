<template>
    <div>
        222
    </div>
</template>
<script>
import axios from 'axios'
/*
    axios请求方法：get,post,put,patch,delete

    get：获取数据
    post：提交数据（表单提交+文件上传）
    put：更新数据（所有数据推送到后端）
    patch：更新数据（只将修改的数据推送到后端）
    delete：删除数据
*/
    export default {
        name: "",
        data () {
            return {

            }
        },
        created() {
            // axios({
            //     method:'post',
            //     url: requestUrl,
            //     data: {
            //         id:requestUrl
            //     }
            // }).then(res=>{

            // })
            axios.get("/data.json",{
                params:{
                    id:12
                }
            })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.error(err); 
            })
    
        },
    }
</script>
<style scoped>

</style>