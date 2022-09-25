function Usuario(nombre, cupon) {
    this.nombre = nombre;
    this.cupon = cupon;
    this.totalProducto1 = 0;
    this.totalProducto2 = 0;
    this.totalProducto3 = 0;
    this.totalProducto4 = 0;
    this.totalCarrito = 0
}

const usuario1 = new Usuario("", "")

class Producto {
    constructor(nombreProducto, precio, descuento) {
        this.nombreProducto = nombreProducto
        this.precio = precio
        this.descuento = descuento
    }

}

const camiseta = new Producto("Camiseta", 20000, 0)
const vestido = new Producto("Vestido", 15000, 0)
const jean = new Producto("Jean", 25000, 0)
const sudadera = new Producto("Sudadera", 30000, 0)


let nombreDeUsuario = prompt("Gracias por entrar a Tennis Tienda de ropa online \ningresa tu nombre para registrarte o continua sin registro haciendo clic en aceptar");

if ((nombreDeUsuario != "") && (nombreDeUsuario != null)) {
    usuario1.nombre = nombreDeUsuario
    usuario1.cupon = "BIENVENIDO"
    alert("Hola " + nombreDeUsuario + "\nGracias por registrarte, utilza el cupón BIENVENIDO al momento de pagar para obtener 10% de DCTO")
} else {
    alert("¡Bienvenido a nuestra tienda!")
}

console.log(usuario1)

let compras
let cantidad

mostrarProductos()
carrito()

function mostrarProductos() {
    let compras = parseInt(prompt("Te presentamos nuestros productos \n1 Camiseta\n2 Vestido\n3 Jean\n4 Sudadera\n ingresa el número del producto que deseas agregar al carrito\n ingresa 0 para ir a pagar o salir"))
        // let cantidad = parseInt(prompt("Ingresa la cantidad"))
        //Repetimos con While hasta que el usuario ingresa "ESC"
    while (compras != 0) {
        //alert("el usuario ingresó " + compras)
        switch (compras) {
            case 1:
                cantidad = parseInt(prompt("Ingresa la cantidad de " + camiseta.nombreProducto + " que deseas agregar"))
                usuario1.totalProducto1 += caluclarPrecios(camiseta.precio, cantidad)
                usuario1.totalCarrito += usuario1.totalProducto1
                console.log(usuario1)
                break;
            case 2:
                cantidad = parseInt(prompt("Ingresa la cantidad de " + vestido.nombreProducto + " que deseas agregar"))
                usuario1.totalProducto2 += caluclarPrecios(vestido.precio, cantidad)
                usuario1.totalCarrito += usuario1.totalProducto2
                console.log(usuario1)
                break;
            case 3:
                cantidad = parseInt(prompt("Ingresa la cantidad de " + jean.nombreProducto + " que deseas agregar"))
                usuario1.totalProducto3 += caluclarPrecios(jean.precio, cantidad)
                usuario1.totalCarrito += usuario1.totalProducto3
                console.log(usuario1)
                break;
            case 4:
                cantidad = parseInt(prompt("Ingresa la cantidad de " + sudadera.nombreProducto + " que deseas agregar"))
                usuario1.totalProducto4 += caluclarPrecios(sudadera.precio, cantidad)
                usuario1.totalCarrito += usuario1.totalProducto4
                console.log(usuario1)
                break;
            default:
                alert("Opción inválida, por favor verifíca tu selección")
                break;
        }
        compras = parseInt(prompt("Si deseas seguir comprando ingresa el número del producto que deseas agregar al carrito \n1 Camiseta\n2 Vestido\n3 Jean\n4 Sudadera\n ingresa 0 para ir a pagar o salir"))
    }
}

function caluclarPrecios(precioProductoEscogido, cantidad) {
    return precioProductoEscogido * cantidad
}

function carrito() {
    if (usuario1.totalCarrito != 0) {
        let cuponCarrito = prompt("Si tienes un código de descuento ingresalo").toUpperCase()
        if ((cuponCarrito != "") && (cuponCarrito == usuario1.cupon)) {
            let totalConDcto = usuario1.totalCarrito * 0.9
            alert("Tu Carrito \nSubtotal: " + usuario1.totalCarrito + "\nDescuento aplicado del Cupón " + usuario1.cupon + "\n Total a pagar: " + totalConDcto + "\nGracias por visitarnos")
        } else {
            alert("el total de tu compra es " + usuario1.totalCarrito + "\nGracias por visitarnos")
        }
    } else {
        alert("Gracias por visitarnos, te esperamos pronto")
    }
}