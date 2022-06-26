<template>
    <Dialog
    class="dialog"
    width="430px"
    :show-close="false"
    :title="title"
    :close-on-click-modal="false"
    :visible.sync="visible"
    >
         <div>{{message}}</div>
         <div slot="footer">
            <Button @click="visible=false">取消</Button>
            <Button type="primary">确定</Button>
         </div>
    </Dialog>
</template>

<script>
import { Dialog,Button } from 'element-ui'
    export default {
        name:"MyConfirm",
        data() {
            return {
                /**
                 * 是否显示
                 */
                visible: false,
            };
        },
        components:{
            Dialog,
            Button
        },
        props:{
            /**
             * 标题
             */
            title:String,
            /**
             * 消息
             */
            message:String,
        }
    }
</script>

<style>

</style>