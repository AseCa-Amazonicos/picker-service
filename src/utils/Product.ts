export class Product {
    id:      number
    name:    string
    price:   number
    constructor(productDto: Product) {
        this.id = productDto.id
        this.name = productDto.name
        this.price = productDto.price
    }
}
