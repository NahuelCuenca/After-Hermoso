let productos 

const carrito = [
    {nombre: "Auricular", descripcionn: "otra cosa", img: "imagen", id: 1, cantidad: 2, precio: 100},
    {nombre: "Auricular", descripcion: "otra cosa", img: "imagen", id: 2, cantidad: 1, precio: 4400},
    {nombre: "Auricular", descripcion: "otra cosa", img: "imagen", id: 2, cantidad: 3, precio: 100},
    {nombre: "Auricular", descripcion: "otra cosa", img: "imagen", id: 2, cantidad: 4, precio: 100}]


let container = document.getElementById("container")

// https://api.mercadolibre.com/sites/MLA/search?q=#json
// https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/find

const traerDatosJson = async () => {

    let response = await fetch("./api.json")
    let data = await response.json()

    productos = data
    
    console.log(response)

}
const mercadoLibre = async () => {

    let buscador = document.getElementById("buscador")

    let response = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${buscador.value}`)
    let data = await response.json()
    productos = data.results

    container.innerHTML= ``
        for (const product of productos) {
        let caja = document.createElement("div")
        caja.innerHTML = `
        <img src="${product.thumbnail}">
        <h2>${product.title}</h2>
        <p>$ ${product.price}</p>
        `
        container.append(caja)
    }

}


const pagar = async () => {

    const productosToMap = carrito.map(Element => {
        let nuevoElemento = 
        {
            title: Element.nombre,
            description: Element.descripcionn,
            picture_url: Element.img,
            category_id: Element.id,
            quantity: Element.cantidad,
            currency_id: "ARS",
            unit_price: Element.precio
        }
        return nuevoElemento
    })
    let response = await fetch("https://api.mercadopago.com/checkout/preferences", {

        method: "POST",
        headers: {
            Authorization: "Bearer TEST-2415153398066479-052719-b115e83753fdb7d1100912530c7ac480-60191006"
        },
        body: JSON.stringify({
            items: productosToMap
        })
    })
    let data = await response.json()
    console.log(data)
    window.open(data.init_point, "_blank")
}

// curl -X POST \
//     'https://api.mercadopago.com/checkout/preferences' \
//     -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
//     -H 'Content-Type: application/json' \
//     -d '{
//   "items": [
//     {
//       "title": "Dummy Title",
//       "description": "Dummy description",
//       "picture_url": "http://www.myapp.com/myimage.jpg",
//       "category_id": "car_electronics",
//       "quantity": 1,
//       "currency_id": "U$",
//       "unit_price": 10
//     }
//   ],
//   "payer": {
//     "phone": {},
//     "identification": {},
//     "address": {}
//   },
//   "payment_methods": {
//     "excluded_payment_methods": [
//       {}
//     ],
//     "excluded_payment_types": [
//       {}
//     ]
//   },
//   "shipments": {
//     "free_methods": [
//       {}
//     ],
//     "receiver_address": {}
//   },
//   "back_urls": {},
//   "differential_pricing": {},
//   "tracks": [
//     {
//       "type": "google_ad"
//     }
//   ],
//   "metadata": {}
// }'