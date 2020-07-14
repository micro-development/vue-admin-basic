<style lang="less">
</style>
<template>
   <it-dialog-container
           :native="native"
           ref="itDialogContainer">
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
       </el-form>
       <it-dialog-footer
               @onSubmit="onSubmit"
               @onCancel="onCancel"
               :btn-list="btnList"
               slot="it-dialog-footer"></it-dialog-footer>
   </it-dialog-container>
</template>

<script>
    import * as api from '../../service/platform'
    const modelData = () => {
        return {
            app_name: '',
            app_description: '',
            app_home_url: '',
            app_logo_url: ''
        }
    }
    export default {
        name: 'account-platform-form-edit',
        data () {
            return {
                native: {
                    title: '申请应用',
                    width: '800px'
                },
                btnList: [
                    {
                        name: '保存',
                        type: 'primary',
                        method: 'onSubmit'
                    },
                    {
                        name: '取消',
                        type: 'default',
                        method: 'onCancel'
                    }
                ],
                formData: modelData(),
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
            onCancel () {
                this.native.title = '申请应用'
                this.formData = modelData()
                this.$refs.itDialogContainer.hide()
            },
            onOpenDialog () {
                // this.$log.echo(this.detail, 'project/form-edit.vue onOpenDialog model', 'log')
                this.$refs.itDialogContainer.show()
                this.$nextTick(() => {
                    if (this.detail) {
                        this.native.title = '修改应用'
                        Object.keys(this.detail).forEach((key) => {
                            this.formData[key] = this.detail[key]
                        })
                    }
                })
            },
            async init () {
                this.$log.echo(this.detail, '应用管理 form-edit.vue this.detail', 'log')
            },
            /**
             * 提交
             */
            async onSubmit () {
                this.$log.echo(this.formData, 'platform/form-edit.vue onSave this.formData', 'log')
                this.$refs.formData.validate((valid) => {
                    if (valid) {
                        if (this.detail) {
                            this.onUpdateApi()
                        } else {
                            this.onSaveApi()
                        }
                    }
                })
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
                    this.$emit('onSaveFinished')
                    this.onCancel()
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
                    this.$emit('onSaveFinished')
                    this.onCancel()
                }
            }
        }
    }
</script>
