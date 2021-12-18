export default class buscaCEP {
    constructor(botao, buscador, logradouro, complemento, bairro, localidade, uf) {
        this.botao = document.querySelector(botao);
        this.buscador = document.querySelector(buscador);
        this.logradouro = document.querySelector(logradouro);
        this.complemento = document.querySelector(complemento);
        this.bairro = document.querySelector(bairro);
        this.localidade = document.querySelector(localidade);
        this.uf = document.querySelector(uf);
        this.erro1 = document.querySelector('#erro1');
        this.erro2 = document.querySelector('#erro2');

    }

    atualizarCEP() {
        const atualizado = this.buscador.value.replace(/(\d{5})(\d{3})/g, '$1-$2');
        this.buscador.value = atualizado;
    }

    clear() {
        this.buscador.value = '';
        this.logradouro.value = '';
        this.complemento.value = '';
        this.bairro.value = '';
        this.localidade.value = '';
        this.uf.value = '';
    }

    eventos() {
        this.buscador.addEventListener('keyup', this.atualizarCEP);
        this.botao.addEventListener('click', () => {
            if (this.buscador.value.length === 9) {
                this.buscador.classList.remove('ativo');
                this.erro2.classList.remove('ativo');
                this.erro1.classList.remove('ativo');
            this.puxarCEP(this.buscador.value)
            } else {
                this.buscador.classList.add('ativo');
                this.erro2.classList.add('ativo');
                window.alert('CEP inválido');
                this.clear();
            }
        });
    }

    puxarCEP(numCEP) {
        const cep = fetch('https://viacep.com.br/ws/' + numCEP + '/json/');
    
        cep.then(r => r.json())
        .then(body => {
            if (body.logradouro != undefined) {
                this.logradouro.value = body.logradouro;
                this.complemento.value = body.complemento;
                this.bairro.value = body.bairro;
                this.localidade.value = body.localidade;
                this.uf.value = body.uf;
            } else {
                window.alert('Endereço não encontrado ou não existe');
                this.erro1.classList.add('ativo');
                this.buscador.classList.add('ativo');
                this.clear();
            }
        });
    }

    bind() {
        this.atualizarCEP = this.atualizarCEP.bind(this);
    }

    init() {
        this.bind();
        this.eventos();
    }
}