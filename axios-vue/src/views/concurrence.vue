<template>
    <div>

    </div>
</template>
<script>
    /*
        并发请求：同时进行多个请求，并统一处理返回值
        axios.all()  --参数是一个数组，数组里面的值是一个一个的axios请求
        axios.spread()--是在axios.all多个请求完成的时候，把返回数据进行分割处理

            axios.all([callback1,callback2])
            .then(axios.spread((res1, res2)=>{
            }))
            axios.all([callback1,callback2])
            .then(axios.spread((res1, res2)=>{
            }))
    */
    import axios from  'axios'
    export default {
        name: "",
        data () {
            return {

            }
        },
        created() {
            axios.all([
                axios.get("/data.json"),
                axios.get("/city.json")
            ]).then(
                axios.spread((dataRes, cityRes)=>{
                    console.log(dataRes.data, cityRes.data)
                }))
        },
    }
</script>
<style scoped>

</style>