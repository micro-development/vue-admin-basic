<style lang="less">
    .account-profile{
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
        <div class="account-profile" slot="content">
            <el-form
                label-width="100px"
                class="account-form"
                :model="formData"
                size="medium"
                ref="formData">
                <el-form-item label='性别'>
                    <el-radio-group v-model="formData.sex">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="2">女</el-radio>
                        <el-radio :label="3">保密</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label='网站'>
                    <el-input
                        placeholder="网站：http/https 开头"
                        v-model="formData.website"></el-input>
                </el-form-item>
                <el-form-item label='简介'>
                    <el-input
                        :rows="3"
                        type="textarea"
                        placeholder="个人简介"
                        v-model="formData.profile"></el-input>
                </el-form-item>
                <el-form-item label='地址'>
                    <el-input
                        placeholder="个人地址"
                        v-model="formData.address"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSaveProfile">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </component-container>
</template>

<script>
    import * as accountApi from '../../service/account'
    export default {
        name: 'account-profile',
        data () {
            return {
                formData: {
                    website: '',
                    sex: 3,
                    address: '',
                    profile: ''
                },
                formRule: {}
            }
        },
        computed: {},
        mounted () {
            this.init()
        },
        methods: {
            async init () {
                await this.getProfileInfo()
            },
            async getProfileInfo () {
                const result = await this.$http.fetch(accountApi.getProfile())
                this.$log.echo(result, 'getProfileInfo req', 'log')
                if (result) {
                    if (result.detail) {
                        Object.keys(this.formData).forEach((key) => {
                            if (result.detail[key]) {
                                this.formData[key] = result.detail[key]
                            }
                        })
                    }
                }
            },
            /**
             * 保存简介信息
             */
            async onSaveProfile () {
                this.$log.echo(this.formData, 'detail/index.vue onSaveProfile this.formData', 'log')
                const result = await this.$http.fetch(accountApi.setProfile(this.formData))
                this.$log.echo(result, 'onSaveProfile result', 'log')
                if (result) {
                    this.$message.success('设置资料成功')
                    this.getProfileInfo()
                }
            }
        }
    }
</script>
