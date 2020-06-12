<template>
    <div>
        <van-row>
            <van-col span="24">
                <van-tabs @click="selectTab" sticky title-active-color="#E32DAB" color="#E32DAB" :line-width="100"
                          :line-height="2">

                    <van-tab v-for="index in categories.length" :title="categories[index-1].name" class="tab">

                        <van-card v-for="(item,index) in books"
                                  :price="item.price"
                                  :desc="item.desc"
                                  :title="item.title"
                                  :thumb="item.thumb"
                        >
                            <template #tags>
                                <van-tag v-for="tag in item.tag" color="#f2826a" style="margin-left: 5px;">
                                    {{tag.name}}
                                </van-tag>
                            </template>
                            <template #footer>
                                <van-button round type="info" size="mini" @click="buy(index)">购买</van-button>
                            </template>
                        </van-card>

                    </van-tab>
                </van-tabs>
            </van-col>
        </van-row>

        <van-sku
                v-model="show"
                :sku="sku"
                :goods="goods"
                :hide-stock="sku.hide_stock"
                @buy-clicked="onBuyClicked"
        >
            <template #sku-actions="props">
                <div class="van-sku-actions">

                    <!-- 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
                    <van-button
                            square
                            size="large"
                            type="danger"
                            @click="props.skuEventBus.$emit('sku:buy')"
                    >
                        购买
                    </van-button>
                </div>
            </template>
        </van-sku>
            <tab-btn></tab-btn>
    </div>


</template>

<script>
    import {
        //Toast,
        PullRefresh,
        Swipe,
        SwipeItem,
    } from 'vant';
    import Api from '../api/api';
    import tabBtn from "../components/tabBtn";
    export default {
        comments: {
            [PullRefresh.name]: PullRefresh,
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem
        },
        data() {
            return {
                categories: [],
                books: [],
                show: true,
                sku: {},
                goods: {}
            }
        },
        created() {
            const _this = this
            axios.get('http://localhost:8181/book/index').then(function (resp) {
                _this.books = resp.data.data.books
                _this.categories = resp.data.data.categories
            })
        },
        methods: {
            selectTab(index) {
                const _this = this;
                //"http://localhost:8181/book/getBookByCategoryType/"
                    axios.get(Api.getBookByCategoryType + this.categories[index].type).then(function (resp) {
                        _this.books = resp.data.data;
                    })
            },
            buy(index){
                this.show = true
                const _this = this
                axios.get('http://localhost:8181/book/getSpecsByBookId/'+ this.books[index].id).then(function (resp) {
                    _this.goods = resp.data.data.goods
                    _this.sku = resp.data.data.sku
                })
            },
            onBuyClicked(item) {
                this.$store.state.specsId = item.selectedSkuComb.s1
                this.$store.state.quantity = item.selectedNum
                this.$router.push('/addressList')
            }
        },
        components:{
            tabBtn
        }
    }
</script>