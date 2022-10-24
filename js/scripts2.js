class Producto {
    constructor(nombreProducto, idproducto, price, brand, category, img = [], discount, variant = {}) {
        this.nombreProducto = nombreProducto
        this.productId = idproducto
        this.price = price
        this.brand = brand
        this.category = category
        this.img = img
        this.discount = discount || 0
        this.variant = variant
        this.stocktotal = this.stockTotal()
    }

    stockTotal() {
        const totalStock = []
        for (const stock of this.variant) {
            totalStock.push(stock.cantidad)
        }
        const sumaStock = totalStock.reduce(function(a, b) { return a + b });
        return sumaStock
    }

}

const buzoNina = new Producto(
    "Buzo azul para niña",
    001,
    50000,
    "Tennis",
    "nina", ["img/product-001-a.jpg", "img/product-001-b.jpg"],
    30, [
        { talla: "XS", cantidad: 5, skuId: "001-a" },
        { talla: "S", cantidad: 3, skuId: "001-b" },
        { talla: "M", cantidad: 1, skuId: "001-c" },
        { talla: "L", cantidad: 0, skuId: "001-d" },
        { talla: "XL", cantidad: 1, skuId: "001-e" }
    ]
)

const buzoHombre = new Producto(
    "Buzo blanco para hombre",
    002,
    20000, "TopMark",
    "hombre", ["img/product-002-a.jpg", "img/product-002-b.jpg"],
    50, [
        { talla: "XS", cantidad: 2, skuId: "002-a" },
        { talla: "S", cantidad: 2, skuId: "002-b" },
        { talla: "M", cantidad: 1, skuId: "002-c" },
        { talla: "L", cantidad: 3, skuId: "002-d" },
        { talla: "XL", cantidad: 1, skuId: "002-e" }
    ]
)

const camisaMujer = new Producto(
    "Camisa Verde para mujer",
    003,
    150000, "Tennis",
    "mujer", ["img/product-003-a.jpg", "img/product-003-b.jpg"],
    0, [
        { talla: "XS", cantidad: 0, skuId: "003-a" },
        { talla: "S", cantidad: 3, skuId: "003-b" },
        { talla: "M", cantidad: 0, skuId: "003-c" },
        { talla: "L", cantidad: 2, skuId: "003-d" },
        { talla: "XL", cantidad: 0, skuId: "003-e" }
    ]
)

const camisaNegra = new Producto(
    "Camisa negra para mujer",
    004,
    100000, "TopMark",
    "mujer", ["img/product-004-a.jpg", "img/product-004-b.jpg"],
    0, [
        { talla: "XS", cantidad: 5, skuId: "004-a" },
        { talla: "S", cantidad: 4, skuId: "004-b" },
        { talla: "M", cantidad: 2, skuId: "004-c" },
        { talla: "L", cantidad: 1, skuId: "004-d" },
        { talla: "XL", cantidad: 1, skuId: "004-e" }
    ]
)

const camisaNino = new Producto(
    "buzo verde para niño",
    005,
    80000, "Tennis",
    "nino", ["img/product-005-a.jpg", "img/product-005-b.jpg"],
    0, [
        { talla: "XS", cantidad: 3, skuId: "005-a" },
        { talla: "S", cantidad: 3, skuId: "005-b" },
        { talla: "M", cantidad: 0, skuId: "005-c" },
        { talla: "L", cantidad: 2, skuId: "005-d" },
        { talla: "XL", cantidad: 1, skuId: "005-e" }
    ]

)

const camisaNina = new Producto(
    "Camiseta azul para niña",
    005,
    90000, "Tennis",
    "nina", ["img/product-005-a.jpg", "img/product-005-b.jpg"],
    0, [
        { talla: "XS", cantidad: 0, skuId: "005-a" },
        { talla: "S", cantidad: 0, skuId: "005-b" },
        { talla: "M", cantidad: 0, skuId: "005-c" },
        { talla: "L", cantidad: 0, skuId: "005-d" },
        { talla: "XL", cantidad: 0, skuId: "005-e" }
    ]

)


let listadoDeProductos = [buzoNina, buzoHombre, camisaMujer, camisaNegra, camisaNino, camisaNina]
    //console.log(listadoDeProductos)
let listadoDeProductosConStock = listadoDeProductos.filter((product) => product.stocktotal > 0)
    //console.log(listadoDeProductosConStock)
let listadoCategorias = listadoDeProductosConStock.map((product) => product.category)
let listadoCategoriasUnicas = [...new Set(listadoCategorias)]
let wishlistProducts = []
let wishlistProductsObjets = []
let wishlistProductsObjetsNoRepeat = []


let catalog = document.getElementById("products")
let wishlist = document.getElementById("wishlist")
let espacioCategory = document.getElementById("botonesCategorias")
    //Pintar productos en el sitio

function renderProducts(listado, siteToRender) {
    // console.log(listado)
    siteToRender.innerHTML = ''
    listado.forEach((producto) => {
        //Item
        let item = document.createElement("div")
        item.classList.add("item-carousel")
            //img
        let img = document.createElement("img")
        img.setAttribute(
            'src',
            producto.img[0],
        )
        img.setAttribute(
            'alt',
            producto.nombreProducto,
        )

        //nombre
        let name = document.createElement("h3")
        name.innerText = producto.nombreProducto
            //marca
        let brand = document.createElement("p")
        brand.classList.add("brand")
        brand.innerText = producto.brand
            //price
        let precio = document.createElement("div")
        precio.classList.add("item-price")
            //descuento
        if (producto.discount > 0) {
            let discount = document.createElement("p")
            discount.classList.add("discount")
            discount.innerText = `${producto.discount}%`
            let newPrice = document.createElement("p")
            newPrice.classList.add("new-price")
            newPrice.innerText = `$${producto.price * (1 - (producto.discount / 100))}`
            precio.append(discount)
            precio.append(newPrice)
            let precioBase = document.createElement("p")
            precioBase.classList.add("old-price")
            precioBase.innerText = `$${producto.price}`
            precio.append(precioBase)
        } else {
            let newPrice = document.createElement("p")
            newPrice.classList.add("new-price")
            newPrice.innerText = `$${producto.price}`
            precio.append(newPrice)
        }

        // tallas
        let tallas = document.createElement("div")
        tallas.classList.add("item-sizes")
        for (const size of producto.variant) {
            let itemsize = document.createElement("a")
            itemsize.innerText = size.talla
            if (size.cantidad === 0) {
                itemsize.classList.add("agotado")
            }
            tallas.append(itemsize)
        }
        // FAV
        let favorito = document.createElement("a")
        favorito.classList.add("favorito")
        favorito.innerText = "agregar a favorito"
        favorito.setAttribute(
            'href',
            '#'
        )
        favorito.dataset.productId = producto.productId
        favorito.addEventListener('click', addProductToFavoritos)

        item.append(img)
        item.append(name)
        item.append(brand)
        item.append(precio)
        item.append(tallas)
        item.append(favorito)
        siteToRender.append(item)
    })

    //printwislits()

}

renderProducts(listadoDeProductosConStock, catalog)
initWishlist()


// Create buttons to filters
listadoCategoriasUnicas.forEach((item) => {
    let button = document.createElement("a")
    button.classList.add("btn-secondary")
    button.classList.add("btn-to-filter")
    button.setAttribute(
        'href',
        '#'
    )
    button.innerText = item
    espacioCategory.append(button)
    button.addEventListener('click', filterproduct)
})



// seleccionar boton ver todo
let verTodosProductos = document.getElementById("vertodo")
verTodosProductos.addEventListener("click", verTodofunction)

function filterproduct(event) {
    event.preventDefault()
    let categorySelect = this.innerHTML
    let listadoFiltrado = listadoDeProductosConStock.filter((product) => product.category == categorySelect)
    renderProducts(listadoFiltrado, catalog)
}

function verTodofunction(event) {
    event.preventDefault()
    renderProducts(listadoDeProductosConStock, catalog)
}

function addProductToFavoritos(event) {
    event.preventDefault()
    let itemId = event.target.dataset.productId
    wishlistProducts.push(itemId)
        //console.log(wishlistProducts)
    printwislits()
    saveWishlist()
}

function printwislits() {
    //wishlistProductsObjets = []
    wishlistProductsNoRepeat = [...new Set(wishlistProducts)]
    wishlistProductsNoRepeat.forEach((itemId) => {
            let item = listadoDeProductosConStock.filter((producto) => {
                    return producto.productId === parseInt(itemId)
                })
                // console.log(item[0].productId)
                // console.log(itemId)
                // if (wishlistProductsObjets.some((productico) => productico === item[0].productId)) {
                //     console.log("no hago nada")
                // } else {
                //     wishlistProductsObjets.push(item[0])
                // }
            wishlistProductsObjets.push(item[0])

        })
        //console.log(wishlistProductsObjets)
    wishlistProductsObjetsNoRepeat = [...new Set(wishlistProductsObjets)]
    renderProducts(wishlistProductsObjetsNoRepeat, wishlist)

}

function initWishlist() {
    cargarWishlist()
    if (wishlistProductsObjets.length == 0) {
        wishlist.innerHTML = "Tu lista de deseos está vacía"
    } else {
        printwislits()
    }
}


//guardar wishlist storage

function saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(wishlistProductsObjets))
}

function cargarWishlist() {
    //console.log("funciona")
    if (localStorage.getItem('wishlist') !== null) {
        wishlistProductsObjets = JSON.parse(localStorage.getItem('wishlist'))
        printwislits()
    }
}