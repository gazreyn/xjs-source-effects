<template>
  <div id="app">
    <SourceSelection :selectedItemProp="selectedItem" @setItemEffect="updateItemEffect" />
  </div>
</template>

<script>
import xjs from 'xjs-framework/dist/xjs-es2015'
import SourceSelection from '@/components/SourceSelection.vue'

export default {
    components: {
        SourceSelection
    },  
    name: 'app',
    data() {
        return {
            selectedItem: 'none',
            selectedEffect: 0,
            effects: [
                { "id": "none"},
                { "id": "bloom", "cfg": [0,1,0,0,0] },
                { "id": "monochrome", "cfg": [0,1,0,0,0] },
                { "id": "oldmovie", "cfg": [0,1,0,0,0] },
                { "id": "sketchpencilstroke", "cfg": [0,1,0,0,0] },
                { "id": "invertcolor", "cfg": [0,1,0,0,0] },
                { "id": "magnifysmooth", "cfg": [0,1,0,0,0] },
                { "id": "cool", "cfg": [0,1,0,0,0] },
                { "id": "warm", "cfg": [0,1,0,0,0] },
                { "id": "sincity", "cfg": [0,1,0,0,0] },
                { "id": "median3x3", "cfg": [0,1,0,0,0] },
                { "id": "median5x5", "cfg": [0,1,0,0,0] },
                { "id": "lut", "cfg": [0,1,0,0,0]} 
            ]
        }
    },
    computed: {
        selectedEffectName() {
            return this.effects[this.selectedEffect].id;
        }
    },
    methods: {
        async updateItemEffect(itemid, effect) { //effect.id + effect.resource
            this.selectedItem = itemid;
            // TODO: Set the item effect here            
            console.log(itemid, effect);
        },
        async applyItemEffect() {
            
        }
    },
    watch: {
        selectedEffect(index) {
            // selectedEffectName = lut and there's no lut resource, do nothing
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

}
</style>
