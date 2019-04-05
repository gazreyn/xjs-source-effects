<template>
    <div class="filter-list">
        <ul class="filters">
            <li class="filter-item"
                v-for="(effect, index) in effects" 
                :ref="index"
                :key="index" 
                @click="selectedEffect = index"
                :class="{selected: index === selectedEffect}"
            >
                <img :src="getFilterImage(effect.id)" />
                {{effect.id}}
            </li>
        </ul>
    </div>
</template>

<script>
import xjs from 'xjs-framework/dist/xjs-es2015'
export default {
    props: {
        selectedItemProp: {
            type: String,
            required: true
        },
        selectedEffectProp: {
            type: Number,
            default: 0,
        },
        lutResourceProp: String
    },
    data() {
        return {
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
            ],
            selectedEffect: this.selectedEffectProp,
            lutResource: this.lutResourceProp,
        }
    },
    computed: {
        selectedEffectName() {
            return this.effects[this.selectedEffect].id;
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
                effect.name = 'none';
                return effect; 
            }

            effect.name = effectXML.getElementsByTagName('effect')[0].getAttribute('id'); // This is the xml name of the effect
            if(effect.name === 'lut') { 
                effect.resource = effectXML.getElementsByTagName('resource')[0].getAttribute('file'); 
            }
            return effect;
        },
        getFilterImage(effectName) {
            return require(`../assets/${effectName}.png`);
        },
        updateItemEffect() {
            if(this.selectedItemProp === 'none') return; //No item selected
            this.setItemEffect(this.selectedEffectName);
        },
        setItemEffect(effectName) {
            let xml = '';
            if(effectName === 'lut') {
                xml = `<effects><effect id="${effectName}" cfg="0,1,0,0,0"><resource file="${this.lutResourceProp}" /></effect></effects>`;
            } else if(effectName === 'none') {
                xml = `<effects></effects>`;
            } else {
                xml = `<effects><effect id="${effectName}" cfg="0,0.2,0,0,0" /></effects>`
            }
            
            //TODO: Need to add some logic here to not actually set the effect is resource is empty

            xjs.exec('AttachVideoItem', this.selectedItemProp, '0');
            xjs.exec('SetLocalProperty', 'prop:effects', xml);
            this.$emit('updateEffect', effectName);
        },
        async setDefaultEffectForItem(itemid) {
            const effect = await this.getCurrentEffect(itemid);
            const effectIndex = this.effects.findIndex(x => x.id === effect.name);
            this.selectedEffect = effectIndex;
            if(effect.resource !== undefined) {
                this.lutResource = effect.resource;
            }

            this.$refs[effectIndex][0].scrollIntoView();
        }
    },
    watch: {
        selectedEffect() {
            this.updateItemEffect();
        },
        selectedItemProp(itemid) {
            if(this.selectedItemProp === 'none') return; //If the item selected is none, do nothing
            this.setDefaultEffectForItem(itemid);
        },
        lutResource(resource) {
            this.$emit('updateLutResource', resource);
        }
    }
}
</script>

<style lang="scss">
.filter-list {
    width: 105px;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #212121;
    flex-shrink: 0;
    ul {
        &.filters {
            list-style-type: none;
            margin: 0;
            padding: 0;
        }
    }
    li {
       &.filter-item {
        padding: 3px;
        background-color: #212121;
        border: 1px solid #323232;
        text-transform: capitalize;
           &.selected {
               border: 1px solid #fff;
           }
       } 
    }
}
.disabled .filter-list { 
    filter: saturate(0);
}
</style>
