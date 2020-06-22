<template>
    <div class="goods">
        <van-cell-group class="goods-cell-group">
            <van-cell>
                <van-col span="16"><van-icon name="location-o" style="margin-right: 30px;" />收货人：{{data.buyerName}}</van-col>
                <van-col>{{data.tel}}</van-col>
                <van-col span="21" style="padding-left: 43px;font-size: 13px">收货地址：{{data.address}}</van-col>
            </van-cell>
        </van-cell-group>

        <van-card
                :num="data.num"
                :price="data.price"
                :desc="data.specs"
                :title="data.phoneName"
                :thumb="data.icon"
        />

        <van-cell-group class="goods-cell-group">
            <van-cell class="goods-express">
                <van-col span="21">配送方式</van-col>
                <van-col>快递</van-col>
            </van-cell>
        </van-cell-group>

        <van-cell-group class="goods-cell-group">
            <van-cell class="goods-express" style="font-weight: bold">
                <van-col span="19">商品金额</van-col>
                <van-col style="color: red">￥{{(data.amount-data.freight).toFixed(2)}}</van-col>
            </van-cell>
        </van-cell-group>

        <van-cell-group>
            <van-cell class="goods-express" style="font-weight: bold">
                <van-col span="20">运费</van-col>
                <van-col style="color: red">￥{{data.freight}}</van-col>
            </van-cell>
        </van-cell-group>

        <van-submit-bar
                :price="data.amount*100"
                button-text="确认付款"
                @submit="onSubmit"
        >
            <van-button round size="small" type="default" @click="cancel">取消订单</van-button>
        </van-submit-bar>
    </div>
</template>

<script>
    import {
        Tag,
        Col,
        Icon,
        Cell,
        Toast,
        CellGroup,
        Swipe,
        SwipeItem,
        GoodsAction,
        GoodsActionIcon,
        GoodsActionButton, Dialog
    } from 'vant';
    export default {
        components: {
            [Tag.name]: Tag,
            [Col.name]: Col,
            [Icon.name]: Icon,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            [GoodsAction.name]: GoodsAction,
            [GoodsActionIcon.name]: GoodsActionIcon,
            [GoodsActionButton.name]: GoodsActionButton
        },
        data() {
            return {
                data:{
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
            };
        },
        created(){
            const _this = this
            axios.get('http://localhost:8181/order/detail/'+this.$route.query.orderId).then(function (resp) {
                _this.data = resp.data.data
            })
        },
        methods: {
            onSubmit:function () {
                const _this = this
                axios.put('http://localhost:8181/order/pay/'+this.$route.query.orderId).then(function (resp) {
                    if(resp.data.code === 2003){
                        let instance = Toast('订单'+resp.data.data.orderId+'支付成功');
                        setTimeout(() => {
                            instance.close();
                            _this.$router.push('/success?orderId='+_this.data.orderId+"&amount="+(_this.data.amount))
                        }, 1000)
                    }
                })
            },
            cancel(){
                const _this = this;
                Dialog.confirm({
                    title: '',
                    message: '确定要取消当前订单',
                }).then(() => {
                    axios.delete('http://localhost:8181/order/cancel/'+this.data.orderId).then(function (resp) {
                        if (resp.data.code === 2002) {
                            setTimeout(() => {
                                _this.$router.push('/')
                            }, 1000)
                        }
                    })
                })
                    .catch(() => {
                        // on cancel
                    });
            }
        }
    };
</script>

<style lang="less">

    .goods {
        padding-bottom: 50px;
        &-swipe {
            img {
                width: 100%;
                display: block;
                height: 300px;
            }
        }
        &-title {
            font-size: 16px;
        }
        &-price {
            color: #f44;
        }
        &-express {
            color: #999;
            font-size: 12px;
            padding: 95px 915px;
        }
        &-cell-group {
            margin: 15px 0;
        }
        &-tag {
            margin-left: 5px;
        }
    }
</style>