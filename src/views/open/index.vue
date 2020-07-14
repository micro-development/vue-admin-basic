<template>
    <component-container>
        <div class="account-open" slot="content">
            <h3>绑定第三方账号</h3>
            <el-divider></el-divider>
            <el-alert
                    class="isOpenList"
                    :closable="false"
                    title="已绑定的第三方平台"
                    description="使用以下任一方式都可以登录到您的码云帐号，避免由于某个帐号失效导致无法登录"
                    type="success">
            </el-alert>
            <it-list-table
                    @onUnbind="onUnbind"
                    :data-list="dataList"
                    :field-list="fieldList"
                    :btn-list="btnList"
                    class="open-list-data"
                    ref="itListTable"></it-list-table>
            <el-alert
                    class="noOpenList"
                    :closable="false"
                    title="您还可以绑定以下第三方账号"
                    description="绑定第三方账号可以方便快速登录哦😯"
                    type="info">
            </el-alert>
            <el-row class="open-list">
                <template v-for="(openItem, openIndex) in openLoginList">
                    <el-col class="open-item" v-if="!isExistList.includes(openItem.event)" :key="openIndex" :span="2">
                        <p class="open-img">
<!--                            <el-avatar @click="onOpenLogin(openItem)" :size="36" :src="getUrl(openItem.objectName)"></el-avatar>-->
                            <img @click="onOpenLogin(openItem)" :src="getUrl(openItem.objectName)" alt="">
                        </p>
                        <p class="open-text">
                            <el-link @click="onOpenLogin(openItem)" :underline="false">{{ openItem.name }}</el-link>
                        </p>
                    </el-col>
                </template>
            </el-row>
        </div>
    </component-container>
</template>

<script>
    import * as accountApi from '../../service/account'
    export default {
        name: 'account-open',
        data () {
            return {
                dataList: [],
                fieldList: [
                    {
                        prop: 'type',
                        label: '绑定账号信息',
                        formatter: ({ dataItem }) => {
                            const platform = {
                                1: '微信',
                                10: 'QQ'
                            }
                            return platform[dataItem.type] || '未知'
                        }
                    },
                    {
                        prop: 'view',
                        label: '详情',
                        htmlComponent: true,
                        formatter: ({ dataItem }) => {
                            if (dataItem.type === 1) {
                                return this.getWechatView(dataItem.extra)
                            }
                            if (dataItem.type === 10) {
                                return this.getWechatView(dataItem.extra)
                            }
                        }
                    },
                    {
                        prop: 'create_time',
                        label: '绑定时间'
                    },
                    {
                        prop: 'status',
                        label: '状态',
                        formatter: ({ dataItem }) => {
                            const platform = {
                                1: '使用中',
                                2: '已禁用中'
                            }
                            return platform[dataItem.status] || '未知'
                        }
                    }
                ],
                btnList: [
                    {
                        name: '解除绑定',
                        method: 'onUnbind',
                        condition () {
                            return true
                        }
                    }
                ],
                isExistList: [],
                openLoginList: [
                    {
                        event: 'wechat',
                        name: '微信',
                        objectName: 'project/it-admin/images/account-wechat.png'
                    },
                    {
                        event: 'qq',
                        name: 'QQ',
                        objectName: 'project/it-admin/images/account-tencent.png'
                    },
                    {
                        event: 'github',
                        name: 'Github',
                        objectName: 'project/it-admin/images/account-github.png'
                    }
                ]
            }
        },
        computed: {},
        created () {
            this.init()
        },
        methods: {
            test () {
                this.$aliOss.getFileUrl('getFileUrl')
            },
            /**
             * 列表格式化微信信息
             */
            getWechatView (extra) {
                if (extra) {
                    try {
                        const exInfo = JSON.parse(extra)
                        return `<el-link>${exInfo.nickname}</el-link>`
                    } catch (e) {
                        return 'error'
                    }
                }
                return 'Error'
            },
            /**
             * 列表格式化微信信息
             */
            getTencentView (extra) {
                if (extra) {
                    try {
                        const exInfo = JSON.parse(extra)
                        return `<el-link>${exInfo.nickname}</el-link>`
                    } catch (e) {
                        return 'error'
                    }
                }
                return 'Error'
            },
            /**
             * 初始化
             */
            async init () {
                await this.getList()
            },
            /**
             * 获取已绑定账号列表
             */
            async getList () {
                this.isExistList = []
                const data = await this.$http.fetch(accountApi.bindList())
                if (data) {
                    this.dataList = data.list
                    this.dataList.map((data) => {
                        if (data.type === 1) {
                            this.isExistList.push('wechat')
                        }
                        if (data.type === 10) {
                            this.isExistList.push('qq')
                        }
                    })
                }
            },
            /**
             * 获取资源签名URL
             */
            getUrl (objectName) {
                return this.$aliOss.getFileUrl(objectName)
            },
            /**
             * 解除绑定第三方账号
             * @param dataItem 当前绑定的平台信息
             */
            onUnbind ({ dataItem }) {
                this.$confirm('解绑后，将无法再使用该账号登录', '确认解绑', {
                    type: 'warning'
                }).then(() => {
                    if (dataItem.type === 1) {
                        this.onUnWechat()
                    }
                    if (dataItem.type === 10) {
                        this.onUnTencentConnect()
                    }
                }).catch()
            },
            // 解绑微信
            async onUnWechat () {
                const result = await this.$http.fetch(accountApi.unBindWechatConnect({}))
                if (result) {
                    this.init()
                    this.$message.success('解绑微信成功')
                }
            },
            // 解绑腾讯QQ
            async onUnTencentConnect () {
                const result = await this.$http.fetch(accountApi.unBindTencentConnect({}))
                if (result) {
                    this.init()
                    this.$message.success('解绑QQ成功')
                }
            },
            /**
             * 绑定第三方账号打开窗口
             * @param item 当前平台信息
             */
            onOpenLogin (item) {
                // this.$log.echo(item, 'onOpenLogin item', 'log')
                if (item.event === 'wechat') {
                    this.loginWechat()
                }
                if (item.event === 'qq') {
                    this.loginTencentConnect()
                }
            },
            // 打开微信登录
            async loginWechat () {
                const wechatWindow = window.open(`${process.env.VUE_APP_API_ROOT_PATH}/aiApi/wechat/connect/login`, '绑定微信')
                window.wechatCallback = async (data) => {
                    this.$log.echo(data, 'onOpenWechat window.wechatCallback data', 'log')
                    wechatWindow.close()
                    if (data.errmsg) {
                        this.$message.error(data.errmsg)
                    } else {
                        const result = await this.$http.fetch(accountApi.bindWechatConnect({
                            open_uuid: data.open_uuid
                        }))
                        if (result) {
                            this.init()
                            this.$message.success('绑定成功')
                        }
                    }
                }
            },
            // 打开QQ登录
            async loginTencentConnect () {
                const qqWindow = window.open(`${process.env.VUE_APP_API_ROOT_PATH}/aiApi/tencent/connect/login`, '绑定QQ')
                window.qqCallback = async (data) => {
                    this.$log.echo(data, 'loginTencentConnect window.qqCallback data', 'log')
                    qqWindow.close()
                    if (data.errmsg) {
                        this.$message.error(data.errmsg)
                    } else {
                        const result = await this.$http.fetch(accountApi.bindTencentConnect({
                            open_uuid: data.open_uuid
                        }))
                        if (result) {
                            this.init()
                            this.$message.success('绑定成功')
                        }
                    }
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .account-open{
        /*width: 100%;*/
        height: 100%;
    }
    .isOpenList {
        margin-bottom: 10px;
    }
    .noOpenList {
        margin-top: 26px;
    }
    .open-list {
        margin-top: 10px;
    }

    .open-item {
        text-align: center;
        cursor: pointer;
    }
    .open-list-data{
        height: calc(100% - 360px)
    }
</style>
