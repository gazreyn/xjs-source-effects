<template>
    <div class="controls" :class="{disabled: selectedItem === 'none'}">
        <FilterList :selectedEffect="selectedEffect" :selectedItem="selectedItem" @changeSelectedEffect="updateSelectedEffect" />
        <FilterOptions :selectedEffect="selectedEffect" @changeLutResource="updateLutResource" />
    </div>
</template>

<script>
import FilterList from '@/components/FilterList.vue'
import FilterOptions from '@/components/FilterOptions.vue'
import xjs from 'xjs-framework/dist/xjs-es2015'

export default {
    components: {
        FilterList, FilterOptions
    },
    props: {
        selectedItem: {
            required: true
        }
    },
    data() {
        return {
            selectedEffect: {"id": "none"},
        }
    },
    methods: {
        async getCurrentEffect(itemid) {
            xjs.exec('AttachVideoItem', itemid, '0');
            const rawEffectXML = await xjs.exec('GetLocalProperty', 'prop:effects');
            const xmlParser = new DOMParser();
            const effectXML = xmlParser.parseFromString(rawEffectXML, 'text/xml');

            const effect = {};

            if(effectXML.getElementsByTagName('effect')[0] === undefined) { //If no xml node effect, set the name to none
                effect.id = 'none';
                return effect; 
            }

            effect.id = effectXML.getElementsByTagName('effect')[0].getAttribute('id'); // This is the xml name of the effect
            if(effect.id === 'lut') { 
                effect.resource = effectXML.getElementsByTagName('resource')[0].getAttribute('file'); 
            }
            return effect;
        },
        updateSelectedEffect(effect) {
            this.selectedEffect = effect;
            this.applyEffectToItem(this.selectedItem, effect);
        },
        applyEffectToItem(itemid, effect) {
            if(itemid === 'none') return; //No item selected
            this.setItemEffect(itemid, effect);
        },
        setItemEffect(itemid, effect) {
            let xml = '';
            if(effect.id === 'lut') {
                if(effect.resource === undefined || effect.resource === '') return; //If no resource exists, we won't do anything
                xml = `<effects><effect id="${effect.id}" cfg="0,1,0,0,0"><resource file="${effect.resource}" /></effect></effects>`;
            } else if(effect.id === 'none') {
                xml = `<effects></effects>`;
            } else {
                xml = `<effects><effect id="${effect.id}" cfg="0,1,0,0,0" /></effects>`
            }
            
            xjs.exec('AttachVideoItem', itemid, '0');
            xjs.exec('SetLocalProperty', 'prop:effects', xml);
        },
        updateLutResource(file) {
            this.updateSelectedEffect({'id': 'lut', 'resource': file})
        }
    },
    watch: {
        async selectedItem(itemid) {
            this.selectedEffect = await this.getCurrentEffect(itemid);
        }
    } 
}
</script>

<style lang="scss">
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
</style>
