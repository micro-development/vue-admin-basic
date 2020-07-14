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
                :rules="formRule"
                size="medium"
                ref="formData">
                <el-form-item label='名称' prop="app_name" required>
                    <el-input
                        placeholder="应用名称"
                        v-model="formData.app_name"></el-input>
                </el-form-item>
                <el-form-item label='简介' prop="app_description" required>
                    <el-input
                        :rows="3"
                        type="textarea"
                        placeholder="应用简介"
                        v-model="formData.app_description"></el-input>
                </el-form-item>
                <el-form-item label='首页' prop="app_home_url">
                    <el-input
                        placeholder="首页地址"
                        v-model="formData.app_home_url"></el-input>
                </el-form-item>
                <el-form-item label='应用LOGO' prop="app_logo_url">
                    <el-input
                        placeholder="logo地址"
                        v-model="formData.app_logo_url"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </component-container>
</template>

<script>
    import * as api from '../../service/platform'
    export default {
        name: 'account-platform-form-edit',
        data () {
            return {
                formData: {
                    app_name: '',
                    app_description: '',
                    app_home_url: '',
                    app_logo_url: ''
                },
                formRule: {
                    app_name: [
                        {
                            required: true,
                            message: '应用名称必填'
                        }
                    ],
                    app_description: [
                        {
                            required: true,
                            message: '应用描述必填'
                        }
                    ]
                }
            }
        },
        props: {
            detail: {
                default: null
            }
        },
        computed: {},
        created () {
            this.init()
        },
        mounted () {
            // this.init()
        },
        methods: {
            async init () {
                this.$log.echo(this.detail, '应用管理 form-edit.vue this.detail', 'log')
                await this.getDetail()
            },
            async getDetail () {
                if (this.detail) {
                    const result = await this.$http.fetch(api.detail({
                        uuid: this.detail.uuid
                    }))
                    if (result) {
                        Object.keys(this.formData).forEach((field) => {
                            this.formData[field] = result.detail[field]
                        })
                    }
                }
            },
            /**
             * 提交
             */
            async onSubmit () {
                this.$log.echo(this.formData, 'platform/form-edit.vue onSave this.formData', 'log')
                if (this.detail) {
                    this.onUpdateApi()
                } else {
                    this.onSaveApi()
                }
            },
            /**
             * 保存
             * @returns {Promise<void>}
             */
            async onSaveApi () {
                const result = await this.$http.fetch(api.add(this.formData))
                this.$log.echo(result, 'onSaveApi result', 'log')
                if (result) {
                    this.$message.success('申请应用成功')
                }
            },
            /**
             * 修改
             * @returns {Promise<void>}
             */
            async onUpdateApi () {
                const result = await this.$http.fetch(api.update({
                    ...this.formData,
                    uuid: this.detail.uuid
                }))
                this.$log.echo(result, 'onUpdateApi result', 'log')
                if (result) {
                    this.$message.success('修改应用成功')
                }
            }
        }
    }
</script>
