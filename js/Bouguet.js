var impor = document.querySelector('.impor');

function creationB(image, titre, price) {
    let div = document.createElement('div');
    div.setAttribute('class', 'card col-2 me-2 mb-3');
    div.style.width='15rem';
    let img = document.createElement('img');
    img.style.height='18rem';
    img.src = image;

    let h5 = document.createElement('h5');
    h5.setAttribute('class', 'card-title');
    let contenu = document.createTextNode(titre);
    h5.appendChild(contenu);
    h5.style.fontFamily= 'Itim';
    h5.style.textAlign = "center";
    let span = document.createElement('span');
    span.setAttribute('class', 'card-text');
    span.appendChild(document.createTextNode(price + 'DH'));
    span.style.textAlign = "center";

    div.appendChild(img);
    div.appendChild(h5);
    div.appendChild(span);
    impor.append(div)
}
function creationF() {
    let div = document.createElement('div');
    div.setAttribute('class', 'col-2 me-2 mb-3');
    div.style.width='50rem';
    let p = document.createElement('p');
    p.setAttribute('class', 'card-title');
    let contenu = document.createTextNode('Votre choix est introuvable !!');
    p.appendChild(contenu);
    p.style.fontSize = "x-large";
    div.appendChild(p);
    impor.append(div)
}

db.forEach((el) => {
    creationB(el.image, el.title, el.price,el.color,el.category);
})

const searchinput = document.getElementById("Recherche")

searchinput.addEventListener("keyup", function (e) {
    const value = e.target.value

    impor.innerHTML = ''
    db.filter(el=> {
        return el.title.toLowerCase().includes(value.toLowerCase())||el.color.toLowerCase().includes(value.toLowerCase())||el.category.toLowerCase().includes(value.toLowerCase())
    }).forEach((el) => {
        creationB(el.image, el.title, el.price);
    })
})

const pricefilter = document.getElementById("prixf")

pricefilter.addEventListener("change", function (e) {
    const value = parseFloat(e.target.value)

    impor.innerHTML = ''

    document.querySelector('.prixs').innerHTML = value.toString()

    db.filter(el => {
        return el.price >= value
    }).forEach((el) => { creationB(el.image, el.title, el.price) })
})

document.querySelectorAll('.category-item').forEach(function (category) {
    category.addEventListener('click', function (e) {
        e.preventDefault()

        const categoryname = category.dataset.value
        impor.innerHTML = ''

        db.filter(el => {
            if (categoryname == 'NosB') return true
            return el.category.toLowerCase() == categoryname.toLowerCase()
        }).forEach((el) => { creationB(el.image, el.title, el.price) })
    })
})