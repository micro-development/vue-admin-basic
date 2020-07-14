<style lang="less">
    .account-user{
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
        .verify-code-item{
            margin-top: 10px;
            .el-input{
                width: 62%;
                float: left;
            }
            .el-button{
                width: 36%;
                float: right;
            }
        }
    }
</style>
<template>
    <component-container>
        <div class="account-user" slot="content">
             <el-alert
                 v-if="!apiData.user_name"
                title="您没有设置过用户名，不允许其他操作，也进不了其他页面，请先设置用户名，谢谢。"
                type="warning"
                :closable='false'>
            </el-alert>
            <el-form
                label-width="100px"
                class="account-form"
                :model="formData"
                size="medium"
                ref="formData">
                <el-form-item label='用户名'>
                    <div class="form-item-info">
                        <span>{{ apiData.user_name || '暂未设置用户名' }}</span>
                        <el-button
                            v-if="!setting.user_name && !apiData.user_name"
                            class='fr'
                            icon="el-icon-edit"
                            circle
                            @click='onEditUsername(true)'></el-button>
                    </div>
                    <el-row v-if="setting.user_name">
                        <el-input
                            placeholder="请输入用户名"
                            v-model="formData.user_name"></el-input>
                        <div class="form-item-info form-item-button">
                            <el-button type="primary" round :disabled="!formData.user_name" @click="onBindUserName">确定</el-button>
                            <el-button type="default" round @click='onEditUsername(false)'>取消</el-button>
                        </div>
                    </el-row>
                </el-form-item>
                <el-form-item label='邮箱'>
                    <div class="form-item-info">
                        <span>{{ apiData.email || '暂未绑定邮箱' }}</span>
                        <el-button v-if="!setting.email" class='fr' icon="el-icon-edit" circle @click='onEditEmail(true)'></el-button>
                    </div>
                    <el-row v-if="setting.email">
                        <el-input
                            placeholder="请输入邮箱"
                            v-model="formData.email"></el-input>
                        <div class="verify-code-item email">
                            <el-input :disabled="!formData.email" v-model='formData.email_verify_code'></el-input>
                            <el-button :disabled="setting.email_code" @click="onSendEmailCode">{{ emailCodeText }}</el-button>
                        </div>
                        <div class="form-item-info form-item-button">
                            <el-button type="primary" round :disabled="!formData.email_verify_code" @click="onBindEmail">确定</el-button>
                            <el-button type="default" round @click='onEditEmail(false)'>取消</el-button>
                        </div>
                    </el-row>
                </el-form-item>
                <!--<el-form-item label='手机号'>
                    <div class="form-item-info">
                        <span>{{ apiData.mobile || '暂未绑定手机' }}</span>
                        <el-button v-if="!setting.mobile" class='fr' icon="el-icon-edit" circle @click='onEditMobile(true)'></el-button>
                    </div>
                    <el-row v-if="setting.mobile">
                        <el-input
                            placeholder="请输入手机号"
                            v-model="formData.mobile"></el-input>
                        <div class="verify-code-item mobile">
                            <el-input v-model='formData.mobile_verify_code'></el-input>
                            <el-button :disabled="setting.mobile_code" @click="onSendMobileCode">{{ mobileCodeText }}</el-button>
                        </div>
                        <div class="form-item-info form-item-button">
                            <el-button type="primary" round @click="onBindMobile">确定</el-button>
                            <el-button type="default" round @click='onEditMobile(false)'>取消</el-button>
                        </div>
                    </el-row>
                </el-form-item>-->
            </el-form>
        </div>
    </component-container>
</template>

<script>
    import * as accountApi from '../../service/account'
    export default {
        name: 'account-user',
        data () {
            return {
                // 编辑设置字段开关
                setting: {
                    // 编辑用户名
                    user_name: false,
                    // 编辑邮箱
                    email: false,
                    // 邮箱验证码
                    email_code: false,
                    // 手机号
                    mobile: false,
                    // 手机验证码
                    mobile_code: false,
                    // 密码
                    password: false
                },
                formData: {
                    user_name: '',
                    email: '',
                    email_verify_code: '',
                    mobile: '',
                    mobile_verify_code: ''
                },
                apiData: {
                    user_name: '',
                    email: '',
                    mobile: ''
                },
                timer: {
                    email: null,
                    email_count: 0,
                    mobile: null,
                    mobile_count: 0
                },
                formRule: {}
            }
        },
        computed: {
            emailCodeText () {
                if (this.setting.email_code === true) {
                    return `${this.timer.email_count} 秒后重试`
                }
                return '发送邮箱验证码'
            },
            mobileCodeText () {
                if (this.setting.mobile_code === true) {
                    return `${this.timer.mobile_count} 秒后重试`
                }
                return '发送手机验证码'
            }
        },
        mounted () {
            this.init()
        },
        methods: {
            async init () {
                await this.getUserInfo()
                this.resetTimerEmail()
                    .resetTimerMobile()
            },
            resetTimerEmail () {
                this.formData.email = ''
                this.formData.email_verify_code = ''
                this.setting.email_code = false
                this.timer.email_count = 120
                clearInterval(this.timer.email)
                // this.$log.echo(this.timer.email, 'resetTimerEmail', 'log')
                return this
            },
            resetTimerMobile () {
                this.formData.mobile = ''
                this.formData.mobile_verify_code = ''
                this.setting.mobile_code = false
                this.timer.mobile_count = 120
                clearInterval(this.timer.mobile)
                // this.$log.echo(this.timer.mobile, 'resetTimerMobile', 'log')
                return this
            },
            resetUserName () {
                this.formData.user_name = ''
            },
            async getUserInfo () {
                const result = await this.$http.fetch(accountApi.getUserInfo())
                this.$log.echo(result, 'getProfileInfo req', 'log')
                if (result) {
                    this.apiData.user_name = result.detail.user_name
                    this.apiData.email = result.detail.email
                    this.apiData.mobile = result.detail.mobile
                    this.$log.echo(this.$store.getters.getUserinfo)
                    // const userinfo = JSON.parse(JSON.stringify(this.$store.getters.getUserinfo))
                    // userinfo.user_name = this.apiData.user_name
                    // await this.$store.dispatch('setUserInfo', userinfo)
                }
            },
            /**
             * 编辑/取消 用户名
             */
            onEditUsername (type) {
                this.setting.user_name = type
                this.resetUserName()
            },
            async onBindUserName () {
                if (!this.formData.user_name) {
                    this.$message.error('用户名不能为空')
                    return false
                }
                if (this.formData.user_name.length < 4) {
                    this.$message.error('用户名长度不能少于4位')
                    return false
                }
                const result = await this.$http.fetch(accountApi.bindUserName({
                    user_name: this.formData.user_name
                }))
                if (result) {
                    this.$message.success('设置用户名成功')
                    const userinfo = JSON.parse(JSON.stringify(this.$store.getters.getUserinfo))
                    userinfo.user_name = this.formData.user_name
                    await this.$store.dispatch('setUserInfo', userinfo)
                    this.setting.user_name = false
                    this.resetUserName()
                    await this.getUserInfo()
                }
            },

            /**
             * 编辑/取消 邮箱
             */
            onEditEmail (type) {
                this.setting.email = type
                this.resetTimerEmail()
            },
            async onSendEmailCode () {
                if (this.setting.email_code === true) {
                    return
                }
                if (!this.formData.email) {
                    this.$message.error('请输入邮箱')
                    return
                }
                if (this.formData.email === this.apiData.email) {
                    this.$message.error('不能原邮箱一样')
                    return
                }
                const result = await this.$http.fetch(accountApi.sendEmailCodeByBind({
                    email: this.formData.email
                }))
                if (result) {
                    this.$message.success('发送邮箱验证码成功，请注意查收')
                    this.setting.email_code = true
                    this.timer.email = setInterval(() => {
                        this.timer.email_count--
                        if (this.timer.email_count === 0) {
                            this.resetTimerEmail()
                        }
                    }, 1000)
                }
            },
            async onBindEmail () {
                if (!this.formData.email_verify_code) {
                    this.$message.error('邮箱验证码必填')
                    return false
                }
                if (this.formData.email_verify_code.length !== 6) {
                    this.$message.error('邮箱验证码必须为6位')
                    return false
                }
                const result = await this.$http.fetch(accountApi.bindEmail({
                    email: this.formData.email,
                    verify_code: this.formData.email_verify_code
                }))
                if (result) {
                    this.$message.success('绑定邮箱成功')
                    this.setting.email = false
                    this.resetTimerEmail()
                    await this.getUserInfo()
                }
            },

            /**
             * 编辑/取消 手机号
             */
            onEditMobile (type) {
                this.setting.mobile = type
                this.resetTimerMobile()
            },
            onSendMobileCode () {
                if (this.setting.mobile_code === true) {
                    return
                }
                if (!this.formData.mobile) {
                    this.$message.error('请输入手机号')
                    return
                }
                if (this.formData.mobile === this.apiData.mobile) {
                    this.$message.error('不能原手机号一样')
                    return
                }
                this.setting.mobile_code = true
                this.timer.mobile = setInterval(() => {
                    this.timer.mobile_count--
                    if (this.timer.mobile_count === 0) {
                        this.resetTimerMobile()
                    }
                }, 1000)
            },
            async onBindMobile () {
                if (!this.formData.mobile_verify_code) {
                    this.$message.error('手机验证码必填')
                    return false
                }
                if (this.formData.mobile_verify_code.length !== 6) {
                    this.$message.error('手机验证码必须为6位')
                    return false
                }
                const result = await this.$http.fetch(accountApi.bindMobile({
                    mobile: this.formData.mobile,
                    verify_code: this.formData.mobile_verify_code
                }))
                if (result) {
                    this.$message.success('绑定手机成功')
                    this.setting.mobile = false
                    this.resetTimerEmail()
                    await this.getProfileInfo()
                }
            }
        }
    }
</script>
