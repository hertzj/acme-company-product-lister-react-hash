const { Component } = React

const getProducts = () => new Promise((res, rej) => {
    return window.fetch(`https://acme-users-api-rev.herokuapp.com/api/products`)
    .then(response => response.json())
    .then(jsonData => res(jsonData))
    .catch(e => rej(e));
})

const getCompanies = () => new Promise((res, rej) => {
    return window.fetch(`https://acme-users-api-rev.herokuapp.com/api/companies`)
    .then(response => response.json())
    .then(jsonData => res(jsonData))
    .catch(e => rej(e));

})

let view = window.location.hash.slice(1);
if (!view) {
    location.hash = 'products'
    view = 'products'
}

Promise.all([getProducts(), getCompanies()]).then(data => {
    const [products, companies] = data;
    // console.log(data)
    console.log(products);
    console.log(companies);
    class Rad extends Component {
        constructor() {
            super();
            this.state = {
                products: products,
                companies: companies,
                view: view,
            }
        }
    
        render() {
            if (this.state.view === 'products') {
                return (
                    <div>
                        <div className = 'pageControls'>
                        <div className = {this.state.view === 'products' ? 'selected' : null}><a href='#products' onClick={(ev) => {
                            this.setState({
                                view: 'products'
                            })
                        }}>Products ({this.state.products.length})</a></div>
                        <div className = {this.state.view === 'companies' ? 'selected' : null}><a href='#companies' onClick={() => {
                            this.setState({
                                view: 'companies'
                            })
                        }
                        }>Companies ({this.state.companies.length})</a> </div>
                    </div>
                    <ul>
                    {this.state.products.map((obj, idx) => {
                        return <li key={idx}>{obj.name} - {obj.description}</li>
                    })}
                </ul>
                    </div>
                    
                )}
            if (this.state.view === 'companies') {
                return (
                    <div>
                    <div className = 'pageControls'>
                        <div className = {this.state.view === 'products' ? 'selected' : null}><a href='#products' onClick={(ev) => {
                            this.setState({
                                view: 'products'
                            })
                        }}>Products ({this.state.products.length})</a></div>
                        <div className = {this.state.view === 'companies' ? 'selected' : null}><a href='#companies' onClick={() => {
                            this.setState({
                                view: 'companies'
                            })
                        }
                        }>Companies ({this.state.companies.length})</a> </div>
                    </div>
                    <ul>
                {this.state.companies.map((obj, idx) => {
                    return <li key={idx}>{obj.name}</li>
                })}
                </ul>
                </div>
                )
            }
            else return null
        }
                
    }
    
    ReactDOM.render(<Rad />, document.getElementById('app'))
})





