let app = new Vue({
    el:'#app',
    data: {
       product: 'Witcher',
       description: "Geralt",
       image:'./assets/960x0.jpg',
       url:'https://www.netflix.com/ua/title/80189685',
       inventory:100,
       onSale:false,
       detail:["full game","amazing gameplay","100hours++"],
       sizes:["42.33GB Standart Edition","50GB with Stone Hearts","70GB+ Blood and Wine"],
       cart:0,
       variants:[
           {
               variantId:2234,
               variantPh: 'game',
               variantImage: './assets/witcher3.0.jpg'
           },
           {
            variantId:2234,
            variantPh: 'game2',
            variantImage: './assets/witcher33.jpg'
           }
        ]

    },
    methods: {
        addToCart(){
            this.cart +=1;
        },
        updateImage(variantImage){
            this.image = variantImage
        },
        decrementValue(){
            this.cart -=1;
        }
    },
})