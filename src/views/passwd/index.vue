<style lang="less">
    .account-passwd{
        padding: 20px 100px;
        .account-form{
            margin-top: 20px;
            width: 500px;
        }
        .form-item-info{
            display: inline-block;
            width: 100%;
            padding: 2px 0;
        }
        .form-item-button{
            padding: 10px 0;
        }
        .profile-upload-drag{
            width: 100%;
            div{
                width: 100%;
            }
        }
    }
</style>
<template>
    <component-container>
        <div class="account-passwd" slot="content">
            <el-form
                label-width="100px"
                class="account-form"
                :model="formData"
                :rules="formRule"
                size="medium"
                ref="formData">
                <el-form-item label='原密码' prop="passwd" required>
                    <el-input
                        type="password"
                        placeholder="请输入原来的密码"
                        v-model="formData.passwd"></el-input>
                </el-form-item>
                <el-form-item label='新密码' prop="new_passwd" required>
                    <el-input
                        type="password"
                        placeholder="请输入原新密码"
                        v-model="formData.new_passwd"></el-input>
                </el-form-item>
                <el-form-item label='确认密码' prop="confirm_passwd" required>
                    <el-input
                        type="password"
                        placeholder="请确认新密码"
                        v-model="formData.confirm_passwd"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSavePassword">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </component-container>
</template>

<script>
    import * as accountApi from '../../service/account'
    export default {
        name: 'account-passwd',
        data () {
            return {
                formData: {
                    password: '',
                    new_passwd: '',
                    confirm_passwd: ''
                },
                formRule: {
                    passwd: [
                        {
                            required: true,
                            message: '原密码必填'
                        }
                    ],
                    new_passwd: [
                        {
                            required: true,
                            message: '新密码必填'
                        },
                        {
                            min: 8,
                            max: 32,
                            message: '密码长度必须在8-32位之间'
                        }
                    ],
                    confirm_passwd: [
                        {
                            required: true,
                            message: '确认密码必填'
                        },
                        {
                            validator: (rule, value, callback) => {
                                if (value !== this.formData.new_passwd) {
                                    callback(new Error('两次密码不一致'))
                                } else {
                                    callback()
                                }
                            }
                        }
                    ]
                }
            }
        },
        computed: {},
        mounted () {
            this.init()
        },
        methods: {
            async init () {
                // await this.getProfileInfo()
            },
            /**
             * 保存简介信息
             */
            async onSavePassword () {
                this.$refs.formData.validate(async (valid) => {
                    if (valid) {
                        this.$log.echo(this.formData, 'passwd/index.vue onSavePassword this.formData', 'log')
                        const result = await this.$http.fetch(accountApi.updatePassword(this.formData))
                        this.$log.echo(result, 'onSavePassword result', 'log')
                        if (result) {
                            this.$message.success('修改密码成功')
                            await this.$store.dispatch('clearAccount')
                            this.$router.push({
                                path: '/login'
                            })
                        }
                    }
                })
            }
        }
    }
</script>
