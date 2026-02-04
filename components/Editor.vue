<template>
    <div>
        <!-- Use the component in the right place of the template -->
        <tiptap-vuetify style="text-align: left;" id="text_editor_1" :value="value" :extensions="extensions1" @input="$emit('input', arguments[0])"/>
        <tiptap-vuetify style="text-align: left;" id="text_editor_2" :value="value" :extensions="extensions2" @input="$emit('input', arguments[0])"/>
    </div>
</template>

<script>
// Imported single file components
import {
    TiptapVuetify,
    Bold,
    Italic,
    Strike,
    Underline,
    BulletList,
    ListItem,
    Link,
    History
} from "tiptap-vuetify";
//---------------------------------------

export default {
    // Registered components
    components: {
        TiptapVuetify
    },
    //-----------------------------

    // Registered props
    props: {
        value: {
            type: String,

            default: `<h1>Yay Headlines!</h1> <p>All these <strong>cool tags</strong> are working now.</p>`
        }
    },
    //-----------------------------

    // Data property
    data: () => ({
        // Possible tiptap extensions
        extensions1: [
            Bold,
            Italic,
            Underline,
            ListItem,
            BulletList,
            Strike,
            Link,
            History
        ],

        extensions2: [
            Bold,
            Italic,
            Underline,
            ListItem,
            BulletList,
            Strike,
            Link
        ]
        //----------------------------------
    })
    //-----------------------------
};
</script>

<style scoped>
    .ProseMirror p {
        text-align: left;
        margin: 0px !important;
    }

    .ProseMirror {
        margin-left: 5px !important;
        margin-right: 5px !important;
    }

    #text_editor_1 {
        display: block;
    }

    #text_editor_2 {
        display: none;
    }

    @media only screen and (max-width: 462px){
        #text_editor_1 {
            display: none;
        }

        #text_editor_2 {
            display: block;
        }
    }
</style>