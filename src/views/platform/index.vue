<template>
    <component-container
        @onAdd="onAdd"
        @onDelete="onDelete"
        @onUpdate="onUpdate"
        @onSecret="onSecret"
        :add-search="addSearch"
        :list-table="listTable"
        :hide-config="hideConfig"
        ref="component-container">
        <form-edit
            @onSaveFinished="init"
            :detail="detail"
            slot="dialog"
            ref="formEdit"></form-edit>
        <select-secret
                :detail="detail"
                slot="dialog"
                ref="selectSecret"></select-secret>
    </component-container>
</template>

<script>
    import * as platformApi from '../../service/platform'
    import FormEdit from './form-edit'
    import SelectSecret from './select-secret'

    export default {
        name: 'account-platform-index',
        components: {
            FormEdit,
            SelectSecret
        },
        data () {
            return {
                detail: null,
                addSearch: {
                    leftAfterText: '应用'
                },
                hideConfig: {
                    catalog: true
                },
                listTable: {
                    dataList: [],
                    fieldList: [
                        {
                            label: '应用名称',
                            prop: 'app_name'
                        },
                        {
                            label: '应用描述',
                            prop: 'app_description'
                        },
                        {
                            label: '应用状态',
                            prop: 'useStatus',
                            formatter: ({ dataItem }) => {
                                const formatList = {
                                    1: '待审核',
                                    2: '未使用',
                                    3: '已使用'
                                }
                                return formatList[dataItem.useStatus] || '未知错误'
                            }
                        },
                        {
                            label: '创建时间',
                            prop: 'create_time'
                        }
                    ],
                    btnList: [
                        {
                            name: '修改',
                            method: 'onUpdate',
                            condition () {
                                return true
                            }
                        },
                        {
                            name: '秘钥',
                            method: 'onSecret',
                            condition () {
                                return true
                            }
                        },
                        {
                            name: '删除',
                            method: 'onDelete',
                            condition () {
                                return true
                            }
                        }
                    ]
                }
            }
        },
        created () {
            this.init()
        },
        mounted () {
            // this.onSecret({})
        },
        methods: {
            async init () {
                await this.getList()
            },
            /**
             * 获取应用列表
             */
            async getList () {
                const { list } = await this.$http.fetch(platformApi.list({}))
                if (list) {
                    this.listTable.dataList = list || []
                }
            },
            /**
             * 添加应用
             */
            async onAdd () {
                this.detail = null
                this.$refs.formEdit.onOpenDialog()
            },
            /**
             * 删除应用
             */
            async onDelete ({ dataItem }) {
                this.$confirm('确定删除应用么？', '删除应用', {
                    type: 'warning'
                }).then(async () => {
                    const data = await this.$http.fetch(platformApi.remove({
                        uuid: dataItem.uuid
                    }))
                    if (data) {
                        this.$message.success('删除成功')
                        this.init()
                    }
                })
            },
            /**
             * 查看秘钥
             */
            onSecret ({ dataItem }) {
                this.detail = dataItem
                this.$refs.selectSecret.onOpenDialog()
            },
            /**
             * 修改应用
             * @param dataItem 数据详情
             * @returns {Promise<void>}
             */
            async onUpdate ({ dataItem }) {
                this.detail = dataItem
                this.$refs.formEdit.onOpenDialog()
            }
        }
    }
</script>

<style lang="less" scoped>

</style>
