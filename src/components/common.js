export default {
    getUserId(){
        let userId=localStorage.getItem("USER_ID")
        if(userId===null||userId===''){
            throw new error("userId不存在")
        }
        return Number(userId)
    }
}