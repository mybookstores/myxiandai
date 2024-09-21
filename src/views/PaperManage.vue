<template>
    <div>
        <div style="margin: 10px 0">
            <el-input style="width: 200px" placeholder="请输入题目" suffix-icon="el-icon-search" v-model="title"></el-input>
            <el-button class="ml-5" type="primary" @click="load" style="background-color: #26aefc;border: #26aefc;" >搜索</el-button>
            <el-button type="warning" @click="reset"  style="background-color: #725ae9;border: #725ae9;">重置</el-button>
        </div>
        <div style="margin: 10px 0">
            <el-button type="primary" @click="handleAdd"  style="background-color: #d11579;border: #d11579;"  v-if="user.role === 'ROLE_ADMIN'">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
            <el-popconfirm
                    class="ml-5"
                    confirm-button-text='确定'
                    cancel-button-text='我再想想'
                    icon="el-icon-info"
                    icon-color="red"
                    title="您确定批量删除这些数据吗？"
                    @confirm="delBatch"
            >
                <el-button type="danger" slot="reference"  style="background-color: #ffa600;border: #ffa600;" >批量删除 <i class="el-icon-remove-outline"></i></el-button>
            </el-popconfirm>

        </div>
        <el-table :data="tableData" border stripe :header-cell-class-name="'headerBg'"
                  @selection-change="handleSelectionChange">
            <el-table-column type="selection" ></el-table-column>
            <el-table-column prop="id" label="ID" ></el-table-column>
            <el-table-column prop="userId" label="创建者ID" ></el-table-column>
            <el-table-column prop="title" label="问卷标题"></el-table-column>
            <el-table-column prop="description" label="问卷描述"></el-table-column>
            <!-- <el-table-column prop="startTime" label="开始时间"></el-table-column>
            <el-table-column prop="endTime" label="截止时间"></el-table-column> -->
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column label="操作" width="280" align="center">
                <template slot-scope="scope">
                    <el-button type="success" @click="handleEdit(scope.row)"  style="background-color: #725ae9;border: #725ae9;"  v-if="user.role === 'ROLE_ADMIN'">编辑 <i class="el-icon-edit"></i></el-button>
                    <el-popconfirm
                            class="ml-5"
                            confirm-button-text='确定'
                            cancel-button-text='我再想想'
                            icon="el-icon-info"
                            icon-color="red"
                            title="您确定删除吗？"
                            @confirm="del(scope.row.id)"
                    >
                        <el-button type="danger" slot="reference"  style="background-color: #b692db;border: #b692db;" v-if="user.role === 'ROLE_ADMIN'">删除 <i class="el-icon-remove-outline"></i></el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <div style="padding: 10px 0">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-sizes="[2, 5, 10, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>

        <el-dialog title="问卷信息" :visible.sync="dialogFormVisible" width="30%" style="margin-left: 100px;margin-top: 30px;" >
            <el-form label-width="100px" size="small">
                <el-form-item label="问卷创建者">
                    <el-input v-model="form.userId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="问卷描述">
                    <el-input v-model="form.description" autocomplete="off"></el-input>

                </el-form-item>
                <el-form-item label="问卷开始时间">
                    <el-input v-model="form.startTime" autocomplete="off"></el-input>

                </el-form-item>
                <el-form-item label="问卷截止时间">
                    <el-input v-model="form.endTime" autocomplete="off"></el-input>

                </el-form-item>
                <el-form-item label="问卷状态">
                    <el-input v-model="form.status" autocomplete="off"></el-input>
                </el-form-item>

                <el-table-column label="问卷状态">
                    <template slot-scope="scope">
                        <el-tag >START</el-tag>
                        <el-tag >INIT</el-tag>
                        <el-tag >STOP</el-tag>
                    </template>
                </el-table-column>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save"  style="background-color: #26aefc;border: #26aefc;">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>

    import axios from "axios";
    export default {
        name: "e",
        data() {
            return {
                teachers: [],
                title:'',
                form: {},
                tableData: [],
                username:'',
                multipleSelection: [],
                pageNum: 1,
                pageSize: 10,
                total: 0,
                dialogFormVisible: false,
                teachers: [],
                user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
                content: '',
                viewDialogVis: false
            }
        },
        created() {
            this.load()
        },
        methods: {
            view(content) {
                this.content = content
                this.viewDialogVis = true
            },
            // 绑定@imgAdd event
            imgAdd(pos, $file) {
                let $vm = this.$refs.md
                // 第一步.将图片上传到服务器.
                const formData = new FormData();
                formData.append('file', $file);
                axios({
                    url: 'http://localhost:9090/file/upload',
                    method: 'post',
                    data: formData,
                    headers: {'Content-Type': 'multipart/form-data'},
                }).then((res) => {
                    // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
                    $vm.$img2Url(pos, res.data);
                })
            },
            load() {
                this.request.get("/paperManage/page", {
                    params: {
                        pageNum: this.pageNum,
                        pageSize: this.pageSize,
                        title: this.title,
                    }
                }).then(res => {

                    this.tableData = res.data.records
                    this.total = res.data.total

                })

            },
            changeEnable(row) {
                this.request.post("/paperManage/update", row).then(res => {
                    if (res.code == '200') {
                        this.$message.success("操作成功")
                    }
                })
            },
            handleAdd() {
                this.dialogFormVisible = true
                this.form = {}
            },
            handleEdit(row) {
                this.form = JSON.parse(JSON.stringify(row))
                this.dialogFormVisible = true
            },
            del(id) {
                this.request.delete("/paperManage/" + id).then(res => {
                    if (res.code == '200') {
                        this.$message.success("删除成功")
                        this.load()
                    } else {
                        this.$message.error("删除失败")
                    }
                })
            },
            handleSelectionChange(val) {
                console.log(val)
                this.multipleSelection = val
            },
            delBatch() {
                let ids = this.multipleSelection.map(v => v.id)  // [{}, {}, {}] => [1,2,3]
                this.request.post("/paperManage/deleteBatch", ids).then(res => {
                    if (res.code == '200') {
                        this.$message.success("批量删除成功")
                        this.load()
                    } else {
                        this.$message.error("批量删除失败")
                    }
                })
            },
            save() {
                this.request.post("/paperManage", this.form).then(res => {
                    if (res.code == '200') {
                        this.$message.success("保存成功")
                        this.dialogFormVisible = false
                        this.load()
                    } else {
                        this.$message.error("保存失败")
                    }
                })
            },
            reset() {
                this.title = ""
                this.load()
            },
            handleSizeChange(pageSize) {
                console.log(pageSize)
                this.pageSize = pageSize
                this.load()
            },
            handleCurrentChange(pageNum) {
                console.log(pageNum)
                this.pageNum = pageNum
                this.load()
            },
            download(url) {
                window.open(url)
            },
        }
    }
</script>

<style scoped>

</style>
