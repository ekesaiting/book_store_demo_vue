<template>
    <div>
        <h1>这是订单列表</h1>
            <van-card
                    v-for="order in orders"
                    :num="order.num"
                    :price="order.amount.toFixed(2)"
                    :desc="order.specs"
                    :title="order.bookName"
                    :thumb="order.icon"
            >
            <template #footer>
                <van-button size="mini"
                            :type="order.payStatus===1?'info':'danger'"
                            :disabled="order.payStatus!==0"
                            :to="'/detail?orderId='+order.orderId">
                    {{payStatusTrans(order.payStatus)}}
                </van-button>
                <van-button size="mini" type="info" :to="'/info?orderId='+order.orderId" >查看详情</van-button>

            </template>
        </van-card>
        <div style="height: 50px"></div>
        <tab-btn></tab-btn>
    </div>

</template>

<script>
    import TabBtn from "../components/tabBtn";
    export default {
        name: "OrderList",
        data() {
            return {
                type:'danger',
                orders:[
                    {
                        "orderId": "1591444530567676377",
                        "buyerName": "张三",
                        "tel": "17777777777",
                        "address": "北京市北京市东城区123街123号",
                        "num": 1,
                        "bookName": "Python编程 从入门到实践",
                        "specs": "【单件】Python编程 从入门到实践",
                        "price": "65.00",
                        "icon": "../images/f7ceacb6-bafe-453f-aeb2-c678bc11d6d0.jpg",
                        "amount": 75.0,
                        "payStatus": 1,
                        "freight": 10
                    }
                ],
            }
        },
        created() {
            axios.get("http://localhost:8181/order/orderList").then(resp=>{
                console.log(resp);
                this.orders=resp.data.data
            })
        },
        methods:{
            payStatusTrans(status){
                if(status === 1){
                    return '已支付'
                }
                if(status === 0){
                    return '未支付'
                }
            }
        },
        components: {TabBtn},
    }
</script>

<style scoped>

</style>