<template>
    <div class="filter-options">
        <div class="options" v-if="effectNameProp === 'lut'">
            <div class="field-group">
                <label>LUT file: </label>
                <div class="control-group">
                    <input :value="lutResourceProp" type="text" />
                    <button @click="openFileDialog">Browse</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import xjs from 'xjs-framework/dist/xjs-es2015'

export default {
    props: {
        effectNameProp: {
            type: String,
            required: true
        },
        lutResourceProp: {
            required: true
        }
    },
    methods: {
        openFileDialog() {
            xjs.IO.openFileDialog({'fileMustExist': true},{name: 'LUT Files', extensions: ['png']})
            .then((string) => {
                this.$emit('updateLutResource', string[0]);
            });
        },
    }
}
</script>

<style lang="scss">
.filter-options {
    padding: 5px 7px;
    width: 100%;
    &.control-group {
        display: flex;
        width: 100%;
        button {
            background-color: #000;
            border: 1px solid #555555;
            color: #CECECE;
            font-size: 12px;
            margin-left: 4px;
        }
        input[type=text] {
            background-color: #393939;
            border: 1px solid #000000;
            color: #fff;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 11px;
            padding: 2px;
            flex: 1;
        }
    }
    
}
</style>
