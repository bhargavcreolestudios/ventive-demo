import React from 'react'
import {Container, Header, Divider, Table, Button, Icon, Modal, Form, Input, Dropdown, Grid, Confirm} from 'semantic-ui-react'
import {getProducts, getCategories, AddNewProduct, updateProduct, deleteProduct} from '../../api'
import _ from 'lodash'
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      products:[],
      categories:[],
      modalOpen:false,
      editProduct:{},
      product:{},
      delete_id:null,
      confirmation:false
    }
    this.targetUrl = process.env.REACT_APP_TARGET_URL
    this._modifyCats = this._modifyCats.bind(this)
    this._addNewProduct = this._addNewProduct.bind(this)
    this._fieldChanged = this._fieldChanged.bind(this)
    this._addProductModal = this._addProductModal.bind(this)
    this._getProducts = this._getProducts.bind(this)
    this._editProduct = this._editProduct.bind(this)
    this._updateProduct = this._updateProduct.bind(this)
    this._productKeyChanged = this._productKeyChanged.bind(this)
    this._viewProduct = this._viewProduct.bind(this)
    this._onDeleteClick = this._onDeleteClick.bind(this)
    this._cancelDelete = this._cancelDelete.bind(this)
    this._deleteProduct = this._deleteProduct.bind(this)
    this._handleSearchChange = this._handleSearchChange.bind(this)
  }

  componentDidMount() {
   this._getProducts()
  }

  _modifyCats = (cats) =>{
    let categories = cats.map((cat,key)=>{
      let option = {}
      option.text = cat.name
      option.value = cat.id
      return option
    })
    this.setState({categories})
  }

  _getProducts = (search = null)=>{
   getProducts(search).then((response)=>{
    let products = response.data.data.data.map((product,key)=>{
      product.edit = false
      return product
    })
    this.setState({products})
    return getCategories()
   }).then((response)=>{
    this._modifyCats(response.data.data)
   })
  }



  _fieldChanged = (e, { value, name }) => {
    this.setState({ [name]: value });
  }

  _addProductModal = ()=>{
    this.setState({
      modalOpen:true
    })
  }

  _addNewProduct = ()=>{
    const {products, categories, ...newProduct} = this.state
    if (newProduct.name && newProduct.category_id) {
        AddNewProduct(newProduct).then((response)=>{
          this.setState({
            modalOpen:false
          })
          this._getProducts()
        })
    }
  }

  _editProduct = (key)=>{
    let products = JSON.parse(JSON.stringify(this.state.products))
    products[key].edit = true
    this.setState({
      products,
      editProduct:products[key]
    })
  }

  _productKeyChanged =(e, { value, name }) => {
    let editProduct = JSON.parse(JSON.stringify(this.state.editProduct))
    editProduct[name] = value
    this.setState({editProduct})
  }

  _updateProduct = (key)=>{
    updateProduct(this.state.editProduct).then(response=>{
        this._getProducts()
    })
  }

  _viewProduct = (key)=>{
    let products = JSON.parse(JSON.stringify(this.state.products))
    this.setState({
      product:products[key]
    })
  }

  _onDeleteClick = (delete_id)=>{
    this.setState({
      delete_id,
      confirmation:true
    })
  }

  _cancelDelete = ()=>{
    this.setState({
      confirmation:false,
      delete_id:null
    })
  }

  _deleteProduct = ()=>{
    let id = this.state.delete_id
    deleteProduct(id).then((response)=>{
      this.setState({
        confirmation:false,
        delete_id:null
      })
      this._getProducts()
    })
  }

  _handleSearchChange =(e,{value})=>{
    this._getProducts(value)
  }

  render() {
    const {products, categories, modalOpen, editProduct, confirmation} = this.state
    return(
      <Container>
      <Header size='huge' style={{marginTop:'10px'}}>Products</Header>
      <Divider/>
       <Grid>
        <Grid.Column width={8}>
          <Input icon='search' placeholder='Search...' onChange={_.debounce(this._handleSearchChange, 500, { leading: true })} />
        </Grid.Column>
      </Grid>
      <Table>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Category</Table.HeaderCell>
        <Table.HeaderCell>Creator</Table.HeaderCell>
        <Table.HeaderCell>Created</Table.HeaderCell>
        <Table.HeaderCell colSpan='4'>
          <Button floated='right' icon labelPosition='left' primary size='small' onClick={this._addProductModal}><Icon name='plus' /> Add New</Button>
          </Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
    { 
      products.map((product,key)=>{
        if (!product.edit) {
          return(
             <Table.Row key={key} label={{ as: 'a', corner: 'left', icon: 'heart' }}>
              <Table.Cell>{product.name} </Table.Cell>
              <Table.Cell>{product.category.name}</Table.Cell>
              <Table.Cell>{product.user.name}</Table.Cell>
              <Table.Cell>{product.product_date}</Table.Cell>
              <Table.Cell collapsing>                
                <Modal trigger={(<Button primary size='small'> <Icon name='eye' /> View</Button>)}>
                <Modal.Header>Product Details</Modal.Header>
                  <Modal.Content image>
                    <Modal.Description>
                      <Header>Name : {product.name}</Header>
                      <Header>Category : {product.category.name}</Header>
                      <Header>Creator : {product.user.name}</Header>
                    </Modal.Description>
                  </Modal.Content>
              </Modal>

                <Button primary size='small' onClick={(element)=>{this._editProduct(key)}}> <Icon name='pencil' /> Edit</Button>
                <Button color="red" size='small' onClick={(element)=>{this._onDeleteClick(product.id)}}> <Icon name='trash' /> Delete</Button>
              </Table.Cell>
            </Table.Row>
          )
        }else{
          return(
             <Table.Row key={key}>
              <Table.Cell >
              <Input
              name="name"
              id="name"
              placeholder="product name"
              required
              value={editProduct.name}
              onChange={this._productKeyChanged}
              />
              </Table.Cell>
              <Table.Cell>
              <Dropdown
               placeholder='Select Category'
               search
               selection
               required
               value={editProduct.category_id}
               onChange={this._productKeyChanged}
               name="category_id" 
               options={categories} 
              />
              </Table.Cell>
              <Table.Cell>{editProduct.user.name}</Table.Cell>
              <Table.Cell>{editProduct.product_date}</Table.Cell>
              <Table.Cell collapsing>
                <Button primary size='small' onClick={(element)=>{this._updateProduct(key)}}> <Icon name='save' /> Save</Button>
              </Table.Cell>
            </Table.Row>
          )
        }
      })
    }

    </Table.Body>
    </Table>
    <Grid.Column>
          
    </Grid.Column>
    <Modal open={modalOpen}>
      <Modal.Header>Add New Product</Modal.Header>
      <Modal.Content>
        <Form>
        <Form.Field 
          control={Input}
          label='Name'
          id="name" 
          type="text" 
          name="name"
          onChange={this._fieldChanged}
          required
          placeholder='Product name'
        />
        <Form.Field 
          control={Dropdown}
          label='Category'
          required
          placeholder='Select Category'
          search
          selection
          onChange={this._fieldChanged}
          name="category_id" 
          options={categories} 
        />
        <Form.Field 
          control={Button}
          primary
          onClick={this._addNewProduct}
        >
        Save
        </Form.Field>
        </Form>
      </Modal.Content>
    </Modal>
    <Confirm open={confirmation}  cancelButton='Never mind' confirmButton="Let's do it" content='Are you sure, you want to delete this product?' onCancel={this._cancelDelete} onConfirm={this._deleteProduct} />
  </Container>
      )
  }
}

export default Home