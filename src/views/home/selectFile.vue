<template>
    <div class="addContent item-select-box">
        <button class="addBtn" :data-show="selectStatus" @click="handleSelect()">
            添加文字 / 文字 / 视频
        </button>
        <SelectItem :selectStyle="selectShow"></SelectItem>
    </div>
</template>

<script>
    // 引入图片、视频、文字上传按钮的菜单
    import SelectItem from './selectItem';

    export default {
        name: "selectFile",
        components: {SelectItem},
        props: {
            index: {
                type: [Number, String],
                default: function () {
                    return 0;
                }
            }
        },
        data() {
            return {
                selectStatus: false,
                selectShow: 'opacity: 0;transform: translateY(10px) scale(.01);'
            };
        },
        methods: {
            // 是否显示按钮
            handleSelect() {
                if (this.selectStatus == true) {
                    this.selectShow = 'opacity: 0.5;transform: translateY(0) scale(1);';
                    setTimeout(() => {
                        this.selectShow = 'opacity: 0;transform: translateY(15px) scale(.01);';
                    }, 100);
                    this.selectStatus = false;
                } else {
                    this.selectShow = 'opacity: 0;transform: translateY(15px) scale(0.01);';
                    // 遍历所有的按钮，把已经显示的隐藏掉，单独点击的显示！
                    let list = document.getElementsByClassName('triangle');
                    for (var i in list) {
                        if (list[i].style != undefined) {
                            list[i].style.opacity = '0.5';
                            list[i].style.transform = 'translateY(10px) scale(0.01)';
                        }
                    }
                    setTimeout(() => {
                        this.selectShow = 'opacity: 1;transform: translateY(0) scale(1);';
                    }, 100);
                    this.selectStatus = true;
                }
            }
        }
    };
</script>

<style scoped>
    button.addBtn {
        display: block;
        width: 100%;
        height: 1.28rem;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVGQzE0QTREQjJBODExRTlBMjg3RTBERDYxQ0RFMTJEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjVGQzE0QTRFQjJBODExRTlBMjg3RTBERDYxQ0RFMTJEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NUZDMTRBNEJCMkE4MTFFOUEyODdFMERENjFDREUxMkQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NUZDMTRBNENCMkE4MTFFOUEyODdFMERENjFDREUxMkQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5J0oTUAAAEoklEQVR42tSaWWxNQRjH516EapFY0/JC7NrYanmwVaJ4oRJFrLG1EbGFJ0ullhAvpA2CVGNPLKl6kJZEFQ/VqCUVSwkv1B5BkZCm/p/7H53e9rbnnHtu3fslv9zTnmX+35w5M998M56SkhLlgnUFSWA06A96gi4gmue/gw/gJXgCpNAi8D7YglsGcW8nsBDMBcOBp5FrW4OOoB+Ywv/VgDJwGhwHn5rLgViwAaQbNfwD3ALXwSNQAd6BKp6PAd1AXzAQTABjQCLZAY6CXaDSjhiPjSYkzq4DGRQkNXgFHAMXwU+bFREFUsAikMw3KA5vA/vAbysP8VosrA8oBXsoPp/NRprDGQfiFe85w2cMZyXEsIxSvilXHJgO7oCh4AWYypq7p9wzedYMPlvKGAJus5ygHEgDF0B7cI5OFKjQWQHLOMe3cZ4aHDmwAhwCLcBWMAt8VaG3ryxrK8s+RC22HJgGsnm8mh9Wc5uUuYbH2dRkyYEB4JRR89nq/1mW8SZOUVuj40Ar9gwxbIeOar68vDzguYSEBCdvYhCblWgbYXax/m9gLRjMnmC5Ch9Lo6bBHIsabEJxHKTEVoIvLhQ8lSNrJY+d2hdqEttCrfUc2Mimc9HFrjKHoUcsj4PtYvVgt8nfgc5gCcODTBdffWyAY6eWSY2LqfmfA/MZm1wF91X42n1qjKLmOg6I5arwN61xnnZAJiPDGBLnR4AD+dQqAWCcODCRoexNh1Flc9tPahXNSeLAKJ64oSLHivmb6OUcVuxhBDmgtfaTUKI3/6hwGh64FWbYCDme6YmWl3NVxaxBpJjW2k0caMc/vtkMD2os4G9NXW815NBa23kdeJ/j0qgaaOS2E3L88prehEnz8Fi45l+r8TJ/o5hJs2LLwNsQiX8Nllq4Tmv9LL3Qc/ZEknR6YuHmyzaaUI2D2rWa5vnbG7WkaMnNxINLbsykXJ6RNWTx/H3qZf5FbFwEdaPj+VsmDhTxVY8FbSJAvGgcQ83X9Ed8F7RVFjJhYWCSKYym5ko9Dpzk7+IIcEBrPG1OaE4yTJ2kfHnJcDXRlkytx00HPnKm42EiKVwtgxpzqblOVmKn8uXnU1TtKkqw9sY4Dnbwm6x8Gewqaq2XVpFASmfi9oMOLjigR22rI2wgk+z4AR5vV8Yqjn8wJysjkqvvBQ674IAetXvw2KkdoSbRttc84Z8blZzjbOVb0JBcpAypO+yW5tJoq20ztUjQOUf5LT15A8x2FoBqvq5V//GjXUUN1Uz91Js1BpoPXDKEZ6nanGlz9zhZhiMNxmmNTWgOKt9SqngvKb2z/JhCbe1ZVibLTqcWZdcBxQ95pvIt+6TyI0oOofhklpHK7jK1qc7EypRSMsKJRu9UCPJcHrGH8JmFLOMB81V5Td1odU4sH7bsg9jEYTyFwVQBe4YoB6KjeG8Bn5XCZ0uvM1L5Vvybnn862OzRHaxXvlUTczOHbDUoVnW3GpjzbXOrwXiGxOZWBQkPdoNXtibQQexW6czuVrLEwxxMF2tY87J4d0LHNrYzAC5tt5HaTWK7lZVEvd0mhuerVO12m8ecBRYZCQXH9keAAQAOOBv817ejzAAAAABJRU5ErkJggg==) no-repeat center top;
        background-size: 1.28rem 1.28rem;
        text-indent: -999999em;
        outline: none;
        text-align: center;
        margin: 0.5466666667rem 0;
    }
</style>
