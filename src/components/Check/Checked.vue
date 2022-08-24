<template>
    <div>
        <el-form label-position="left">
            <el-form-item label="X坐标">
                <el-input-number v-model="attrs_style.block.left">
                </el-input-number>
            </el-form-item>
            <el-form-item label="Y坐标">
                <el-input-number v-model="attrs_style.block.top">
                </el-input-number>
            </el-form-item>
            <el-form-item label="宽度">
                <el-input-number v-model="attrs_style.attribute.width">
                </el-input-number>
            </el-form-item>
            <el-form-item label="高度">
                <el-input-number v-model="attrs_style.attribute.height">
                </el-input-number>
            </el-form-item>
        </el-form>
        <el-form label-position="left" v-if="attrs_style.block.key === 'text' || attrs_style.block.key === 'button' || attrs_style.block.key === 'a' ||
        attrs_style.block.key === 'input'">
            <el-form-item label="颜色">
                <el-color-picker v-model="attrs_style.attribute.color" style="touch-action:none"></el-color-picker>
            </el-form-item>
            <el-form-item label="背景颜色">
                <el-color-picker v-model="attrs_style.attribute.background" style="touch-action:none"></el-color-picker>
            </el-form-item>
            <el-form-item label="内容">
                <el-input type="textarea" v-model="attrs_style.attribute.innerHTML"></el-input>
            </el-form-item>
        </el-form>
        <el-form label-position="left" v-if="attrs_style.block.key === 'a'">
            <el-form-item label="链接">
                <el-input v-model="attrs_style.attribute.href"></el-input>
            </el-form-item>
        </el-form>
        <!-- <el-form label-position="left" v-if="attrs_style.block.key === 'img'">
            <el-form-item label="文件">
                <input type="file" @change="changeImg($event)" accept="image/*">
                <img class="imgs" alt="">
            </el-form-item>
        </el-form> -->

    </div>
</template>

<script>
import { computed } from "vue";
import { ElColorPicker, ElForm, ElFormItem, ElInput, ElInputNumber } from "element-plus";


export default {
    components: {
        ElColorPicker, ElForm, ElFormItem, ElInput, ElInputNumber
    },
    props: {
        modelValue: { type: Object }
    },
    setup(props) {
        const attrs_style = computed({
            get() {
                return props.modelValue
            }
        })
        console.log(attrs_style);

        return {
            attrs_style,
        }
    }
}
</script>

<style>
el-input-number {
    width: 200px;
    margin: 0 auto;
}
</style>