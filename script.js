class Noticia {
  constructor(title, publishedAt, author, description, url) {
    this._title = title;
    this._publishedAt = publishedAt;
    this._author = author;
    this._description = description;
    this._url = url;
  }

  get mostrarNoticia() {
    try {
      return this.aparecerNoticia();
    } catch (erro) {
      return erro.stack
    } finally {
      console.log("Código finalizado com sucesso!")
    }
  }

  aparecerNoticia() {
    if (this._title != " " && this._author != " " && this._description != " " && this._publishedAt != " " && this._url != " ") {
      return `
            <div class="row p-3">
               <div class="accordion" id="metodos" style="bacground-color">
                    <div class="accordion-item">
                     <h2 class="accordion-header">
                         <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
                         data-bs-target="#item1">
                              <h3 class="font-family-base" style="font-family: serif"><a href="${this._url}">${this._title}</a></h3>
                         </button>
                     </h2>
                     <div id="item1" class="accordion-collapse collapse" data-bs-parent="#metodos">
                         <div class="accordion-body">
                               <div style="font-family: arial">${this._publishedAt}</div>
                               <div style="font-family: arial">${this._author}</div><br>
                               <div style="font-family: arial">${this._description}</div>
                         </div>
                     </div>
                 </div>
              </div>
            </div>
      `
    } else {
      throw new ErroCustomizado("Algo está vazio!Cheque se titulo, resumo ou texto estão preenchidos!!!");
    }
  }
}

class NoticiaDestaque extends Noticia {
  constructor(urlToImage, title, publishedAt, author, description, url) {
    super(title, publishedAt, author, description, url);
    this._urlToImage = urlToImage;
  }

  mostrarNoticiaDestaque(_urlToImage) {
    if (_urlToImage != " ") {

      return `
      <div class="row p-5 text-center">
        <img src="${this._urlToImage}"></img>
        </div>

      <div class="row p-3 mt-3" style="background-color: white;">
        <div class="titulo_destaque text-center"><a href="${this._url}">${this._title}</a></div>
        <div class="data_destaque">${this._publishedAt}</div>
        <div class="ator_destaque">${this._author}</div><br><br>
        <div class="descricao_destaque">${this._description}</div>
      </div>
      `;

    } else {
      throw new ErroCustomizado("Algo está vazio!Cheque se a imagem está preenchida");
    }
  }

  get mostrarDestaque() {
    try {
      return this.mostrarNoticiaDestaque();
    } catch (erro) {
      return erro.stack
    } finally {
      console.log("Código finalizado com sucesso!")
    }
  }
}

class ErroCustomizado extends Error {
  constructor(mensage) {
    super(mensage);
    this.name = "ErradoError"
  }
}

let requestURL = "https://www.luizpicolo.com.br/api.json";
let XHM = new XMLHttpRequest();
XHM.open('GET', requestURL);
XHM.responseType = 'json';
XHM.send();

XHM.onload = function () {
  let noticias = XHM.response.articles;
  let elemento1 = document.getElementById('noticias');
  let elemento2 = document.getElementById('destaque');


  let destaque = new NoticiaDestaque(noticias[0].urlToImage, noticias[0].title, noticias[0].publishedAt, noticias[0].author, noticias[0].description, noticias[0].url);
  elemento2.insertAdjacentHTML('afterbegin', destaque.mostrarDestaque);

  noticias.shift();

  noticias.forEach(function (noticia) {
    let title = noticia.title;
    let publishedAt = noticia.publishedAt;
    let author = noticia.author;
    let description = noticia.description;
    let url = noticia.url;

    let n = new Noticia(title, publishedAt, author, description, url);

    elemento1.insertAdjacentHTML('afterbegin', n.mostrarNoticia)

     
  })
}