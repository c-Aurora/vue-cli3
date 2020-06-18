<template>
    <div>

    </div>
</template>
<script>
    /*
        拦截器:在请求或响应被处理前拦截他们
        请求拦截器
        响应拦截器
    */
    import axios from 'axios'
    export default {
        name: "",
        data () {
            return {

            }
        },
        created() {
        //请求拦截器
            axios.interceptors.request.use(config => {
            // 在发送请求前做些什么
            return config;
            },error => {
            // 在请求错的时候做些什么
            return Promise.reject(error);
            });
        //响应拦截器
            axios.interceptors.response.use(response => {
            // 请求成功对响应数据做处理
            return response;
            },error => {
            // 响应错误做些什么
            return Promise.reject(error);
            });

        //例子：登录状态（token:'字符串'）   
            //有些接口需要登录状态才能访问的,需要把koken添加到headers里面
                //实际开发中一般给实例添加拦截器，一般不会给axios添加，
                //如果给aixos添加可能会造成全局污染，因为axios是全局都可用的
                let instance = axios.create({})
                instance.interceptors.request.use(config => {
                    config.headers.token = '字符串'
                    return config;
                },error => {
                    return Promise.reject(error);
                });
            //有些接口不需要登录就能访问，这时候就可以创建两个实例，上面一个需要登录访问，下面则不需要
                let newInstance = axios.create({})
                newInstance.interceptors.request.use(config => {               
                    return config;
                },error => {
                    return Promise.reject(error);
                });

        //例子：移动端开发--请求时给页面添加一个等待的样式
                let instance_iphone=axios.create({}) 
                instance_iphone.interceptors.request.use(config => {
                    $(".nav").show();//请求前添加样式
                    return config;
                },error => {
                      return Promise.reject(error);
                });
                axios.interceptors.response.use(response => {
                    $(".nav").hide();//请求成功关掉样式
                    return response;
                },error => {
                    return Promise.reject(error);
                });   

        //例子：实际开发中，添加一个统一的错误处理
                let instance=axios.create({})  //一、创建一个实例
                instance.interceptors.request.use(config => {  //二、给实例添加一个请求拦截器
                    return config;
                },error => {
                    //请求错误，一般http状态码以4开头
                    //常见：401超时，404 not found
                    $("tips").show()
                    setTimeout(() => {
                        $("tips").hide()
                    },2000);
                    return Promise.reject(error);
                });  
                axios.interceptors.response.use(response => {   //三、添加一个响应拦截器
                    return response;
                },error => {
                    //响应错误处理，一般http状态码以5开头
                    //常见：500系统错误，502系统重启
                    $("tips").show()
                    setTimeout(() => {
                        $("tips").hide()
                    },2000);
                    return Promise.reject(error);
                });
                instanc.get("/data.json")
                .then(res => {
                    console.log(res)
                })//如果不需要做错误处理，只显示上面的弹窗，catch()就可以省略了，如果还要做其他错误处理，则加上catch()
                .catch(err => {
                    console.error(err); 
                })
        },
    }
</script>
<style scoped>

</style>