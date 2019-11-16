<template>
    <div class="section item-selection">
        <div class="field">
            <label>Source: </label>
            <select v-model="selectedItem">
                <option value="none">None</option>
                <option v-for="item in items" :key="item._id" :value="item._id">{{item._name}}</option>
            </select>
        </div>
    </div>
</template>

<script>
import xjs from 'xjs-framework/dist/xjs-es2015'
export default {
    props: {
        selectedItemProp: {
            required: true
        }
    },
    data() {
        return {
            items: [],
            selectedItem: this.selectedItemProp
        }
    },
    watch: {
        selectedItem(itemid) {
            this.$emit('updateSelectedItem', itemid); //When the user changes the camera from the dropdown, let the parent know
        }
    },
    methods: {
        async getItems() {
            this.selectedItem = 'none';
            const activeScene = await xjs.Scene.getActiveScene();
            const items = await activeScene.getItems();
            this.items = items;
        },
    },
    mounted() {
        xjs.ready().then(() => {
            this.getItems();
        });
    }
}
</script>

<style lang="scss" scoped>
label {
    min-width: 50px;
}
select {
    appearance: none;
    background-color: #393939;
    border: 1px solid #000000;
    color: #fff;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 11px;
    padding: 2px;
    flex: 1;
    // width: 100%;
}
.field {
    display: flex;
    align-items: center
}
</style>
