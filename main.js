const api = axios.create({
    baseURL: 'https://api.github.com/'
})


class App {

    constructor() {
        this.repositories = []

        this.formEl = document.getElementById("repo-form")
        this.listEl = document.getElementById("repo-list")
        this.inputEl = document.querySelector("input[name=repository]")
        this.body = document.querySelector("body")
        this.registerHendlers()
    }

    registerHendlers() {
        this.formEl.onsubmit = e => this.addRepository(e)
       
    }
    
    clearScreen() {
        this.repositories = []
        this.listEl.innerHTML = ""
    }

    setLoading(loading = true) {
        
        if (loading === true) {
            
            let loadingEl = document.createElement('div')
            loadingEl.setAttribute("id", "loading")
            loadingEl.setAttribute('class', 'd-flex justify-content-center flex-column')
            
            let spinnerEl = document.createElement("div")
            spinnerEl.setAttribute('class', 'spinner-grow text-danger')
            let spanEl = document.createElement('span')
            spanEl.appendChild(document.createTextNode("Loading..."))
            
               
            loadingEl.appendChild(spinnerEl)
            loadingEl.appendChild(spanEl)

            
 
            //<span class="visually-hidden">Loading...</span>
            this.formEl.appendChild(loadingEl)
        } else {
            document.getElementById('loading').remove()
        }
    }

    async addRepository(e) {
        e.preventDefault()

        const repoInput = this.inputEl.value

        if (repoInput.length === 0)
            return


        this.setLoading()

        try {
            const response = await api.get(`/users/${repoInput}`)
            console.log(response)

            this.repositories.push({
                name: response.data.name,
                description: response.data.bio,
                avatar_url: response.data.avatar_url,
                html_url: response.data.html_url

            })

            this.inputEl.value = ""

            this.render()
            
        } catch (error) {
            alert("O repositório não existe")
        }

        this.setLoading(false)

    }

    render() {
        this.listEl.innerHTML = ""

        this.repositories.forEach(repo => {
            let imgEl = document.createElement("img")
            imgEl.setAttribute('src', repo.avatar_url)

            let titleEl = document.createElement("strong")
            titleEl.appendChild(document.createTextNode(repo.name))

            let descriptionEl = document.createElement("p")
            descriptionEl.appendChild(document.createTextNode(repo.description))

            let linkEl = document.createElement("a")
            linkEl.setAttribute("target", "_blank")
            linkEl.setAttribute("class", "btn btn-dark linkAcess")
            linkEl.appendChild(document.createTextNode('Acessar'))
            linkEl.setAttribute("href", repo.html_url)


            //let listItemEl = document.createElement("li")
            let divEl = document.createElement("li")
            divEl.setAttribute("class", "card")

            let divDescriptionEl = document.createElement('div')
            divDescriptionEl.setAttribute('class', 'description')
            
            divDescriptionEl.appendChild(imgEl)
            divDescriptionEl.appendChild(titleEl)
            divDescriptionEl.appendChild(descriptionEl)

            divEl.appendChild(divDescriptionEl)
            
            divEl.appendChild(linkEl)

            
            this.listEl.appendChild(divEl)

        })
        
        let btnClear = document.createElement('button')
        btnClear.setAttribute("class", "btn btn-secondary btnClear")
        btnClear.setAttribute("type", "submit")
        btnClear.appendChild(document.createTextNode("Limpar"))
        this.listEl.appendChild(btnClear)
        
        
        btnClear.onclick = e => this.clearScreen()
        

    }

   
   
}

new App()