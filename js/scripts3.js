fetch('productos.json')
    .then((response) => response.json())
    .then(function(data) {
        listadoDeProductos = data
        listadoCategorias = data.map((product) => product.category)
        listadoCategoriasUnicas = [...new Set(listadoCategorias)]

        renderProducts(listadoDeProductos, catalog)
        crearCategorias()
        initCartStorage()
    })


let listadoDeProductos
let listadoCategorias
let listadoCategoriasUnicas


let catalog = document.getElementById("products")
let carrito = document.getElementById("minicartProducts")
let totalCompra = document.getElementById("totalCompra")
let totalSinDiscount = document.getElementById("totalSinDiscount")
let espacioCategory = document.getElementById("botonesCategorias")
let countCart = document.getElementById("countCart")
let closeMiniCart = document.getElementById("cerrar-mini-cart")
let miniCarrito = document.getElementById("minicart")
let iconMiniCart = document.getElementById("iconminicart")

//pintar productos en el sitio

function renderProducts(listado, siteToRender) {
    //console.log("listado:", listado)
    siteToRender.innerHTML = ''
    listado.forEach((producto) => {

        const totalStock = []
        for (const stock of producto.variant) {
            //console.log(producto.variant)
            totalStock.push(stock.cantidad)
        }
        const sumaStock = totalStock.reduce(function(a, b) { return a + b });

        if (sumaStock > 0) {
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
                producto.nombre,
            )

            //nombre
            let name = document.createElement("h3")
            name.innerText = producto.nombre
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

                function borrarClases() {
                    for (let index = 0; index < tallas.childNodes.length; index++) {
                        if (tallas.childNodes[index].classList.contains("select")) {
                            tallas.childNodes[index].classList.remove("select")
                        }
                    }
                }
                if (size.cantidad === 0) {
                    itemsize.classList.add("agotado")
                } else {
                    itemsize.setAttribute(
                        'href',
                        '#'
                    )
                    itemsize.dataset.skuId = size.skuId
                }
                tallas.append(itemsize)
                itemsize.addEventListener('click', skuSelected)

                function skuSelected() {
                    event.preventDefault()
                    borrarClases()
                    itemsize.classList.add("select")
                }
            }

            // cart
            let addToCart = document.createElement("a")
            addToCart.classList.add("addtocart")
            addToCart.innerText = "Agregar al carrito"
            addToCart.setAttribute(
                'href',
                '#'
            )
            addToCart.dataset.productId = producto.idproducto
            addToCart.addEventListener('click', addProductToCart)

            item.append(img)
            item.append(name)
            item.append(brand)
            item.append(precio)
            item.append(tallas)
            item.append(addToCart)
            siteToRender.append(item)
        }
    })

}


// Create buttons to filters
function crearCategorias() {
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
}


// seleccionar boton ver todo
let verTodosProductos = document.getElementById("vertodo")
verTodosProductos.addEventListener("click", verTodofunction)

function filterproduct(event) {
    event.preventDefault()
    let categorySelect = this.innerHTML
    let listadoFiltrado = listadoDeProductos.filter((product) => product.category == categorySelect)
    renderProducts(listadoFiltrado, catalog)
}

function verTodofunction(event) {
    event.preventDefault()
    renderProducts(listadoDeProductos, catalog)
}

//Carrito de compras

let carritoDeCompras = []
let cartSinRepetidos = []

function addProductToCart(event) {
    event.preventDefault()
    let tallas = this.parentElement.childNodes[4]

    let sumoDesactivados = []
    for (let index = 0; index < tallas.childNodes.length; index++) {
        if (tallas.childNodes[index].classList.contains("select")) {
            let seleccionado = tallas.childNodes[index].dataset.skuId
                //console.log(seleccionado)
                //let SkuId = seleccionado.dataset.skuId
                //console.log(SkuId)
            carritoDeCompras.push(seleccionado)
            tallas.childNodes[index].classList.remove("select")
            renderCart()
            openCart()
        } else {
            sumoDesactivados.push(tallas.childNodes[index].dataset.skuId)
        }
        if (sumoDesactivados.length === tallas.childNodes.length) {
            closeCart()
            let timerInterval
            Swal.fire({
                title: 'Debes seleccionar una talla',
                //html: 'I will close in <b></b> milliseconds.',
                timer: 15500,
                timerProgressBar: true,
                willClose: () => {
                    clearInterval(timerInterval)
                }
            })
        }
    }

}


//pintar carrito

function renderCart() {
    carrito.innerHTML = ''
    countMiniCart()
    cartSinRepetidos = [...new Set(carritoDeCompras)]
        //console.log(cartSinRepetidos)
    cartSinRepetidos.forEach((product) => {

        let skuitem = listadoDeProductos.filter((producto) => {
                return producto.idproducto === parseInt(product)
            })
            //console.log(product)
            //Item
        let item = document.createElement("div")
        item.classList.add("item-minicart")
            //img

        let img = document.createElement("img")
        img.setAttribute(
            'src',
            skuitem[0].img[0],
        )
        img.setAttribute(
                'alt',
                skuitem[0].nombre,
            )
            //nombre
        let infoproduct = document.createElement("div")
        infoproduct.classList.add("info-product")

        let name = document.createElement("h3")
        name.innerText = skuitem[0].nombre
            //price
        let precio = document.createElement("div")
        precio.classList.add("item-price")
            //descuento
        if (skuitem[0].discount > 0) {
            let discount = document.createElement("p")
            discount.classList.add("discount")
            discount.innerText = `${skuitem[0].discount}%`
            let newPrice = document.createElement("p")
            newPrice.classList.add("new-price")
            newPrice.innerText = `$${skuitem[0].price * (1 - (skuitem[0].discount / 100))}`
            precio.append(discount)
            precio.append(newPrice)
            let precioBase = document.createElement("p")
            precioBase.classList.add("old-price")
            precioBase.innerText = `$${skuitem[0].price}`
            precio.append(precioBase)
        } else {
            let newPrice = document.createElement("p")
            newPrice.classList.add("new-price")
            newPrice.innerText = `$${skuitem[0].price}`
            precio.append(newPrice)
        }
        let tallas = document.createElement("div")
        tallas.classList.add("item-sizes")
        let tallasku = skuitem[0].variant.filter((producto) => {
            return producto.skuId == product
        })
        tallas.innerHTML = `<strong>Talla:</strong> ${tallasku[0].talla}`

        let cantidadSku = carritoDeCompras.reduce((total, skuid) => {
            return skuid === product ? total += 1 : total
        }, 0)

        let cantidad = document.createElement("div")
        cantidad.classList.add("cantidadSku")

        cantidad.innerHTML = `<strong>Cantidad:</strong> ${cantidadSku}`

        //remove
        let removeToCart = document.createElement("a")
        removeToCart.classList.add("removeToCart")
        removeToCart.innerHTML = 'X'
        removeToCart.setAttribute(
            'href',
            '#'
        )
        removeToCart.dataset.productSku = product
        removeToCart.addEventListener('click', removeitemCart)

        item.append(img)
        item.append(infoproduct)
        infoproduct.append(name)
        infoproduct.append(precio)
        infoproduct.append(tallas)
        infoproduct.append(cantidad)
        item.append(removeToCart)
        carrito.append(item)



        let totalfull = calcularTotal()
        let totalDiscount = calcularTotalAntes()

        if (totalfull === totalDiscount) {
            totalSinDiscount.innerHTML = ""
            totalCompra.innerHTML = `<strong>Total: ${calcularTotal()}</strong>`
        } else {
            totalSinDiscount.innerHTML = `Subtotal: ${calcularTotalAntes()}`
            totalCompra.innerHTML = `<strong>Total: ${calcularTotal()}</strong>`
        }



    })
    saveCartStorage()

}

//calcular totales

function calcularTotal() {
    return carritoDeCompras.reduce((total, skuId) => {
        let itemsku = listadoDeProductos.filter((producto) => {
            return producto.idproducto === parseInt(skuId)
        })
        return total + itemsku[0].price * (1 - (itemsku[0].discount / 100))
    }, 0)
}

function calcularTotalAntes() {
    return carritoDeCompras.reduce((total, skuId) => {
        let itemsku = listadoDeProductos.filter((producto) => {
            return producto.idproducto === parseInt(skuId)
        })
        return total + itemsku[0].price
    }, 0)
}

//eliminar productos del carrito

function removeitemCart(event) {
    event.preventDefault()
    let itemId = event.target.dataset.productSku
    carritoDeCompras = carritoDeCompras.filter((cartId) => {
        return cartId != itemId
    })
    renderCart()
    carritoVacio()
    countMiniCart()
}

function carritoVacio() {
    if (cartSinRepetidos["length"] === 0) {
        totalSinDiscount.innerHTML = ""
        totalCompra.innerHTML = "Su carrito está vacío"
        countMiniCart()
    }
}

function countMiniCart() {
    countCart.innerHTML = carritoDeCompras.length
}

closeMiniCart.addEventListener('click', closeCart)
iconMiniCart.addEventListener('click', openCart)
iconMiniCart.addEventListener('mouseover', openCart)

function closeCart() {
    //event.preventDefault
    miniCarrito.classList.add("miniclose")
}

function openCart(event) {
    carritoVacio()
    miniCarrito.classList.remove("miniclose")
    miniCarrito.classList.add("miniopen")
}

//storage

function initCartStorage() {
    cargarCarrito()
    if (carritoDeCompras.length == 0) {
        carritoVacio()
    } else {
        renderCart()
    }
}


//guardar carrito storage

function saveCartStorage() {
    localStorage.setItem('carrito', JSON.stringify(carritoDeCompras))
}

function cargarCarrito() {
    //console.log("funciona")
    if (localStorage.getItem('carrito') !== null) {
        carritoDeCompras = JSON.parse(localStorage.getItem('carrito'))
        renderCart()
    }
}