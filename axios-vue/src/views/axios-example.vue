<template>
    <div>

    </div>
</template>
<script>
    /*
        axios实例
        后端接口地址有多个，并且超时时长不一样

    
    */
    import axios from 'axios'
    export default {
        name: "",
        data () {
            return {

            }
        },
        created() {
            let instance = axios.create({     //创建实例-用于两种以上的后台端口
                baseURL: 'http://localhost:8080',
                timeout: 1000,
                headers: headers
            })
            let axios2 = axios.create({     //创建实例
                baseURL: 'http://localhost:8090',
                timeout: 5000,
                headers: headers
            })
            instance.get('/data.json')
            .then(res => {
                console.log(res)
            })


        },
    }
    /*
        1、axios全局配置--一般就两处
            axios.defaults.baseURL='http://localhpst:8080';
            axios.defaults.timeout=1000;
        2、axios实例配置
            let instance = axios.create();
            instance.defaults.timeout=3000;
        3、axios请求配置
            instance.get('/data.json',{
                timeout:5000
            })
            .then(res => {
                console.log(res)
            })


        实际开发中
            全局配置很少用到
            开发中一般会声明一个实例
    */
   
</script>
    
<style scoped>

</style>