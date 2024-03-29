class Food {
    constructor() {
        this.image = loadImage("images/Milk.png");
        this.foodStock = 0;
        this.lastFed;
    }
    updateFoodStock(foodStock) {
        this.foodStock = foodStock;
    }
    getFedTime(lastFed) {
        this.lastFed = lastFed;
    }
    deductFood() {
        if (this.foodStock > 0) {
            this.foodStock= this.foodStock-1;
        }
    }
    getFoodStock() {
        return this.foodStock;
    }
    bedroom() {
        background(bedImage, 494, 800);
    }
    garden() {
        background(gardenImg, 494, 800);
    }
    washroom() {
        background(washImage, 494, 800);
    }
    display() {
        var x=80, y=100;

        
        if(this.foodStock !== 0) {
            for(var i = 0; i < this.foodStock;i++){
                if(i%10 == 0) {
                    x=80;
                    y+= 50;
                }
                image(this.image,x, y, 50, 50);
                x = x + 30;
            }
        }
    }
    
}