# Session Ten

## Homework

* Spend some quality time with the exercises on [Built with React](http://buildwithreact.com) (do the Tutorial).

## Reading

* http://exploringjs.com/es6/ (specifically http://exploringjs.com/es6/ch_core-features.html#sec_from-constr-to-class and http://exploringjs.com/es6/ch_classes.html#ch_classes)
* Book marking the [Create React App](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-stylesheet) notes is also a very good idea. Please skim them.

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



## React Classes

```
$ sudo npm install -g create-react-app
```

See also: [Create Angular App](https://cli.angular.io)

```
$ sudo create-react-app react-pirates
```

```
$ cd react-pirates
```

```
npm run start
```

Danger- do not do this! Demo only! 

```
> git init
> git add .
> git commit -m 'testing'
> git branch ejected
> git checkout ejected
> npm run eject
> git status
```

Examine package.json

### App.js

What appears to be HTML is JSX.

1. logo: {logo}: JSX
2. App.css: injected via Webpack:`<style>`
3. class → className: JSX
4. xhtml style closing tags: JSX
5. style="color: purple" → style={{color: 'purple'}}: JSX

Add outside the App div:

`<p>test</p>`

Note - to use Emmet run - `ctrl-e`

Comments:

`{ /* comment */ }` see http://wesbos.com/react-jsx-comments/


## Additional Installs

1. [React developer tools for Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
2. [Package Control: Babel](https://packagecontrol.io/packages/Babel)


App.js:

`import logo from './anchor.svg';`

`<h2>Pirate List</h2>`

App.css:

```
.App-header {
  background-color: #eee;
  height: 150px;
  padding: 20px;
  color: #333;
}
```

### Components

Pirate.js

```
import React, { Component } from 'react';

class Pirate extends React.Component {
  render(){
    return (
      <p>Pirate Component</p>
      )
  }
}

export default Pirate;
```

App.js

```
import Pirate from './Pirate';
```

```
<Pirate tagline="Ahoy there Matey!" />
```

Pirate.js

```
<p>{this.props.tagline}</p>
```

Inspect using React tool.

#### React dev tools

`$0`

`$r`

Select <Pirate />

`$r.props`

Exercise - creating another component

```
import React, { Component } from 'react';
import logo from './anchor.svg';

class Header extends React.Component {
  render(){
    return (
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Pirate List</h2>
      </div>)
    }
  }

export default Header;
```

`import Header from './Header';`

## Adding Pirates

New component: PirateForm.js:

`import samplePirates from './sample-pirates';`

```
import React, { Component } from 'react';
import AddPirateForm from './AddPirateForm';

class PirateForm extends React.Component {
  render(){
    return (
      <div>
      <h3>Pirate Forms</h3>
      <AddPirateForm />
      </div>
      )
  }
}

export default PirateForm;
```

App.js

```
import PirateForm from './PirateForm';
```

State / Data binding

AddPirateForm.js

```
import React, { Component } from 'react';

class AddPirateForm extends React.Component {
  render(){
    return (
      <form>
      <input type="text" placeholder="Pirate name" />
      <input type="text" placeholder="Pirate vessel" />
      <input type="text" placeholder="Pirate weapon" />
      <button type="submit">Add Pirate</button>
      </form>
      )
  }
}

export default AddPirateForm;
```

Method - createPirate

`<form onSubmit={(e) => this.createPirate(e)}>`:

```
    return (
      <form onSubmit={(e) => this.createPirate(e)}>
      <input type="text" placeholder="Pirate name" />
      <input type="text" placeholder="Pirate vessel" />
      <input type="text" placeholder="Pirate weapon" />
      <button type="submit">Add Pirate</button>
      </form>
      )
```

In AddPirateForm (above render):

```
createPirate(event) {
  event.preventDefault();
  console.log('make a pirate')
}
```

Test

Add refs to the form to store references to the input:

```
<form onSubmit={(e) => this.createPirate(e)}>
<input ref={(input) => this.name = input } type="text" placeholder="Pirate name" />
<input ref={(input) => this.vessel = input } type="text" placeholder="Pirate vessel" />
<input ref={(input) => this.weapon = input } type="text" placeholder="Pirate weapon" />
<button type="submit">Add Pirate</button>
</form>
```

Go to React dev tools, find AddPirateForm component, $r in the console to see the inputs.

Create the pirate const variable

AddPirateForm:

```
  createPirate(event) {
    event.preventDefault();
    console.log('make a pirate');
    const pirate = {
      name: this.name.value,
      vessel: this.vessel.value,
      weapon: this.weapon.value,
    }
    console.log(pirate)
  }
```

Test.

Get the pirate object into state. 

The key difference between props and state is that state is internal and controlled by the component itself while props are external and controlled by whatever renders the component. - [ref](http://buildwithreact.com/tutorial/state)

App.js:

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

App.js:

```
  addPirate(pirate){
    //update state
    const pirates = {...this.state.pirates}
    //add new pirate
    const timestamp = Date.now();
    pirates[`pirate-${timestamp}`] = pirate;
    //set state
    this.setState({ pirates: pirates })
  }
```

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

note - bind() - creates a new function that, when called, has its `this` keyword set to the provided value.

```
var foo = {
    x: 3
}
var bar = function(){
    console.log(this.x);
}
bar(); // undefined
var boundFunc = bar.bind(foo);
boundFunc(); // 3
```

Test with: 

$r.addPirate({name: 'joe'})

Make the addPirate function available to components with props.

Pass the prop down to PirateForm:

`<PirateForm addPirate={this.addPirate} />`:  

```
return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Pirate List</h2>
        </div>
        <ul>
          <Pirate />
        </ul>
        <PirateForm addPirate={this.addPirate} />
      </div>
    );
```

Examine PirateForm props

Only one level more! Pass the prop to AddPirateForm.

PirateForm:

`<AddPirateForm addPirate={this.props.addPirate} />`:

```
  render(){
    return (
      <div>
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

`<form ref={(input)=>this.pirateForm = input } onSubmit={(e) => this.createPirate(e)}>`:

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
    event.preventDefault();
    console.log('make a pirate');
    const pirate = {
      name: this.name.value,
      vessel: this.vessel.value,
      weapon: this.weapon.value,
    }
    this.props.addPirate(pirate);
    this.pirateForm.reset();
  }
```

### Load sample data into state

PirateForm:

`<button onClick={this.loadSamples}>Load Sample Pirates</button>`:

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

`import samplePirates from './sample-pirates'`

```
  loadSamples(){
    this.setState({
      pirates: samplePirates
    })
  }
```

```
  constructor() {
    super();
    this.addPirate = this.addPirate.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.state = {
      pirates: {}
    }
  }
```


`<PirateForm addPirate={this.addPirate} loadSamples={this.loadSamples} />`:

```
return (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Pirate List</h2>
    </div>
    <ul>
      <Pirate />
    </ul>
    <PirateForm addPirate={this.addPirate} loadSamples={this.loadSamples} />
  </div>
);
```

Loading the pirates

App.js:

```
<ul>
  <Pirate />
</ul>
```

Pirate.js:

```
import React, { Component } from 'react';

class Pirate extends React.Component {

  render(){
    return (
      <li>
        <p>Pirate</p>
      </li>
      )
  }
}

export default Pirate;
```

Unlike Angular there are no built in loops, repeats etc. You must use regular JS.

Here - cannot use .map which is for Arrays.

Use `Object.keys()`

Find App component in React tool. In console: `$r.state.pirates`

Load samples and run again to see data. Can't loop over that!

`Object.keys($r.state.pirates)`

App.js:

`{Object.keys(this.state.pirates)}`

```
return (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Pirate List</h2>
    </div>
    <ul>
    {Object.keys(this.state.pirates)}
    </ul>
    <PirateForm addPirate={this.addPirate} loadSamples={this.loadSamples} />
  </div>
);
```

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
    const {details} = this.props;
    return (
      <li>
        <h4>{details.name}</h4>
        <p>{details.weapon}</p>
        <p>{details.vessel}</p>
      </li>
      )
  }
```

Load sample pirates.



### Notes









































