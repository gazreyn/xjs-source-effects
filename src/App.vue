<template>
    <div id="app">
        <SourceSelection :selectedItemProp="selectedItem" @updateSelectedItem="setSelectedItem" />
        <div class="section">
            <div class="controls" :class="{disabled: selectedItem === 'none'}">
                <FilterList 
                    ref="filterList" 
                    :selectedItemProp="selectedItem" 
                    :lutResourceProp="lutResource"
                     @updateEffect="setEffect"
                     @updateLutResource="setLutResource"
                />
                <FilterOptions  :effectNameProp="selectedEffectName" :lutResourceProp="lutResource" @updateLutResource="setLutResource" />
            </div>
        </div>
    </div>
</template>

<script>
import xjs from 'xjs-framework/dist/xjs-es2015'
import FilterList from '@/components/FilterList.vue'
import FilterOptions from '@/components/FilterOptions.vue'
import SourceSelection from '@/components/SourceSelection.vue'

export default {
    components: {
        FilterList,
        FilterOptions,        
        SourceSelection, 
    },  
    name: 'app',
    data() {
        return {
            selectedItem: 'none',
            lutResource: '',
            selectedEffectName: ''
        }
    },
    methods: {
        setSelectedItem(itemid) {
            this.lutResource = ''; //Clear LUT Resource
            this.selectedItem = itemid;
        },
        setEffect(effectName) {
            this.selectedEffectName = effectName;
        },
        setLutResource(resource) {
            this.lutResource = resource;
        }
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
    .controls {
        border: 1px solid #000;
        display: flex;
        height: 388px;
        position: relative;
        &.disabled {
            pointer-events: none;
        }
        &.disabled::after {
            content: 'Choose a Source';
            font-size: 16px;
            display: flex; align-items: center; justify-content: center;
            position: absolute;
            width: 100%; height: 100%;
            background-color: rgba(0,0,0,0.5);
        }
    }
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
