<template>
    <div id="app">
        <SourceSelection :selectedItemProp="selectedItem" @updateSelectedItem="setSelectedItem" />
        <div class="section">
            <FilterSelection :selectedItem="selectedItem" />
        </div>
    </div>
</template>

<script>
import xjs from 'xjs-framework/dist/xjs-es2015'
import FilterSelection from '@/components/FilterSelection.vue'
import SourceSelection from '@/components/SourceSelection.vue'

export default {
    components: {
        FilterSelection,        
        SourceSelection, 
    },  
    name: 'app',
    data() {
        return {
            selectedItem: 'none',
        }
    },
    methods: {
        setSelectedItem(itemid) {
            this.lutResource = ''; //Clear LUT Resource
            this.selectedItem = itemid;
        },
        prepareExtensionWindow() {
            xjs.ExtensionWindow.resize(354, 465);
            xjs.ExtensionWindow.setTitle("Source Filters");
            xjs.ExtensionWindow.setBorder(1);
        },
    },
    created() {
        xjs.ready().then(() => {
            this.prepareExtensionWindow();
        });
    }
}
</script>

<style lang="scss">
html, body {
    margin: 0;
    padding: 0;
    background-color: #313131;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 11px;
    // width: 354px; height: 465px;
    overflow: hidden;
    color: #D9D9D9;
}
.section {
    border: 1px solid #5A5A5A;
    padding: 8px;
    margin: 5px;
}

::-webkit-scrollbar-track {
    background: #000;
    /* box-shadow: inset 0 0 5px grey;  */
}

::-webkit-scrollbar-thumb {
    background: #5A5A5A;
}

::-webkit-scrollbar-thumb:hover {
    background: rgb(68, 68, 68);
}

::-webkit-scrollbar {
    width: 3px;
}
</style>
