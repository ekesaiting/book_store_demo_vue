<template>
    <div>

        <van-address-list
                v-model="chosenAddressId"
                :list="list"
                default-tag-text="默认"
                @add="onAdd"
                @edit="onEdit"
                @select="onselect"

        >
        </van-address-list>

    </div>
</template>

<script>
    import { Dialog} from 'vant';
    import common from "../components/common";

    export default {
        data() {
            return {
                chosenAddressId: 0,
                list: ''
            }
        },
        created() {
            const _this = this
            axios.get('http://localhost:8181/address/list/'+common.getUserId()).then(function (resp) {
                _this.list = resp.data.data
            })
        },
        methods: {
            onAdd() {
                this.$router.push('/addressNew')
            },
            onEdit(item) {
                //得到深拷贝的原始数据对象。
                let data = JSON.stringify(item)
                this.$router.push({path: '/addressEdit', query: {item: data}})
            },
            onselect(item) {
                let orderForm = {
                    name: item.name,
                    tel: item.tel,
                    address: item.address,
                    specsId: this.$store.state.specsId,
                    quantity: this.$store.state.quantity,
                    userId: common.getUserId()
                }
                const _this = this;
                Dialog.confirm({
                    title: '',
                    message: '使用当前信息创建订单',
                }).then(() => {
                    console.log(orderForm);
                    axios.post('http://localhost:8181/order/create', orderForm).then(function (resp) {
                        if (resp.data.code === 2001) {
                            setTimeout(() => {
                                _this.$router.push('/detail?orderId=' + resp.data.data.orderId)
                            }, 1000)
                        }
                    })
                })
                    .catch(() => {
                        // on cancel
                    });


                /*   axios.post('http://localhost:8181/order/create',orderForm).then(function (resp) {
                       if(resp.data.code == 2001){
                           let instance = Toast('下单成功');
                           setTimeout(() => {
                               instance.close();
                               _this.$router.push('/detail?orderId='+resp.data.data.orderId)
                           }, 1000)
                       }
                   })*/
            },
            components: {
                [Dialog.Component.name]: Dialog.Component,
            },
        }
    }
</script>