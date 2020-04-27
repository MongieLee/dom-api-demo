window.dom = {
    create(str) {
        let tem = document.createElement('template')
        tem.innerHTML = str.trim()
        return tem.content.firstChild
    },

    after(node, node2) {
        node.parentNode.insertBefore(node2, node.nextSibling)
    },

    before(node, node2) {
        node.parentNode.insertBefore(node2, node)
    },

    append(parent, node) {
        parent.appendChild(node)
    },

    wrap(node, parent) {
        dom.after(node, parent)
        dom.append(parent, node)
    },

    remove(node) {
        node.parentNode.removeChild(node)
        return node
    },

    empty(node) {
        //简单粗暴版
        //node.innerHTML = ''

        //返回儿子版
        const { childNodes } = node //es6快速语法
        let arr = []
        let x = node.firstChild
        while (x) {
            arr.push(dom.remove(x))
            x = node.firstChild
            console.log('我吃了一个儿子')
        }
        return arr
    },

    attr(node, name, value) {
        if (arguments.length === 2) {
            return node.getAttribute(name)
        }
        arguments.length === 3 && node.setAttribute(name, value)
    },

    text(node, value) {
        if (arguments.length === 1) {
            return node.innerHTML
        } else if (arguments.length === 2) {
            if ('innerHTML' in Node) {
                node.innerHTML = value
            } else {
                node.textContent = value
            }
        }
    },

    html(node, string) {
        if (arguments.length === 1) {
            return node.innerHTML
        } else if (arguments.length === 2) {
            node.innerHTML = string
        }
    },

    style(node, name, value) {
        if (arguments.length === 3) {
            node.style[name] = value
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                return node.style[name]
            } else if (name instanceof Object) {
                for (key in name) {
                    node.style[key] = name[key]
                }
            }
        }
    },

    class: {
        add(node, className) {
            node.classList.add(className)
        },
        remove(node, className) {
            node.classList.remove(className)
        },
        has(node, className) {
            return node.classList.contains(className)
        }
    },



    on(node, event, fn) {
        node.addEventListener(event, fn)
    },

    off(node, event, fn) {
        node.removeEventListener(event, fn)
    },

    find(selector, scope) {
        return (scope || document).querySelectorAll(selector)
    },

    parent(node) {
        return node.parentNode
    },

    children(node) {
        return node.children
    },

    siblings(node) {
        return Array.from(node.parentNode.children).filter(v => v !== node)
    },

    next(node) {
        let x = node.nextSibling
        while (x && x.nextSibling.nodeType === 1) {
            x = x.nextSibling
        }
        return x
    },

    previous(node) {
        let x = node.previousSibling
        while (x && x.previousSibling.nodeType === 1) {
            x = x.previousSibling
        }
        return x
    },

    each(nodeList,fn){
        for(let i=0;i<nodeList.length;i++){
            fn.call(null,nodeList[i])    
        }
    },

    index(node){
        for(let i = 0;i<node.parentNode.children.length;i++){
            if(node.parentNode.children[i] === node){
                return i
            }
        }
    }
}