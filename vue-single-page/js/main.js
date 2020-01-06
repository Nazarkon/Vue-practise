let eventBus = new Vue()

Vue.component('product-review',{
    template:`
    <form class="review-form" @submit.prevent="onSubmit">
         
        <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
               <li v-for="error in errors">{{error}}</li>
            </ul>
        </p>
        <p>
            <label for="name">Name:</label>
            <input id="name" v-model="name">
        </p>
        <p>
            <label for="review">Review:</label>
            <textarea id="review" v-model="review" ></textarea>
        </p>
        <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>
        </p>
        <p>
           <span>Would you recomment this game?</span>
            <input type="radio" id="one" value="Yes" v-model="picked">
            <label for="one">Yes</label>
            <br>
            <input type="radio" id="two" value="No" v-model="picked">
            <label for="two">No</label>
            <br>
           
        </p>
        <p>
            <input type="submit" value="Submit">
        </p>
    </form>
    `,
    data() {
        return {
            name:null,
            review:null,
            rating:null,
            picked:null,
            errors:[],
        }
    },
    methods: {
        onSubmit(){
            if(this.name && this.review && this.rating){
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating:this.rating,
                    picked:this.picked
                }
                eventBus.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
                this.picked = null
            }else{
                if(!this.name) this.errors.push("Name required")
                if(!this.review) this.errors.push("Review required")
                if(!this.rating) this.errors.push("Rating required")
            }

        }
    },
})

Vue.component('product',{
    props:{
       premium:{
           type:Boolean,
           required:true
       }
    },
    template: `
    <div class="product">
    <div class="product-image">
        <a v-bind:href="url"><img v-bind:src="image" v-bind:alt="description"></a>
    </div>
    <div class="product-info">
        <h1>{{product}}</h1>
        <p v-if="inventory > 10">A lot of Staff</p>
        <p v-else-if="inventory<=10 && inventory > 0">Almost sold out!</p>
        <p v-else>In production</p>
        <p v-show="onSale">On Sale!</p>
        <p>Shipping: {{ shipping }}</p>

        <ul>
            <li v-for="disk in detail">{{disk}}</li>
        </ul>
        <ol>
            <li v-for="size in sizes">{{size}}</li>
        </ol>

        <div v-for="(variant , index) in variants" 
        :key="variant.variantId"
        class="color-box"
        :style="{backgroundColor: variant.variantColor}"
        @mouseover="updateImage(index)">
        </div>
        <button v-on:click="addToCart">Add to Cart</button>
        <button v-on:click="removeValue">Remove from Cart</button>
        <product-tabs :reviews="reviews"></product-tabs>
    </div>
   
</div>`,
data() {
    return {
        product: 'Witcher',
        description: "Geralt",
        selectedVariant:0,
        url:'https://www.netflix.com/ua/title/80189685',
        onSale:false,
        detail:["full game","amazing gameplay","100hours++"],
        sizes:["42.33GB Standart Edition","50GB with Stone Hearts","70GB+ Blood and Wine"],
        variants:[
            {
                variantId:2234,
                variantColor: 'green',
                variantImage: './assets/witcher3.0.jpg',
                variantQuantity: 10
            },
            {
             variantId:2235,
             variantColor: 'red',
             variantImage: './assets/witcher33.jpg',
             variantQuantity: 0
            }
         ],
         reviews:[]
 
    }
},
    methods: {
        addToCart(){
            this.$emit('add-to-cart' , this.variants[this.selectedVariant].variantId)
        },
        updateImage(index){
            this.selectedVariant = index
            console.log(index)
        },
        removeValue(){
            this.$emit('remove-cart', this.variants[this.selectedVariant].variantId)
        },
    },
    computed: {
        image(){
            return this.variants[this.selectedVariant].variantImage
        },
        inventory(){
                 return this.variants[this.selectedVariant].variantQuantity
        },
        shipping(){
           if(this.premium){
               return 'free'
           }else{
               return 2.99
           }
        },
        mounted() {
            eventBus.$on('review-submitted', productReview =>{
                console.log(productReview)
                this.reviews.push(productReview)
            })
        }
    },
})

Vue.component('product-tabs',{
    props: {
        reviews: {
            type:Array,
            required:true
        }
    },
    template:`
        <div>
            <span class="tab" 
            :class = "{ activeTab: selectedTab === tab}"
            v-for="(tab,index) in tabs" 
            :key="index"
            @click="selectedTab = tab">{{tab}}</span>

            <div v-show="selectedTab === 'Reviews'">
            <h2>Reviews</h2>
            <p v-if="!reviews.length">There are no reviews yet.</p>
                <ul>
                    <li v-for="review in reviews">
                    <p>Name: {{ review.name }}</p>
                    <p>Rating: {{ review.rating }}</p>
                    <p>Review: {{ review.review }}</p>
                    <p>Recommnd: {{ review.picked }}</p>
                    </li>
                </ul>
        </div>
        <product-review  v-show="selectedTab === 'Make a Review'"></product-review>
        </div>

        
    `,
    data() {
        return {
            tabs:["Reviews","Make a Review"],
            selectedTab: 'Reviews',
        }
    },
})

let app = new Vue({
    el:'#app',
    data:{
        premium:false,
        cart:[]
    },
    methods: {
        updateCart (id) {
            this.cart.push(id);
        },
        removeCart(id) {
            this.cart.pop(id)
        }
    },
})