# Session Ten

## Homework

## Reading


```
$ cd <react-pirates>
$ subl . 
```

.gitignore

```
$ git init
$git branch dev
$git checkout dev
$ npm install 
$ npm run start
```

Download MS Code - https://code.visualstudio.com

### JSX

App.js > Header.js:

1. logo: {logo}: JSX
3. class → className: JSX
4. xhtml style closing tags: JSX

Examine CSS: 

1. injected via Webpack:`<style>`
2. multiple `<style>` tags (advantages?)
3. note prefixing in output

Nesting:

Add `<p>test</p>` above div in Header.js

Comments:

`{/* <img src={logo} className="logo" alt="logo" /> */}` 

Demo: jc + TAB

See http://wesbos.com/react-jsx-comments/

Note - to use Emmet run - `ctrl-e`

### props

App.js:

```
<Pirate tagline="Ahoy there Matey!" />
```

Pirate.js:

```
<p>{this.props.tagline}</p>
```

### React tool

Native: `$0`

React: `$r`

Select <Pirate />

Console: `$r.props`


<!-- ### Adding Pirates

PirateForm.js:

`import samplePirates from './sample-pirates';` -->



### State / Data binding

In AddPirateForm.js we created a method - createPirate()

And within, a pirate variable:

```
  createPirate(event){
    event.preventDefault()
    console.log('making a pirate')
    const pirate = {
      name: this.name.value,
      vessel: this.vessel.value,
      weapon: this.weapon.value
    }
    console.log(pirate)
  }
```

Added [refs](https://facebook.github.io/react/docs/refs-and-the-dom.html) to the form to store references to the input.

When we submit we need to put the contents of the form into our const pirate object.

```
<form onSubmit={(e) => this.createPirate(e)}>
<input ref={(input) => this.name = input } type="text" placeholder="Pirate name" />
<input ref={(input) => this.vessel = input } type="text" placeholder="Pirate vessel" />
<input ref={(input) => this.weapon = input } type="text" placeholder="Pirate weapon" />
<button type="submit">Add Pirate</button>
</form>
```

Go to React dev tools, find AddPirateForm component, $r in the console to see the inputs.


### Get the pirate object into state. 

The key difference between props and state is that state is internal and controlled by the component itself, while props are external and controlled by whatever renders the component. - [ref](http://buildwithreact.com/tutorial/state)

We started with App.js:

```
class App extends Component {

  constructor() {
    super();
    this.state = {
      pirates: {}
    }
  }
```

React tools, find App, view state.

And added to App.js:

```
  addPirate(pirate){
    //update state
    const pirates = {...this.state.pirates}
    //add new pirate
    const timestamp = Date.now()
    pirates[`pirate-${timestamp}`] = pirate
    //set state
    this.setState({ pirates: pirates })
  }
```

For spread operator see:

`reference / spread-operator.html`


Bind the add form to our app.

App.js:

```
  constructor() {
    super();
    this.addPirate = this.addPirate.bind(this);
    this.state = {
      pirates: {}
    }
  }
```

#### Review

Review super in classes:

`reference / extending-classes.html`

Note - bind() - creates a new function that, when called, has its `this` keyword set to the provided value.

See: 

`reference / bind / index.html`

`reference / bind / button.html`


### State

Test with App in React tool:

$r.addPirate({name: 'joe'})


///// End Review


### Passing Props

We need to make the addPirate function available to AddPirateForm with props.

To PirateForm from App.js:

`<PirateForm addPirate={this.addPirate} />`:  

```
  render() {
    return (
      <div className="App">
      <Header />
      <Pirate tagline="Ahoy there matey!" />
      <PirateForm addPirate={this.addPirate} />
      </div>
      );
  }
```

(Examine PirateForm props in React tool.)

Only one level more! Pass the prop to AddPirateForm.

In PirateForm.js:

`<AddPirateForm addPirate={this.props.addPirate} />`:

```
  render() {
    return (
      <div className="pirate-form">
        <h3>Pirate Forms</h3>
        <AddPirateForm addPirate={this.props.addPirate} />
      </div>
      )
  }
```

Examine AddPirateForm props

AddPirateForm:

`this.props.addPirate(pirate);`

```
  createPirate(event) {
    event.preventDefault();
    console.log('make a pirate');
    const pirate = {
      name: this.name.value,
      vessel: this.vessel.value,
      weapon: this.weapon.value,
    }
    this.props.addPirate(pirate);
  }
```

#### Use the form to add a pirate.

Empty the form with a ref.

`<form ref={ (input)=>this.pirateForm = input } onSubmit={(e) => this.createPirate(e)}>`:

```
    return (
      <form ref={(input)=>this.pirateForm = input } onSubmit={(e) => this.createPirate(e)}>
      <input ref={(input) => this.name = input } type="text" placeholder="Pirate name" />
      <input ref={(input) => this.vessel = input } type="text" placeholder="Pirate vessel" />
      <input ref={(input) => this.weapon = input } type="text" placeholder="Pirate weapon" />
      <button type="submit">Add Pirate</button>
      </form>
      )
```

and `this.pirateForm.reset();`:

```
createPirate(event) {
    event.preventDefault()
    console.log('make a pirate')
    const pirate = {
      name: this.name.value,
      vessel: this.vessel.value,
      weapon: this.weapon.value,
    }
    this.props.addPirate(pirate)
    this.pirateForm.reset()
  }
```

//////// Create a single pirate

Pirate.js:

```
import React, { Component } from 'react'
import './css/Pirate.css'

class Pirate extends React.Component {
  render(){
    return (
      <ul>
        <li>Pirate</li>
      </ul>
      )
  }
}

export default Pirate;
```

Unlike Angular there are no built in loops, repeats etc. You must use regular JS. We need a replacement for ng-repeat to make pirate components.

### Sample Pirates

1: Using a JSON Array

Examine sample json file. Make a folder called `data` in `src`.

JSON.stringify(<data-that-you-want-to-stringify>,<replacer-function-null>,<indentation>)

Pirate.js:

`import piratesFile from './data/sample-pirates'`:

`<pre><code>{ JSON.stringify(piratesFile, null, 4)}</code></pre>`:

```
import React, { Component } from 'react'
import './css/Pirate.css'
import piratesFile from './data/sample-pirates'

class Pirate extends React.Component {
  render(){
    return (
      <ul>
        <li>
          <pre><code>{ JSON.stringify(piratesFile, null, 4)}</code></pre>
        </li>
      </ul>
      )
  }
}

export default Pirate;
```

With Array.map():

array.map(<function that applies to each item in the array>) to create components

Example: Doubling numbers:

```
> var numbers = [1,5,8]
> numbers
> numbers.map(function(number){return number * 2})
> var double = function(number){return number * 2}
> double(5)
> numbers.map(double)
```

Pirate.js:

```
render(){
  return (
    <ul>
        {piratesFile.pirates.map(function(pirate){
          return (
            <li>
            <h3>{pirate.name}</h3>
            </li>
          )
        })}
    </ul>
    )
}
```

2: With an Object

Switch the json out for the .js version of samples, remove the import (`import piratesFile from './data/sample-pirates'`) and rollback to:

```
<ul>
  <li>Pirate</li>
</ul>
```

App.js

```
import piratesFile from './data/sample-pirates'
```

Examine with console.log().

For this version of sample-pirates we cannot easily use .map which is for Arrays.

Use `Object.keys()`

Find App component in React tool. 

In console: `> $r.state.pirates`

Load samples and run again to see data. An object. Can't use map()?

`> Object.keys($r.state.pirates)`

App.js:

`{Object.keys(this.state.pirates)}` :

```
return (
  <div className="App">
    <Header />
    <div class="pirateList">
    {Object.keys(this.state.pirates)}
    </div>
    <PirateForm addPirate={this.addPirate} loadSamples={this.loadSamples} />
  </div>
);
```

Now that we have an Array:

```
<ul>
{
  Object
  .keys(this.state.pirates)
  .map( key => <Pirate key={key} details={this.state.pirates[key]} /> )
}
</ul>
```

Pirate.js:

```
  render(){
    return (
      <ul>
        <li>{this.props.details.name}</li>
      </ul>
      )
  }
```

Simplify:

```
  render(){
    const {details} = this.props;
    return (
      <ul>
        <li>{details.name}</li>
        <li>{details.weapon}</li>
        <li>{details.vessel}</li>
      </ul>
      )
  }
```


### Load sample data via PirateForm

PirateForm:

`<button onClick={this.props.loadSamples}>Load Sample Pirates</button>`:

```
return (
  <div>
  <h3>Pirate Forms</h3>
  <AddPirateForm addPirate={this.props.addPirate} />
  <button onClick={this.props.loadSamples}>Load Sample Pirates</button>
  </div>
  )
```

App.js

We've alreay imported: `import piratesFile from './sample-pirates'`

```
loadSamples(){
  this.setState({
    pirates: piratesFile
  })
}
```

```
  constructor() {
    super();
    this.addPirate = this.addPirate.bind(this)
    this.loadSamples = this.loadSamples.bind(this)
    this.state = {
      pirates: {}
    }
  }
```

We can use the button in App.js:

```
<button onClick={this.loadSamples}>Load Sample Pirates</button>

```

Delete and try in PirateForm.

Add to props:

`<PirateForm addPirate={this.addPirate} loadSamples={this.loadSamples} />`:

```
    return (
      <div className="App">
      <Header />
      {
        Object
        .keys(this.state.pirates)
        .map( key => <Pirate key={key} details={this.state.pirates[key]} /> )
      }
      <PirateForm addPirate={this.addPirate} />
      </div>
      )
```


### Remove Pirate

New function in App:

```
removePirate(key){
  const pirates = {...this.state.pirates}
  delete pirates[key]
  this.setState({pirates})
}
```

Constructor in App:

```
this.removePirate = this.removePirate.bind(this);
```

$r (App)

```
$r.removePirate('pirate1')
```

On Pirate in App `removePirate = {this.removePirate}`:

```
{
  Object
  .keys(this.state.pirates)
  .map( key => <Pirate key={key} 
    index={key}
    details={this.state.pirates[key]} 
    removePirate={this.removePirate} /> )
}
```

Test with one pirate (pirate1).

PirateForm:

`<button onClick={() => this.props.removePirate('pirate1')}>RemovePirate</button>`

```
<PirateForm 
addPirate={this.addPirate} 
removePirate={this.removePirate} 
loadSamples={this.loadSamples} />
```

Try it on the individual pirates.

Pirate.js:

```
    return (
      <ul>
        <li>{details.name}</li>
        <li>{details.weapon}</li>
        <li>{details.vessel}</li>
        <button onClick={() => this.props.removePirate('pirate1')}>RemovePirate</button>
      </ul>
      )
```

You cannot access the key inside a component

Pass it along `index={key}` in App:

```
{
  Object
  .keys(this.state.pirates)
  .map( key => <Pirate key={key} 
    index={key}
    details={this.state.pirates[key]} 
    removePirate={this.removePirate} /> )
}
```

Pirate.js:

```
return (
  <ul>
    <li>{details.name}</li>
    <li>{details.weapon}</li>
    <li>{details.vessel}</li>
    <button onClick={() => this.props.removePirate(this.props.index)}>RemovePirate</button>
  </ul>
  )
```

### Persisting the Data

Create an account at https://firebase.google.com/

Create a new project called firstname-lastname-pirates

Go to the empty databse (left hand menu)

Go to rules:

```
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

```
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

and Publish.

App.js state.

in src create `base.js`

```
import Rebase from 're-base'

const base = Rebase.createClass({
  
})
```

npm install rebase.

Add domain, database URL, API key.

In Firebase click on Overview > Add Firebase to your webapp

We need:

```
apiKey: "AIzaSyAHnKw63CUBAqSuCREgils_waYJ0qwpGiU",
authDomain: "daniel-deverell-pirates.firebaseapp.com",
databaseURL: "https://daniel-deverell-pirates.firebaseio.com",
```


```
import Rebase from 're-base'

const base = Rebase.createClass({
  apiKey: "AIzaSyAHnKw63CUBAqSuCREgils_waYJ0qwpGiU",
  authDomain: "daniel-deverell-pirates.firebaseapp.com",
  databaseURL: "https://daniel-deverell-pirates.firebaseio.com",
})

export default base
```

Import into App.js

`import base from './base'`

Component Lifecycle: component will mount

```
componentWillMount(){
  this.ref = base.syncState(``)
}
```

```
componentWillMount(){
  this.ref = base.syncState(`daniel-deverell-pirates/pirates`, {
    context: this,
    state: 'pirates'
  })
}
```

```
componentWillUmount(){
  base.removeBinding(this.ref)
}
```

Load pirates and examine the Firebase HTML5 websockets

To delete a pirate we need to accomodate Firebase:

```
  removePirate(key){
    const pirates = {...this.state.pirates}
    pirates[key] = null
    this.setState({pirates})
  }
```

### Routing

`> npm install react-router --save`



### Validation Homework

Note the dependencies in package.json.

`npm install`

`npm run boom!`

Note the classes Angular adds to the input fields as they are manipulated by the user in `static/partials/pirate-list.template.html`

Give the form a name:

`<form ng-submit="addPirate(pirate)" name="addform">`

Disable the submit button:

`<button ng-disabled="addform.$invalid" type="submit">Add Pirate</button>`

Note: you can visually identify the button as being disabled using:

```css
button[disabled] {
  background: #bbb;
  cursor: not-allowed;
  border: none;
}
```

https://www.w3schools.com/csSref/playit.asp?filename=playcss_cursor&preval=not-allowed

Give the input a name. Add a paragraph with ng-show conditions.

```html
<div class="form-group">
  <label>
    <input ng-model="$ctrl.pirate.name" required ng-minlength="6" placeholder="Name" name="pname" />
    <svg viewBox="0 0 20 20" class="icon">
      <path d="M0 0 L10 10 L0 20"></path>
    </svg>
  </label>
  <p class="error" ng-show="addform.pname.$invalid && addform.pname.$touched"> A name must have at least 6 characters.</p>
</div>
```

Note the svg. 

```css
.error {
  color: red;
} 

label {
  display: flex;
  height: 2rem;
}

input {
  width: 100%;
  height: 1.6rem;
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid hsl(0%, 0%, 85%);
  order: 1;
}
```

https://www.sitepoint.com/closer-look-svg-path-data/

Ref: this video from [frontend.center](https://www.youtube.com/watch?v=af4ZQJ14yu8).

```
input:focus {
  outline: none;
  border-color: hsl(0%, 0%, 25%)
}

.icon {
  width: 1rem;
  opacity: 0;
  transition: all 0.5s;
  transform: translateX(-100%)
  // stroke-dasharray: 0, 20;
  // stroke-dashoffset: -14.642;
}

.icon path {
  stroke: black;
  fill: none;
  stroke-width: 1px;
}

input:focus + .icon {
  opacity: 1;
  transform: translateX(0)
  // stroke-dasharray: 28.284, 20;
  // stroke-dashoffset: 0;
}

.ng-valid.ng-not-empty {
  border-color: hsl(166, 72%, 40%)
}

.ng-invalid.ng-dirty {
  border-color: hsl(0, 100%, 40%)
}

```

Using the dash effect:

```
.icon {
  width: 1rem;
  // opacity: 0;
  transition: all 0.5s;
  // transform: translateX(-100%)
  stroke-dasharray: 0, 20;
  stroke-dashoffset: -14.642;
}

.icon path {
  stroke: black;
  fill: none;
  stroke-width: 1px;
}

input:focus + .icon {
  // opacity: 1;
  // transform: translateX(0)
  stroke-dasharray: 28.284, 20;
  stroke-dashoffset: 0;
}
```


See https://www.w3schools.com/angular/angular_validation.asp for a complete set of examples for Angular validation.






### Notes










































