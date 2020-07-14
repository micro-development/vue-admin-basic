<style lang="less">
</style>
<template>
   <it-dialog-container
           :native="native"
           ref="itDialogContainer">
       <el-alert
               type="warning"
               description="通过在接口的 headers 里面增加以下两个参数：'Auth-App-Key' 和 'Auth-App-Authentication' ，即可代替繁琐的登录操作。"
               title="使用说明,请不要泄露以下信息（后面需要通过短信验证码查看）"></el-alert>
       <el-form  label-width="200px">
           <el-form-item label="Auth-App-Key ：">
               {{ authInfo.AuthAppKey }}
           </el-form-item>
           <el-form-item label="Auth-App-Authentication ：">
               {{ authInfo.AuthAppAuthentication }}
           </el-form-item>
       </el-form>
       <it-dialog-footer
               @onSubmit="onCancel"
               :btn-list="btnList"
               slot="it-dialog-footer"></it-dialog-footer>
   </it-dialog-container>
</template>

<script>
    import * as api from '../../service/platform'
    export default {
        name: 'select-secret',
        data () {
            return {
                native: {
                    title: '查看秘钥',
                    width: '800px'
                },
                btnList: [
                    {
                        name: '确定',
                        type: 'primary',
                        method: 'onSubmit'
                    }
                ],
                authInfo: {
                    AuthAppKey: '',
                    AuthAppAuthentication: ''
                }
            }
        },
        props: {
            detail: {
                default: null
            }
        },
        computed: {},
        methods: {
            onCancel () {
                this.$refs.itDialogContainer.hide()
            },
            onOpenDialog () {
                this.$refs.itDialogContainer.show()
                this.$nextTick(() => {
                    if (this.detail && this.detail.uuid) {
                        this.getSecret()
                    }
                })
            },
            async getSecret () {
                const result = await this.$http.fetch(api.getSecret({
                    uuid: this.detail.uuid
                }))
                if (result) {
                    this.authInfo.AuthAppKey = result.info.AuthAppKey
                    this.authInfo.AuthAppAuthentication = result.info.AuthAppAuthentication
                    // this.$log.echo(result, 'getSecret result', 'log')
                }
            }
        }
    }
</script>
