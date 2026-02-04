export default {
    methods: {
        check_if_text_editor_is_empty(data){
            let text_count = 0;
            var container = document.createElement('div');
            container.innerHTML = data;
            //then all nodes
            let elems = container.getElementsByTagName("*");
            let len = elems.length,
            elem,
            elemText,
            i,
            //unwanted html element tags
            unwanted = ["script", "images", "input"];
            //loop through the elements
            for(i = 0; i < len; i+=1){
                elem = elems[i];
                //pay attention here
                //if the element does not have children it means that it will only contain text
                if(unwanted.indexOf(elem.nodeName.toLowerCase())=="-1"){
                    if(!elem.children.length){
                        //you also have to check that the text exists
                        elemText = elem.innerText;

                        if (/^ *$/.test(elemText)){
                            // Nothing
                        } else {
                            text_count++;
                        }
                    }
                }
            }
            if (text_count === 0){
                return { data: '<p style="margin-bottom: 6px;"></p>', value: true };
            } else if (text_count > 0){
                return { data: data, value: false };
            }
        },

        stripAttributes(html){
            const parsed = new DOMParser().parseFromString(html, 'text/html')
            parsed.body.querySelectorAll('*').forEach(elem => [...elem.attributes].forEach(attr => {
                if (attr.name == 'style' || attr.name == 'href' || attr.name == 'rel' || attr.name == 'target'){
                    // Do nothing
                } else {
                    elem.removeAttribute(attr.name);
                }
            }))

            parsed.body.querySelectorAll('a').forEach((e) => {
                e.setAttribute('target', '_blank');
            })

            return parsed.body.innerHTML;
        },

        stripElem(data){
            var div = document.createElement('div');
            div.innerHTML = data;
            var p = div.getElementsByTagName('p');
            var i = p.length;
            while (i--){
                p[i].style  = "margin-bottom:3px";
            }

            return div.innerHTML;
        },

        usurp(p){
            var last = p;
            for (var i = p.childNodes.length - 1; i >= 0; i--) {
                var e = p.removeChild(p.childNodes[i]);
                p.parentNode.insertBefore(e, last);
                last = e;
            }
            p.parentNode.removeChild(p);
        },

        sanitize(el){
            var tags = Array.prototype.slice.apply(el.getElementsByTagName("*"));
            for (var i = 0; i < tags.length; i++) {
                if ([ "P", "A", "UL", "LI", "STRONG", "I", "S", "U", "EM" ].indexOf(tags[i].nodeName) == -1) {
                    this.usurp(tags[i]);
                }
            }
        },

        sanitizeString(string){
            var div = document.createElement("div");
            div.innerHTML = string;
            this.sanitize(div);
            return div.innerHTML;
        }
    }
}