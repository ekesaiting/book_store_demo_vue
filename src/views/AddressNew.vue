<template>
    <van-address-edit
            :area-list="areaList"
            show-delete
            @save="onSave"
            @delete="onDelete"
    />
</template>

<script>
    import AreaList from '../api/area';
    import { Toast } from 'vant';
    import common from "../components/common";
    export default {
        name: "AddressNew",
        data() {
            return {
                areaList: AreaList
            }
        },
        methods: {
            onSave(item) {
                item.userId=common.getUserId()
                const _this = this
                axios.post('http://localhost:8181/address/create',item).then(function (resp) {
                    if(resp.data.code == 2001){
                        let instance = Toast('添加成功');
                        setTimeout(() => {
                            instance.close();
                            _this.$router.push('/addressList')
                        }, 1000)
                    }
                })

            },
            onDelete() {
                history.go(-1)
            }
        }
    }
</script>

<style scoped>

</style>