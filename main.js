const api = axios.create({
    baseURL: 'https://api.github.com/'
})


class App {

    constructor(){
        this.repositories = []

        this.formEl = document.getElementById("repo-form")
        this.listEl = document.getElementById("repo-list")
        this.inputEl = document.querySelector("input[name=repository]")
        this.registerHendlers()
    }

    registerHendlers(){
        this.formEl.onsubmit = e =>  this.addRepository(e)
    }

    setLoading(loading = true){
        if (loading === true){
            
            let loadingEl = document.createElement('span')
            loadingEl.appendChild(document.createTextNode("Carregando perfil..."))
            loadingEl.setAttribute("id", "loading")
            let divEl = document.createElement('div')
            divEl.setAttribute("id", "carregando")
            divEl.appendChild(loadingEl)

            this.formEl.appendChild(divEl)
        }else{
            document.getElementById('carregando').remove()
        }
    }

    async addRepository(e){
        e.preventDefault()

        const repoInput = this.inputEl.value

        if(repoInput.length === 0)
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

    
    render(){
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
            linkEl.appendChild(document.createTextNode('Acessar'))
            linkEl.setAttribute("href", repo.html_url)


            let listItemEl = document.createElement("li")
            listItemEl.appendChild(imgEl)
            listItemEl.appendChild(titleEl)
            listItemEl.appendChild(descriptionEl)
            listItemEl.appendChild(linkEl)

            this.listEl.appendChild(listItemEl)

        })
    }
}

new App()