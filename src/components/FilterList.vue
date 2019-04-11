<template>
    <div class="filter-list">
        <ul class="filters">
            <li class="filter-item"
                v-for="(effect, index) in effects" 
                :ref="effects[index].id" 
                :key="index" 
                :class="{selected: effects[index].id === selectedEffect.id}"
                @click="updateSelectedEffect(effects[index])"
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
        selectedEffect: {
            required: true
        },
        selectedItem: {
            required: true
        }
    },
    data() {
        return {
            effects: [
                { "id": "none"},
                { "id": "bloom"},
                { "id": "monochrome"},
                { "id": "oldmovie" },
                { "id": "sketchpencilstroke" },
                { "id": "invertcolor" },
                { "id": "magnifysmooth" },
                { "id": "cool" },
                { "id": "warm" },
                { "id": "sincity" },
                { "id": "median3x3" },
                { "id": "median5x5" },
                { "id": "lut" } 
            ]
        }
    },
    methods: {
        getFilterImage(effectName) {
            return require(`../assets/${effectName}.png`);
        },
        updateSelectedEffect(effect) {
            this.$emit('changeSelectedEffect', effect);
        }
    },
    watch: {
        selectedEffect(value) {
            this.$refs[this.selectedEffect.id][0].scrollIntoViewIfNeeded();
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
